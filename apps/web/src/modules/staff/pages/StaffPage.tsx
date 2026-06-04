import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { StaffTable } from '../components/StaffTable';
import { StaffForm }  from '../components/StaffForm';
import { useStaffList, useCreateStaff, useUpdateStaff, useDeleteStaff } from '../hooks/useStaff';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { StaffMember, CreateStaffDto } from '@/api/staff.api';

export function StaffPage() {
  const { user } = useAuth();
  const societyId = Number(user?.society_id ?? 1);
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editMember, setEditMember] = useState<StaffMember | null>(null);
  const [showForm,   setShowForm]   = useState(false);

  const { data, isLoading } = useStaffList({ society_id: societyId });
  const { mutate: create, isPending: creating } = useCreateStaff();
  const { mutate: update, isPending: updating } = useUpdateStaff(editMember?.id ?? '');
  const { mutate: remove } = useDeleteStaff();

  const handleSubmit = (values: CreateStaffDto) => {
    if (editMember) {
      update(values, { onSuccess: () => { setEditMember(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff"
        description="Manage society staff and service personnel"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Staff' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditMember(null); setShowForm(true); }}>
            Add Staff
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editMember ? 'Edit Staff' : 'New Staff Member'}</h3>
          <StaffForm
            member={editMember ?? undefined}
            societyId={societyId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditMember(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <StaffTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(m) => { setEditMember(m); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}

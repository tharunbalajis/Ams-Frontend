import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { ComplianceTable } from '../components/ComplianceTable';
import { ComplianceForm }  from '../components/ComplianceForm';
import { useComplianceList, useCreateCompliance, useUpdateCompliance, useDeleteCompliance } from '../hooks/useCompliance';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { ComplianceRecord, CreateComplianceDto } from '@/api/compliance.api';

export function CompliancePage() {
  const { user } = useAuth();
  const societyId = Number(user?.society_id ?? 1);
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editRecord, setEditRecord] = useState<ComplianceRecord | null>(null);
  const [showForm,   setShowForm]   = useState(false);

  const { data, isLoading } = useComplianceList({ society_id: societyId });
  const { mutate: create, isPending: creating } = useCreateCompliance();
  const { mutate: update, isPending: updating } = useUpdateCompliance(editRecord?.id ?? '');
  const { mutate: remove } = useDeleteCompliance();

  const handleSubmit = (values: CreateComplianceDto) => {
    if (editRecord) {
      update(values, { onSuccess: () => { setEditRecord(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance"
        description="Manage society compliance documents and records"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Compliance' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditRecord(null); setShowForm(true); }}>
            Add Document
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editRecord ? 'Edit Record' : 'New Compliance Record'}</h3>
          <ComplianceForm
            record={editRecord ?? undefined}
            societyId={societyId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditRecord(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <ComplianceTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(r) => { setEditRecord(r); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}

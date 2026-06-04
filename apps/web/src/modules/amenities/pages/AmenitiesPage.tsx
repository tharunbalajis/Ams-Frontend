import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { AmenityTable } from '../components/AmenityTable';
import { AmenityForm }  from '../components/AmenityForm';
import { useAmenities, useCreateAmenity, useUpdateAmenity, useDeleteAmenity } from '../hooks/useAmenities';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { Amenity, CreateAmenityDto } from '@/api/amenities.api';

export function AmenitiesPage() {
  const { user } = useAuth();
  const societyId = Number(user?.society_id ?? 1);
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editItem, setEditItem] = useState<Amenity | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useAmenities({ society_id: societyId });
  const { mutate: create, isPending: creating } = useCreateAmenity();
  const { mutate: update, isPending: updating } = useUpdateAmenity(editItem?.id ?? '');
  const { mutate: remove } = useDeleteAmenity();

  const handleSubmit = (values: CreateAmenityDto) => {
    if (editItem) {
      update(values, { onSuccess: () => { setEditItem(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Amenities"
        description="Manage society amenities and facilities"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Amenities' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditItem(null); setShowForm(true); }}>
            Add Amenity
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editItem ? 'Edit Amenity' : 'New Amenity'}</h3>
          <AmenityForm
            amenity={editItem ?? undefined}
            societyId={societyId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <AmenityTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(item) => { setEditItem(item); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}

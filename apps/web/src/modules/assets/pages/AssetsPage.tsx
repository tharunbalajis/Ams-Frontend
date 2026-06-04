import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { AssetTable } from '../components/AssetTable';
import { AssetForm }  from '../components/AssetForm';
import { useAssets, useCreateAsset, useUpdateAsset, useDeleteAsset } from '../hooks/useAssets';
import { usePagination } from '@/hooks/usePagination';
import { useAuth }       from '@/hooks/useAuth';
import type { Asset, CreateAssetDto } from '@/api/assets.api';

export function AssetsPage() {
  const { user } = useAuth();
  const societyId = Number(user?.society_id ?? 1);
  const { page, pageSize, setPage } = usePagination(1, 20);

  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  const [showForm,  setShowForm]  = useState(false);

  const { data, isLoading } = useAssets({ society_id: societyId });
  const { mutate: create, isPending: creating } = useCreateAsset();
  const { mutate: update, isPending: updating } = useUpdateAsset(editAsset?.id ?? '');
  const { mutate: remove } = useDeleteAsset();

  const handleSubmit = (values: CreateAssetDto) => {
    if (editAsset) {
      update(values, { onSuccess: () => { setEditAsset(null); setShowForm(false); } });
    } else {
      create(values, { onSuccess: () => setShowForm(false) });
    }
  };

  const allItems = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assets"
        description="Track and manage society assets and equipment"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Assets' },
          ]} />
        }
        actions={
          <Button onClick={() => { setEditAsset(null); setShowForm(true); }}>
            Add Asset
          </Button>
        }
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{editAsset ? 'Edit Asset' : 'New Asset'}</h3>
          <AssetForm
            asset={editAsset ?? undefined}
            societyId={societyId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditAsset(null); }}
            isPending={creating || updating}
          />
        </div>
      )}

      <AssetTable
        data={allItems}
        loading={isLoading}
        pagination={{ page, pageSize, total: allItems.length }}
        onPageChange={setPage}
        onEdit={(a) => { setEditAsset(a); setShowForm(true); }}
        onDelete={(id) => remove(id)}
      />
    </div>
  );
}

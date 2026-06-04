import type { ColumnDef } from '@tanstack/react-table';
import { Button, ServerTable, StatusBadge } from '@ams/ui';
import type { Asset } from '@/api/assets.api';
import type { PaginationState } from '@ams/ui';

export interface AssetTableProps {
  data:         Asset[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (asset: Asset) => void;
  onDelete:     (id: string) => void;
}

export function AssetTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: AssetTableProps) {
  const columns: ColumnDef<Asset>[] = [
    { accessorKey: 'asset_name', header: 'Asset Name' },
    { accessorKey: 'asset_type', header: 'Type' },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      accessorKey: 'next_service_date',
      header:      'Next Service',
      cell:        ({ getValue }) => (getValue() as string | null) ? new Date(getValue() as string).toLocaleDateString() : '—',
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>Edit</Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(row.original.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <ServerTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyState={<p className="text-muted-foreground">No assets found.</p>}
    />
  );
}

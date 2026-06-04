import type { ColumnDef } from '@tanstack/react-table';
import { Button, ServerTable, StatusBadge } from '@ams/ui';
import type { Amenity } from '@/api/amenities.api';
import type { PaginationState } from '@ams/ui';

export interface AmenityTableProps {
  data:         Amenity[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (amenity: Amenity) => void;
  onDelete:     (id: string) => void;
}

export function AmenityTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: AmenityTableProps) {
  const columns: ColumnDef<Amenity>[] = [
    { accessorKey: 'name',        header: 'Name' },
    { accessorKey: 'description', header: 'Description', cell: ({ getValue }) => (getValue() as string | null) ?? '—' },
    {
      accessorKey: 'is_active',
      header:      'Status',
      cell:        ({ getValue }) => <StatusBadge status={(getValue() as boolean) ? 'active' : 'inactive'} />,
    },
    { accessorKey: 'created_at',  header: 'Created', cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString() },
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
      emptyState={<p className="text-muted-foreground">No amenities found.</p>}
    />
  );
}

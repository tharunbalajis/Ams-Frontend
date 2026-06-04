import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable, StatusBadge } from '@ams/ui';
import type { StaffMember } from '@/api/staff.api';
import type { PaginationState } from '@ams/ui';

export interface StaffTableProps {
  data:         StaffMember[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (member: StaffMember) => void;
  onDelete:     (id: string) => void;
}

export function StaffTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: StaffTableProps) {
  const columns: ColumnDef<StaffMember>[] = [
    { accessorKey: 'name',   header: 'Name' },
    {
      accessorKey: 'role',
      header:      'Role',
      cell:        ({ getValue }) => <Badge variant="outline">{(getValue() as string).replace('_', ' ')}</Badge>,
    },
    { accessorKey: 'mobile', header: 'Mobile' },
    {
      accessorKey: 'is_active',
      header:      'Status',
      cell:        ({ getValue }) => <StatusBadge status={(getValue() as boolean) ? 'active' : 'inactive'} />,
    },
    { accessorKey: 'created_at', header: 'Added', cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString() },
    {
      id:   'actions',
      header: 'Actions',
      cell: ({ row }) => (
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
      emptyState={<p className="text-muted-foreground">No staff members found.</p>}
    />
  );
}

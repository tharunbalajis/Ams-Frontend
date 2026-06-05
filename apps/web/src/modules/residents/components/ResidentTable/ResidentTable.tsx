import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { ResidentListItem } from '../../types/resident.types';
import type { PaginationState } from '@ams/ui';
import { RESIDENT_ROUTES } from '../../constants/resident.constants';

export interface ResidentTableProps {
  data:         ResidentListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function ResidentTable({ data, loading, pagination, onPageChange }: ResidentTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<ResidentListItem>[] = [
    {
      accessorKey: 'full_name',
      header:      'Name',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(RESIDENT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.full_name}
        </button>
      ),
    },
    {
      accessorKey: 'email',
      header:      'Email',
      cell:        ({ getValue }) => (getValue() as string | undefined) ?? '—',
    },
    {
      accessorKey: 'mobile_primary',
      header:      'Phone',
    },
    {
      accessorKey: 'unit_id',
      header:      'Unit',
      cell:        ({ getValue }) => (
        <Badge variant="secondary">Unit {getValue() as number}</Badge>
      ),
    },
    {
      accessorKey: 'resident_type',
      header:      'Type',
      cell:        ({ getValue }) => (
        <span className="capitalize">{(getValue() as string ?? '').toLowerCase()}</span>
      ),
    },
    {
      accessorKey: 'is_active',
      header:      'Status',
      cell:        ({ getValue }) => (
        <Badge variant={(getValue() as boolean) ? 'success' : 'secondary'}>
          {(getValue() as boolean) ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      accessorKey: 'move_in_date',
      header:      'Move In',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(RESIDENT_ROUTES.DETAIL.replace(':id', row.original.id))}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(RESIDENT_ROUTES.EDIT.replace(':id', row.original.id))}
          >
            Edit
          </Button>
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
      emptyState={
        <p className="text-muted-foreground">No residents found. Try adjusting your filters.</p>
      }
    />
  );
}

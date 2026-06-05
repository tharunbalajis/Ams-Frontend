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

const TYPE_BADGE: Record<string, 'default' | 'secondary'> = {
  OWNER:  'default',
  TENANT: 'secondary',
};

export function ResidentTable({ data, loading, pagination, onPageChange }: ResidentTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<ResidentListItem>[] = [
    {
      accessorKey: 'full_name',
      header:      'Name',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline text-left"
          onClick={() => void navigate(RESIDENT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.full_name}
        </button>
      ),
    },
    {
      id:     'unit',
      header: 'Unit',
      cell:   ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.unit_number}</span>
          <span className="text-xs text-muted-foreground">{row.original.block_name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'mobile_primary',
      header:      'Phone',
    },
    {
      accessorKey: 'email',
      header:      'Email',
      cell:        ({ getValue }) => (getValue() as string | undefined) ?? '—',
    },
    {
      accessorKey: 'resident_type',
      header:      'Type',
      cell:        ({ getValue }) => {
        const type = getValue() as string;
        return (
          <Badge variant={TYPE_BADGE[type] ?? 'secondary'}>
            {type === 'OWNER' ? 'Owner' : 'Tenant'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'move_in_date',
      header:      'Move In',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'move_out_date',
      header:      'Move Out',
      cell:        ({ getValue }) => {
        const v = getValue() as string | undefined;
        return v ? formatDate(v) : '—';
      },
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

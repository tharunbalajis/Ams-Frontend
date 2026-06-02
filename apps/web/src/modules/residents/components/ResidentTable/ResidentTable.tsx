import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable, StatusBadge } from '@ams/ui';
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
      accessorKey: 'fullName',
      header:      'Name',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(RESIDENT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.fullName}
        </button>
      ),
    },
    {
      accessorKey: 'email',
      header:      'Email',
    },
    {
      accessorKey: 'phone',
      header:      'Phone',
    },
    {
      accessorKey: 'unitNumber',
      header:      'Unit',
      cell:        ({ getValue }) => (
        <Badge variant="secondary">{getValue() as string}</Badge>
      ),
    },
    {
      accessorKey: 'type',
      header:      'Type',
      cell:        ({ getValue }) => (
        <span className="capitalize">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => (
        <StatusBadge status={getValue() as 'active' | 'inactive' | 'pending' | 'suspended'} />
      ),
    },
    {
      accessorKey: 'createdAt',
      header:      'Joined',
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

import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import type { UnitListItem } from '../../types/unit.types';
import type { PaginationState } from '@ams/ui';
import { UNIT_ROUTES } from '../../constants/unit.constants';

export interface UnitTableProps {
  data:         UnitListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function UnitTable({ data, loading, pagination, onPageChange }: UnitTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<UnitListItem>[] = [
    {
      accessorKey: 'unit_number',
      header:      'Unit No.',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', String(row.original.unit_id)))}
        >
          {row.original.unit_number}
        </button>
      ),
    },
    {
      accessorKey: 'block_name',
      header:      'Block',
      cell:        ({ getValue }) => {
        const v = getValue() as string | undefined;
        return v ? <Badge variant="outline">{v}</Badge> : <span className="text-muted-foreground">—</span>;
      },
    },
    {
      accessorKey: 'floor_number',
      header:      'Floor',
      cell:        ({ getValue }) => (getValue() as number | undefined) ?? '—',
    },
    {
      accessorKey: 'unit_type',
      header:      'Type',
      cell:        ({ getValue }) => <Badge variant="secondary">{getValue() as string}</Badge>,
    },
    {
      accessorKey: 'super_built_up',
      header:      'Sq. Ft.',
      cell:        ({ getValue }) => {
        const v = getValue() as number | undefined;
        return v ? `${v} sq ft` : '—';
      },
    },
    {
      accessorKey: 'ownership_type',
      header:      'Ownership',
      cell:        ({ getValue }) => (
        <span className="capitalize">{(getValue() as string).replace(/_/g, ' ')}</span>
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
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', String(row.original.unit_id)))}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(UNIT_ROUTES.EDIT.replace(':id', String(row.original.unit_id)))}
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
      emptyState={<p className="text-muted-foreground">No units found. Try adjusting your filters.</p>}
    />
  );
}

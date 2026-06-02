import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable, StatusBadge } from '@ams/ui';
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
      accessorKey: 'unitNumber',
      header:      'Unit No.',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.unitNumber}
        </button>
      ),
    },
    {
      accessorKey: 'block',
      header:      'Block / Tower',
      cell:        ({ getValue }) => <Badge variant="outline">{getValue() as string}</Badge>,
    },
    {
      accessorKey: 'floor',
      header:      'Floor',
    },
    {
      accessorKey: 'type',
      header:      'Type',
      cell:        ({ getValue }) => <span className="uppercase">{getValue() as string}</span>,
    },
    {
      accessorKey: 'squareFeet',
      header:      'Sq. Ft.',
      cell:        ({ getValue }) => `${getValue() as number} sq ft`,
    },
    {
      accessorKey: 'ownershipType',
      header:      'Ownership',
      cell:        ({ getValue }) => <span className="capitalize">{getValue() as string}</span>,
    },
    {
      accessorKey: 'occupancyStatus',
      header:      'Occupancy',
      cell:        ({ getValue }) => (
        <StatusBadge status={getValue() as 'occupied' | 'vacant' | 'reserved' | 'under_maintenance'} />
      ),
    },
    {
      accessorKey: 'residentCount',
      header:      'Residents',
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', row.original.id))}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(UNIT_ROUTES.EDIT.replace(':id', row.original.id))}
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
        <p className="text-muted-foreground">No units found. Try adjusting your filters.</p>
      }
    />
  );
}

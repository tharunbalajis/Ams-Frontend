import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import type { UnitListItem, OccupancyStatus } from '../../types/unit.types';
import type { PaginationState } from '@ams/ui';
import { UNIT_ROUTES } from '../../constants/unit.constants';

export interface UnitTableProps {
  data:         UnitListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

const OCCUPANCY_BADGE: Record<OccupancyStatus, 'success' | 'warning' | 'secondary'> = {
  OWNER_OCCUPIED: 'success',
  RENTED:         'warning',
  VACANT:         'secondary',
};

const OCCUPANCY_LABEL: Record<OccupancyStatus, string> = {
  OWNER_OCCUPIED: 'Owner Occupied',
  RENTED:         'Rented',
  VACANT:         'Vacant',
};

export function UnitTable({ data, loading, pagination, onPageChange }: UnitTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<UnitListItem>[] = [
    {
      accessorKey: 'unit_number',
      header:      'Unit No.',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline text-left"
          onClick={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', String(row.original.unit_id)))}
        >
          {row.original.unit_number}
        </button>
      ),
    },
    {
      id:     'block',
      header: 'Block',
      cell:   ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.block_name}</span>
          {row.original.floor_number != null && (
            <span className="text-xs text-muted-foreground">Floor {row.original.floor_number}</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'unit_type',
      header:      'Type',
      cell:        ({ getValue }) => <Badge variant="outline">{getValue() as string}</Badge>,
    },
    {
      accessorKey: 'occupancy_status',
      header:      'Occupancy',
      cell:        ({ getValue }) => {
        const status = getValue() as OccupancyStatus;
        return (
          <Badge variant={OCCUPANCY_BADGE[status] ?? 'secondary'}>
            {OCCUPANCY_LABEL[status] ?? status}
          </Badge>
        );
      },
    },
    {
      id:     'residents',
      header: 'Resident(s)',
      cell:   ({ row }) => {
        const { owner_name, tenant_name, occupancy_status } = row.original;
        if (occupancy_status === 'VACANT') return <span className="text-muted-foreground">—</span>;
        return (
          <div className="flex flex-col gap-0.5 text-sm">
            {owner_name  && <span>{owner_name} <span className="text-xs text-muted-foreground">(Owner)</span></span>}
            {tenant_name && <span>{tenant_name} <span className="text-xs text-muted-foreground">(Tenant)</span></span>}
          </div>
        );
      },
    },
    {
      accessorKey: 'super_built_up',
      header:      'Area',
      cell:        ({ getValue }) => {
        const v = getValue() as number | undefined;
        return v ? `${v} sq ft` : '—';
      },
    },
    {
      accessorKey: 'parking_slots',
      header:      'Parking',
      cell:        ({ getValue }) => (getValue() as number | undefined) ?? 0,
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

import type { ColumnDef } from '@tanstack/react-table';
import { DataTable, StatusBadge } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { OccupancyRecord } from '../../types/occupancy.types';

export interface OccupancyTableProps {
  data:     OccupancyRecord[];
  loading?: boolean;
}

const columns: ColumnDef<OccupancyRecord>[] = [
  {
    accessorKey: 'status',
    header:      'Status',
    cell:        ({ getValue }) => (
      <StatusBadge status={getValue() as 'occupied' | 'vacant' | 'reserved' | 'under_maintenance'} />
    ),
  },
  {
    accessorKey: 'startDate',
    header:      'From',
    cell:        ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'endDate',
    header:      'To',
    cell:        ({ getValue }) => getValue() ? formatDate(getValue() as string) : '—',
  },
  {
    accessorKey: 'notes',
    header:      'Notes',
    cell:        ({ getValue }) => (getValue() as string | undefined) ?? '—',
  },
  {
    accessorKey: 'createdBy',
    header:      'Updated By',
  },
];

export function OccupancyTable({ data, loading }: OccupancyTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyState={<p className="text-muted-foreground">No occupancy history found.</p>}
    />
  );
}

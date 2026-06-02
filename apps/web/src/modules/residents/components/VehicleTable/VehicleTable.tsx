import type { ColumnDef } from '@tanstack/react-table';
import { Badge, DataTable } from '@ams/ui';
import type { Vehicle } from '../../types/vehicle.types';
import type { ID } from '@/types/common.types';
import { VEHICLE_TYPE_OPTIONS } from '../../constants/vehicle.constants';

const vehicleTypeLabel = (type: string) =>
  VEHICLE_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;

export interface VehicleTableProps {
  data:       Vehicle[];
  residentId: ID;
  loading?:   boolean;
}

export function VehicleTable({ data, loading }: VehicleTableProps) {
  const columns: ColumnDef<Vehicle>[] = [
    { accessorKey: 'vehicleNumber', header: 'Plate No.' },
    { accessorKey: 'type',         header: 'Type',  cell: ({ getValue }) => vehicleTypeLabel(getValue() as string) },
    { accessorKey: 'brand',        header: 'Brand' },
    { accessorKey: 'model',        header: 'Model' },
    {
      accessorKey: 'parkingSlot',
      header:      'Parking Slot',
      cell:        ({ getValue }) => getValue() ? <Badge variant="outline">{getValue() as string}</Badge> : '—',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyState={<p className="py-6 text-center text-sm text-muted-foreground">No vehicles registered.</p>}
    />
  );
}

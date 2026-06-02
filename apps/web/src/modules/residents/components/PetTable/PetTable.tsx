import type { ColumnDef } from '@tanstack/react-table';
import { Badge, DataTable, StatusBadge } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Pet } from '../../types/pet.types';
import type { ID } from '@/types/common.types';
import { PET_TYPE_OPTIONS } from '../../constants/pet.constants';

const petTypeLabel = (type: string) =>
  PET_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;

export interface PetTableProps {
  data:       Pet[];
  residentId: ID;
  loading?:   boolean;
}

export function PetTable({ data, loading }: PetTableProps) {
  const columns: ColumnDef<Pet>[] = [
    { accessorKey: 'name',  header: 'Name' },
    { accessorKey: 'type',  header: 'Type',  cell: ({ getValue }) => petTypeLabel(getValue() as string) },
    { accessorKey: 'breed', header: 'Breed' },
    {
      accessorKey: 'vaccinationStatus',
      header:      'Vaccination',
      cell:        ({ getValue }) => {
        const v = getValue() as string;
        return (
          <Badge variant={v === 'vaccinated' ? 'success' : v === 'expired' ? 'warning' : 'destructive'}>
            <span className="capitalize">{v.replace('_', ' ')}</span>
          </Badge>
        );
      },
    },
    {
      accessorKey: 'vaccineExpiry',
      header:      'Expiry',
      cell:        ({ getValue }) => formatDate(getValue() as string | undefined),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyState={<p className="py-6 text-center text-sm text-muted-foreground">No pets registered.</p>}
    />
  );
}

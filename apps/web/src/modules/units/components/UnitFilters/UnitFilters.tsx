import { SearchInput, SelectField } from '@ams/ui';
import { UNIT_TYPE_OPTIONS, UNIT_STATUS_OPTIONS, OWNERSHIP_TYPE_OPTIONS } from '../../constants/unit.constants';
import type { UnitFiltersParams, OccupancyStatus } from '../../types/unit.types';

const OCCUPANCY_OPTIONS: { label: string; value: OccupancyStatus | 'all' }[] = [
  { label: 'All Occupancy',     value: 'all' },
  { label: 'Occupied',          value: 'OCCUPIED' },
  { label: 'Vacant',            value: 'VACANT' },
  { label: 'Reserved',          value: 'RESERVED' },
  { label: 'Under Maintenance', value: 'UNDER_MAINTENANCE' },
];

export interface UnitFiltersProps {
  filters:  Partial<UnitFiltersParams>;
  onChange: (filters: Partial<UnitFiltersParams>) => void;
}

export function UnitFilters({ filters, onChange }: UnitFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search units..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: '' })}
      />

      <SelectField
        className="w-40"
        value={filters.type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, type: v === 'all' ? undefined : v as UnitFiltersParams['type'] })}
        options={[{ label: 'All Types', value: 'all' }, ...UNIT_TYPE_OPTIONS]}
        placeholder="Type"
      />

      <SelectField
        className="w-44"
        value={filters.occupancyStatus ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, occupancyStatus: v === 'all' ? undefined : v as OccupancyStatus })}
        options={OCCUPANCY_OPTIONS}
        placeholder="Occupancy"
      />

      <SelectField
        className="w-40"
        value={filters.ownershipType ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, ownershipType: v === 'all' ? undefined : v as UnitFiltersParams['ownershipType'] })}
        options={[{ label: 'All Ownership', value: 'all' }, ...OWNERSHIP_TYPE_OPTIONS]}
        placeholder="Ownership"
      />

      <SelectField
        className="w-40"
        value={filters.status ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, status: v === 'all' ? undefined : v as UnitFiltersParams['status'] })}
        options={[{ label: 'All Statuses', value: 'all' }, ...UNIT_STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

import { SearchInput, SelectField } from '@ams/ui';
import {
  UNIT_TYPE_OPTIONS,
  UNIT_STATUS_OPTIONS,
  OCCUPANCY_STATUS_OPTIONS,
} from '../../constants';
import type { UnitFiltersParams } from '../../types/unit.types';

export interface UnitFiltersProps {
  filters:   Partial<UnitFiltersParams>;
  onChange:  (filters: Partial<UnitFiltersParams>) => void;
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
        value={filters.type}
        onValueChange={(v) => onChange({ ...filters, type: v as UnitFiltersParams['type'] })}
        options={[{ label: 'All Types', value: '' }, ...UNIT_TYPE_OPTIONS]}
        placeholder="Type"
      />

      <SelectField
        className="w-44"
        value={filters.occupancyStatus}
        onValueChange={(v) => onChange({ ...filters, occupancyStatus: v as UnitFiltersParams['occupancyStatus'] })}
        options={[{ label: 'All Occupancy', value: '' }, ...OCCUPANCY_STATUS_OPTIONS]}
        placeholder="Occupancy"
      />

      <SelectField
        className="w-40"
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v as UnitFiltersParams['status'] })}
        options={[{ label: 'All Statuses', value: '' }, ...UNIT_STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

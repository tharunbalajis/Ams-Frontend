import { SearchInput, SelectField } from '@ams/ui';
import { RESIDENT_TYPE_OPTIONS, RESIDENT_STATUS_OPTIONS } from '../../constants/resident.constants';
import type { ResidentFiltersParams } from '../../types/resident.types';

export interface ResidentFiltersProps {
  filters:   Partial<ResidentFiltersParams>;
  onChange:  (filters: Partial<ResidentFiltersParams>) => void;
}

export function ResidentFilters({ filters, onChange }: ResidentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search residents..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: '' })}
      />
      <SelectField
        className="w-40"
        value={filters.type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, type: v === 'all' ? undefined : v as ResidentFiltersParams['type'] })}
        options={[{ label: 'All Types', value: 'all' }, ...RESIDENT_TYPE_OPTIONS]}
        placeholder="Type"
      />
      <SelectField
        className="w-40"
        value={filters.status ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, status: v === 'all' ? undefined : v as ResidentFiltersParams['status'] })}
        options={[{ label: 'All Statuses', value: 'all' }, ...RESIDENT_STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

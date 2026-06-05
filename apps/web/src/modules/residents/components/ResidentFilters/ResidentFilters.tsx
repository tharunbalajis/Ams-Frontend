import { SearchInput, SelectField } from '@ams/ui';
import { RESIDENT_TYPE_OPTIONS } from '../../constants/resident.constants';
import type { ResidentFiltersParams } from '../../types/resident.types';

export interface ResidentFiltersProps {
  filters:  Partial<ResidentFiltersParams>;
  onChange: (filters: Partial<ResidentFiltersParams>) => void;
}

const STATUS_OPTIONS = [
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
];

export function ResidentFilters({ filters, onChange }: ResidentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search residents..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: undefined })}
      />
      <SelectField
        className="w-40"
        value={filters.resident_type ?? 'all'}
        onValueChange={(v) =>
          onChange({
            ...filters,
            resident_type: v === 'all' ? undefined : (v as ResidentFiltersParams['resident_type']),
          })
        }
        options={[{ label: 'All Types', value: 'all' }, ...RESIDENT_TYPE_OPTIONS]}
        placeholder="Type"
      />
      <SelectField
        className="w-40"
        value={filters.is_active === undefined ? 'all' : String(filters.is_active)}
        onValueChange={(v) =>
          onChange({ ...filters, is_active: v === 'all' ? undefined : v === 'true' })
        }
        options={[{ label: 'All Statuses', value: 'all' }, ...STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

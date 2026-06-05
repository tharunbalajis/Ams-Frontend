import { SearchInput, SelectField } from '@ams/ui';
import { RESIDENT_TYPE_OPTIONS } from '../../constants/resident.constants';
import type { ResidentFiltersParams } from '../../types/resident.types';

export interface ResidentFiltersProps {
  filters:   Partial<ResidentFiltersParams>;
  onChange:  (filters: Partial<ResidentFiltersParams>) => void;
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
        value={(filters as Record<string, string>).search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value } as Partial<ResidentFiltersParams>)}
        onClear={() => onChange({ ...filters, search: undefined } as Partial<ResidentFiltersParams>)}
      />
      <SelectField
        className="w-40"
        value={(filters as Record<string, string>).resident_type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, ...( v === 'all' ? {} : { resident_type: v } ) } as Partial<ResidentFiltersParams>)}
        options={[{ label: 'All Types', value: 'all' }, ...RESIDENT_TYPE_OPTIONS]}
        placeholder="Type"
      />
      <SelectField
        className="w-40"
        value={
          filters.is_active === undefined ? 'all'
          : filters.is_active ? 'true' : 'false'
        }
        onValueChange={(v) =>
          onChange({
            ...filters,
            is_active: v === 'all' ? undefined : v === 'true',
          })
        }
        options={[{ label: 'All Statuses', value: 'all' }, ...STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

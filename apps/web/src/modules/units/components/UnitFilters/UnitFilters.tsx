import { SearchInput, SelectField } from '@ams/ui';
import { UNIT_TYPE_OPTIONS, OWNERSHIP_TYPE_OPTIONS } from '../../constants/unit.constants';
import type { UnitFiltersParams } from '../../types/unit.types';

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
        value={(filters as Record<string, string>).search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: undefined })}
      />

      <SelectField
        className="w-40"
        value={filters.unit_type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, unit_type: v === 'all' ? undefined : v as UnitFiltersParams['unit_type'] })}
        options={[{ label: 'All Types', value: 'all' }, ...UNIT_TYPE_OPTIONS]}
        placeholder="Unit Type"
      />

      <SelectField
        className="w-40"
        value={filters.ownership_type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, ownership_type: v === 'all' ? undefined : v as UnitFiltersParams['ownership_type'] })}
        options={[{ label: 'All Ownership', value: 'all' }, ...OWNERSHIP_TYPE_OPTIONS]}
        placeholder="Ownership"
      />
    </div>
  );
}

import { SearchInput, SelectField } from '@ams/ui';
import { UNIT_TYPE_OPTIONS, OCCUPANCY_STATUS_OPTIONS } from '../../constants/unit.constants';
import type { UnitFiltersParams } from '../../types/unit.types';

export interface UnitFiltersProps {
  filters:  Partial<UnitFiltersParams>;
  onChange: (filters: Partial<UnitFiltersParams>) => void;
  blocks?:  { label: string; value: string }[];
}

export function UnitFilters({ filters, onChange, blocks = [] }: UnitFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search units..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: undefined })}
      />

      {blocks.length > 0 && (
        <SelectField
          className="w-40"
          value={filters.block_id ? String(filters.block_id) : 'all'}
          onValueChange={(v) =>
            onChange({ ...filters, block_id: v === 'all' ? undefined : Number(v) })
          }
          options={[{ label: 'All Blocks', value: 'all' }, ...blocks]}
          placeholder="Block"
        />
      )}

      <SelectField
        className="w-44"
        value={filters.unit_type ?? 'all'}
        onValueChange={(v) =>
          onChange({ ...filters, unit_type: v === 'all' ? undefined : (v as UnitFiltersParams['unit_type']) })
        }
        options={[{ label: 'All Types', value: 'all' }, ...UNIT_TYPE_OPTIONS]}
        placeholder="Unit Type"
      />

      <SelectField
        className="w-44"
        value={filters.occupancy_status ?? 'all'}
        onValueChange={(v) =>
          onChange({ ...filters, occupancy_status: v === 'all' ? undefined : (v as UnitFiltersParams['occupancy_status']) })
        }
        options={[{ label: 'All Occupancy', value: 'all' }, ...OCCUPANCY_STATUS_OPTIONS]}
        placeholder="Occupancy"
      />
    </div>
  );
}

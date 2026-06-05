import { SearchInput, SelectField } from '@ams/ui';
import { VISITOR_TYPE_OPTIONS } from '../../constants';
import type { VisitorFiltersParams } from '../../types/visitor.types';

export interface VisitorFiltersProps {
  filters:  Partial<VisitorFiltersParams>;
  onChange: (filters: Partial<VisitorFiltersParams>) => void;
}

export function VisitorFilters({ filters, onChange }: VisitorFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search by name or mobile..."
        value={(filters as Record<string, string>).search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: undefined })}
      />

      <SelectField
        className="w-44"
        value={(filters as Record<string, string>).visitor_type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, ...( v === 'all' ? {} : { visitor_type: v } ) })}
        options={[{ label: 'All Types', value: 'all' }, ...VISITOR_TYPE_OPTIONS]}
        placeholder="Visitor Type"
      />

      <SelectField
        className="w-40"
        value={filters.status ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, status: v === 'all' ? undefined : v })}
        options={[
          { label: 'All Status', value: 'all' },
          { label: 'Active',     value: 'active' },
          { label: 'Inactive',   value: 'inactive' },
        ]}
        placeholder="Status"
      />
    </div>
  );
}

import { SearchInput, SelectField } from '@ams/ui';
import {
  VISITOR_TYPE_OPTIONS,
  VISITOR_STATUS_OPTIONS,
  ENTRY_STATUS_OPTIONS,
} from '../../constants';
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
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: '' })}
      />

      <SelectField
        className="w-44"
        value={filters.type ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, type: v === 'all' ? undefined : v as VisitorFiltersParams['type'] })}
        options={[{ label: 'All Types', value: 'all' }, ...VISITOR_TYPE_OPTIONS]}
        placeholder="Type"
      />

      <SelectField
        className="w-40"
        value={filters.entryStatus ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, entryStatus: v === 'all' ? undefined : v as VisitorFiltersParams['entryStatus'] })}
        options={[{ label: 'All Entry', value: 'all' }, ...ENTRY_STATUS_OPTIONS]}
        placeholder="Entry Status"
      />

      <SelectField
        className="w-40"
        value={filters.status ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, status: v === 'all' ? undefined : v as VisitorFiltersParams['status'] })}
        options={[{ label: 'All Status', value: 'all' }, ...VISITOR_STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

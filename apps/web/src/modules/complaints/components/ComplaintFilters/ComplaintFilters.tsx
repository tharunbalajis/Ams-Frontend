import { SearchInput, SelectField } from '@ams/ui';
import {
  COMPLAINT_CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from '../../constants';
import type { ComplaintFiltersParams } from '../../types/complaint.types';

export interface ComplaintFiltersProps {
  filters:  Partial<ComplaintFiltersParams>;
  onChange: (filters: Partial<ComplaintFiltersParams>) => void;
}

export function ComplaintFilters({ filters, onChange }: ComplaintFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder="Search complaints..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: '' })}
      />

      <SelectField
        className="w-44"
        value={filters.category}
        onValueChange={(v) => onChange({ ...filters, category: v as ComplaintFiltersParams['category'] })}
        options={[{ label: 'All Categories', value: '' }, ...COMPLAINT_CATEGORY_OPTIONS]}
        placeholder="Category"
      />

      <SelectField
        className="w-36"
        value={filters.priority}
        onValueChange={(v) => onChange({ ...filters, priority: v as ComplaintFiltersParams['priority'] })}
        options={[{ label: 'All Priority', value: '' }, ...PRIORITY_OPTIONS]}
        placeholder="Priority"
      />

      <SelectField
        className="w-40"
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v as ComplaintFiltersParams['status'] })}
        options={[{ label: 'All Status', value: '' }, ...STATUS_OPTIONS]}
        placeholder="Status"
      />

      <SelectField
        className="w-40"
        value={filters.slaBreached !== undefined ? String(filters.slaBreached) : ''}
        onValueChange={(v) => onChange({ ...filters, slaBreached: v === '' ? undefined : v === 'true' })}
        options={[
          { label: 'All SLA',       value: '' },
          { label: 'SLA Breached',  value: 'true' },
          { label: 'SLA On Track',  value: 'false' },
        ]}
        placeholder="SLA"
      />
    </div>
  );
}

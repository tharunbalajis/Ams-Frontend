import { SearchInput, SelectField } from '@ams/ui';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants';
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
        value={(filters as Record<string, string>).search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: undefined })}
      />

      <SelectField
        className="w-36"
        value={filters.priority ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, priority: v === 'all' ? undefined : v as ComplaintFiltersParams['priority'] })}
        options={[{ label: 'All Priority', value: 'all' }, ...PRIORITY_OPTIONS]}
        placeholder="Priority"
      />

      <SelectField
        className="w-40"
        value={filters.status ?? 'all'}
        onValueChange={(v) => onChange({ ...filters, status: v === 'all' ? undefined : v as ComplaintFiltersParams['status'] })}
        options={[{ label: 'All Status', value: 'all' }, ...STATUS_OPTIONS]}
        placeholder="Status"
      />
    </div>
  );
}

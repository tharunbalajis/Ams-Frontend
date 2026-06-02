import { SearchInput, SelectField } from '@ams/ui';

export interface FinancialFiltersState {
  search?:   string;
  status?:   string;
  type?:     string;
  dateFrom?: string;
  dateTo?:   string;
}

export interface FinancialFiltersProps {
  filters:          FinancialFiltersState;
  onChange:         (filters: FinancialFiltersState) => void;
  statusOptions?:   { label: string; value: string }[];
  typeOptions?:     { label: string; value: string }[];
  showDateRange?:   boolean;
  searchPlaceholder?: string;
}

export function FinancialFilters({
  filters,
  onChange,
  statusOptions,
  typeOptions,
  showDateRange = true,
  searchPlaceholder = 'Search...',
}: FinancialFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SearchInput
        className="w-64"
        placeholder={searchPlaceholder}
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: (e.target as HTMLInputElement).value })}
        onClear={() => onChange({ ...filters, search: '' })}
      />

      {typeOptions && (
        <SelectField
          className="w-44"
          value={filters.type}
          onValueChange={(v) => onChange({ ...filters, type: v || undefined })}
          options={[{ label: 'All Types', value: '' }, ...typeOptions]}
          placeholder="Type"
        />
      )}

      {statusOptions && (
        <SelectField
          className="w-40"
          value={filters.status}
          onValueChange={(v) => onChange({ ...filters, status: v || undefined })}
          options={[{ label: 'All Status', value: '' }, ...statusOptions]}
          placeholder="Status"
        />
      )}

      {showDateRange && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.dateFrom ?? ''}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          />
          <span className="text-sm text-muted-foreground">—</span>
          <input
            type="date"
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filters.dateTo ?? ''}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

import { SelectField } from '@ams/ui';
import { ATTENDANCE_STATUS_OPTIONS } from '../../constants/attendance.constants';
import type { AttendanceFiltersParams } from '../../types/attendance.types';

export interface AttendanceFiltersProps {
  filters:  Partial<AttendanceFiltersParams>;
  onChange: (filters: Partial<AttendanceFiltersParams>) => void;
}

export function AttendanceFilters({ filters, onChange }: AttendanceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <SelectField
        className="w-44"
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v as AttendanceFiltersParams['status'] })}
        options={[{ label: 'All Statuses', value: '' }, ...ATTENDANCE_STATUS_OPTIONS]}
        placeholder="Status"
      />

      <div className="flex items-center gap-2">
        <input
          type="date"
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.dateFrom ?? ''}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
        />
        <span className="text-sm text-muted-foreground">to</span>
        <input
          type="date"
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={filters.dateTo ?? ''}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
        />
      </div>
    </div>
  );
}

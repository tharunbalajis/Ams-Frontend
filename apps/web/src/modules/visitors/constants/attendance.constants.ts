import type { AttendanceStatus } from '../types/attendance.types';

export const ATTENDANCE_STATUS_OPTIONS: { label: string; value: AttendanceStatus }[] = [
  { label: 'Present',   value: 'present' },
  { label: 'Absent',    value: 'absent' },
  { label: 'Late',      value: 'late' },
  { label: 'Half Day',  value: 'half_day' },
  { label: 'On Leave',  value: 'on_leave' },
];

export const ATTENDANCE_STATUS_COLOR: Record<AttendanceStatus, string> = {
  present:  'success',
  absent:   'destructive',
  late:     'warning',
  half_day: 'secondary',
  on_leave: 'outline',
};

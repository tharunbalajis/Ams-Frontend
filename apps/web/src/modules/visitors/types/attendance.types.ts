import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'on_leave';

export interface AttendanceRecord {
  id:           ID;
  staffId:      ID;
  staffName:    string;
  role:         string;
  date:         string;
  checkInTime:  Nullable<string>;
  checkOutTime: Nullable<string>;
  status:       AttendanceStatus;
  isLate:       boolean;
  notes:        Nullable<string>;
  createdAt:    Timestamp;
  updatedAt:    Timestamp;
}

export interface AttendanceFiltersParams {
  search?:    string;
  status?:    AttendanceStatus;
  dateFrom?:  string;
  dateTo?:    string;
  page?:      number;
  pageSize?:  number;
}

export interface MarkAttendancePayload {
  staffId:      ID;
  date:         string;
  checkInTime?: string;
  status:       AttendanceStatus;
  notes?:       string;
}

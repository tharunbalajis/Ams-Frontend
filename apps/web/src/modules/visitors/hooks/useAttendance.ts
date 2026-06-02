import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { attendanceApi } from '../api/attendance.api';
import type { AttendanceFiltersParams } from '../types/attendance.types';

export function useAttendance(params?: AttendanceFiltersParams) {
  return useQuery({
    queryKey:  ['visitors', 'attendance', params],
    queryFn:   () => attendanceApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

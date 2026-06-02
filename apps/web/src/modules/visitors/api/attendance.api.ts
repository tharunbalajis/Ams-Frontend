import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { AttendanceRecord, MarkAttendancePayload, AttendanceFiltersParams } from '../types/attendance.types';

const BASE = '/visitors/attendance';

export const attendanceApi = {
  getAll: (params?: AttendanceFiltersParams) =>
    apiClient.get<ApiListResponse<AttendanceRecord>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<AttendanceRecord>>(`${BASE}/${id}`).then((r) => r.data),

  mark: (payload: MarkAttendancePayload) =>
    apiClient.post<ApiResponse<AttendanceRecord>>(BASE, payload).then((r) => r.data),

  checkOut: (id: string, checkOutTime: string) =>
    apiClient.patch<ApiResponse<AttendanceRecord>>(`${BASE}/${id}/check-out`, { checkOutTime }).then((r) => r.data),
};

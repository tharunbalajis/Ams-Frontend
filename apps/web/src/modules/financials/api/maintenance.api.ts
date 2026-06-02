import apiClient from '@/api/client';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type { MaintenanceCharge, GenerateMaintenancePayload } from '../types/maintenance.types';

const BASE = '/financials/maintenance';

export const maintenanceApi = {
  getAll: (params?: { period?: string; page?: number; pageSize?: number }) =>
    apiClient.get<ApiListResponse<MaintenanceCharge>>(BASE, { params }).then((r) => r.data),

  generate: (payload: GenerateMaintenancePayload) =>
    apiClient.post<ApiResponse<{ count: number }>>(`${BASE}/generate`, payload).then((r) => r.data),

  getByResident: (residentId: string) =>
    apiClient.get<ApiListResponse<MaintenanceCharge>>(`${BASE}/resident/${residentId}`).then((r) => r.data),
};

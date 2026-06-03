import apiClient from '@/api/client';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type {
  MaintenanceHead,
  CreateMaintenanceHeadPayload,
  UpdateMaintenanceHeadPayload,
  GenerateInvoicesPayload,
} from '../types/maintenance.types';

const BASE = '/financials/heads';

export const maintenanceApi = {
  getHeads: (params?: Record<string, unknown>) =>
    apiClient.get<ApiListResponse<MaintenanceHead>>(BASE, { params }).then((r) => r.data),

  getHeadById: (id: string) =>
    apiClient.get<ApiResponse<MaintenanceHead>>(`${BASE}/${id}`).then((r) => r.data),

  createHead: (payload: CreateMaintenanceHeadPayload) =>
    apiClient.post<ApiResponse<MaintenanceHead>>(BASE, payload).then((r) => r.data),

  updateHead: (id: string, payload: UpdateMaintenanceHeadPayload) =>
    apiClient.patch<ApiResponse<MaintenanceHead>>(`${BASE}/${id}`, payload).then((r) => r.data),

  generateInvoices: (payload: GenerateInvoicesPayload) =>
    apiClient.post<ApiResponse<{ count: number }>>(`${BASE}/generate`, payload).then((r) => r.data),
};

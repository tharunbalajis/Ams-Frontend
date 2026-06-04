import apiClient from '@/api/client';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type {
  MaintenanceHead,
  CreateMaintenanceHeadPayload,
  UpdateMaintenanceHeadPayload,
  GenerateInvoicesPayload,
} from '../types/maintenance.types';

// Backend path: /maintenance-heads  (NOT /financials/heads)
const BASE = '/maintenance-heads';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const maintenanceApi = {
  getHeads: (params?: Record<string, unknown>) =>
    apiClient.get<MaintenanceHead[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getHeadById: (id: string) =>
    apiClient.get<MaintenanceHead>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<MaintenanceHead>),

  createHead: (payload: CreateMaintenanceHeadPayload) =>
    apiClient.post<MaintenanceHead>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<MaintenanceHead>),

  updateHead: (id: string, payload: UpdateMaintenanceHeadPayload) =>
    apiClient.put<MaintenanceHead>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<MaintenanceHead>),

  deleteHead: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  generateInvoices: (payload: GenerateInvoicesPayload) =>
    apiClient.post<ApiResponse<{ count: number }>>(`${BASE}/generate`, payload).then((r) => r.data),
};

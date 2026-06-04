import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { SOSAlert, CreateSOSAlertPayload, ResolveSOSAlertPayload } from '../types/sos.types';

const BASE = '/sos-alerts';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const sosApi = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get<SOSAlert[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getActive: () =>
    apiClient.get<SOSAlert[]>(BASE, { params: { status: 'ACTIVE' } }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<SOSAlert>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<SOSAlert>),

  raise: (payload: CreateSOSAlertPayload) =>
    apiClient.post<SOSAlert>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<SOSAlert>),

  acknowledge: (id: string) =>
    apiClient.put<SOSAlert>(`${BASE}/${id}/resolve`, { status: 'ACKNOWLEDGED' }).then((r) => ({ data: r.data, success: true }) as ApiResponse<SOSAlert>),

  resolve: (id: string, payload: ResolveSOSAlertPayload) =>
    apiClient.put<SOSAlert>(`${BASE}/${id}/resolve`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<SOSAlert>),
};

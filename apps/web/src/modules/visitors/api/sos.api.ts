import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { SOSAlert, CreateSOSAlertPayload, ResolveSOSAlertPayload } from '../types/sos.types';

const BASE = '/visitors/sos';

export const sosApi = {
  getAll: (params?: { status?: string; page?: number; pageSize?: number }) =>
    apiClient.get<ApiListResponse<SOSAlert>>(BASE, { params }).then((r) => r.data),

  getActive: () =>
    apiClient.get<ApiListResponse<SOSAlert>>(`${BASE}/active`).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<SOSAlert>>(`${BASE}/${id}`).then((r) => r.data),

  raise: (payload: CreateSOSAlertPayload) =>
    apiClient.post<ApiResponse<SOSAlert>>(BASE, payload).then((r) => r.data),

  acknowledge: (id: string) =>
    apiClient.patch<ApiResponse<SOSAlert>>(`${BASE}/${id}/acknowledge`).then((r) => r.data),

  resolve: (id: string, payload: ResolveSOSAlertPayload) =>
    apiClient.patch<ApiResponse<SOSAlert>>(`${BASE}/${id}/resolve`, payload).then((r) => r.data),
};

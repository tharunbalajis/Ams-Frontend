import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { PreApprovedVisitor } from '../types/visitor.types';

const BASE = '/visitors/pre-approved';

export const preApprovedVisitorsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<ApiListResponse<PreApprovedVisitor>>(BASE, { params }).then((r) => r.data),

  create: (payload: { visitorName: string; visitorMobile: string; residentId: string; validUntil: string }) =>
    apiClient.post<ApiResponse<PreApprovedVisitor>>(BASE, payload).then((r) => r.data),

  revoke: (id: string) =>
    apiClient.patch<ApiResponse<PreApprovedVisitor>>(`${BASE}/${id}/revoke`).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};

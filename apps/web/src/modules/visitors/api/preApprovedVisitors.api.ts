import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Invite, CreateInvitePayload } from '../types/invite.types';

const BASE = '/visitors/invites';

export const preApprovedVisitorsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<ApiListResponse<Invite>>(BASE, { params }).then((r) => r.data),

  create: (payload: CreateInvitePayload) =>
    apiClient.post<ApiResponse<Invite>>(BASE, payload).then((r) => r.data),

  revoke: (id: string) =>
    apiClient.patch<ApiResponse<Invite>>(`${BASE}/${id}/revoke`).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`),
};

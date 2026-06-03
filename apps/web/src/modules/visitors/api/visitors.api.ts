import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Visitor,
  VisitorListItem,
  CreateVisitorPayload,
  UpdateVisitorPayload,
  VisitorFiltersParams,
} from '../types/visitor.types';
import type { Invite, CreateInvitePayload } from '../types/invite.types';

const BASE = '/visitors';

export const visitorsApi = {
  getAll: (params?: VisitorFiltersParams) =>
    apiClient.get<ApiListResponse<VisitorListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Visitor>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateVisitorPayload) =>
    apiClient.post<ApiResponse<Visitor>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateVisitorPayload) =>
    apiClient.patch<ApiResponse<Visitor>>(`${BASE}/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  checkIn: (id: string, gateNumber?: string) =>
    apiClient.patch<ApiResponse<Visitor>>(`${BASE}/${id}/check-in`, { gateNumber }).then((r) => r.data),

  checkOut: (id: string) =>
    apiClient.patch<ApiResponse<Visitor>>(`${BASE}/${id}/check-out`).then((r) => r.data),

  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient
      .get<ApiResponse<{ total: number; checkedIn: number; expected: number; overstay: number }>>(
        `${BASE}/dashboard`,
        { params },
      )
      .then((r) => r.data),

  getInvites: (params?: Record<string, unknown>) =>
    apiClient.get<ApiListResponse<Invite>>(`${BASE}/invites`, { params }).then((r) => r.data),

  getInviteById: (id: string) =>
    apiClient.get<ApiResponse<Invite>>(`${BASE}/invites/${id}`).then((r) => r.data),

  createInvite: (payload: CreateInvitePayload) =>
    apiClient.post<ApiResponse<Invite>>(`${BASE}/invites`, payload).then((r) => r.data),

  revokeInvite: (id: string) =>
    apiClient.patch<ApiResponse<Invite>>(`${BASE}/invites/${id}/revoke`).then((r) => r.data),
};

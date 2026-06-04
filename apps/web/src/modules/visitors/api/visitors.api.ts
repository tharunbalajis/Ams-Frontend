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

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return {
    data: arr,
    meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
    success: true,
  };
}

export const visitorsApi = {
  getAll: (params?: VisitorFiltersParams) =>
    apiClient.get<VisitorListItem[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Visitor>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  create: (payload: CreateVisitorPayload) =>
    apiClient.post<Visitor>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  update: (id: string, payload: UpdateVisitorPayload) =>
    apiClient.put<Visitor>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  // Backend uses PUT /visitors/:id/checkin (not /check-in)
  checkIn: (id: string, gateNumber?: string) =>
    apiClient.put<Visitor>(`${BASE}/${id}/checkin`, { gateNumber }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  // Backend uses PUT /visitors/:id/checkout (not /check-out)
  checkOut: (id: string) =>
    apiClient.put<Visitor>(`${BASE}/${id}/checkout`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<Record<string, unknown>>(`${BASE}/dashboard`, { params }).then((r) => ({ data: r.data, success: true })),

  getInvites: (params?: Record<string, unknown>) =>
    apiClient.get<Invite[]>(`${BASE}/invites`, { params }).then((r) => wrapArray(r.data)),

  getInviteById: (id: string) =>
    apiClient.get<Invite>(`${BASE}/invites/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invite>),

  createInvite: (payload: CreateInvitePayload) =>
    apiClient.post<Invite>(`${BASE}/invites`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Invite>),

  revokeInvite: (id: string) =>
    apiClient.put(`${BASE}/invites/${id}/revoke`, {}).then((r) => ({ data: r.data, success: true })),
};

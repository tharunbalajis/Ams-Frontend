import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Visitor,
  CreateVisitorPayload,
  UpdateVisitorPayload,
  VisitorFiltersParams,
} from '../types/visitor.types';

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
    apiClient.get<Visitor[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Visitor>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  create: (payload: CreateVisitorPayload) =>
    apiClient.post<Visitor>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  update: (id: string, payload: UpdateVisitorPayload) =>
    apiClient.put<Visitor>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  checkIn: (id: string) =>
    apiClient.put<Visitor>(`${BASE}/${id}/checkin`, {}).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  checkOut: (id: string) =>
    apiClient.put<Visitor>(`${BASE}/${id}/checkout`, {}).then((r) => ({ data: r.data, success: true }) as ApiResponse<Visitor>),

  getDashboard: () =>
    apiClient.get<Record<string, unknown>>(`${BASE}/dashboard`).then((r) => r.data),

  getInvites: (params?: Record<string, unknown>) =>
    apiClient.get(`${BASE}/invites`, { params }).then((r) => {
      const arr = Array.isArray(r.data) ? r.data : [];
      return wrapArray(arr);
    }),

  createInvite: (payload: Record<string, unknown>) =>
    apiClient.post(`${BASE}/invites`, payload).then((r) => ({ data: r.data, success: true })),

  revokeInvite: (id: string, data: { revoke_reason: string }) =>
    apiClient.put(`${BASE}/invites/${id}/revoke`, data).then((r) => ({ data: r.data, success: true })),

  getDeliveries: (params?: Record<string, unknown>) =>
    apiClient.get('/delivery-entries', { params }).then((r) => {
      const arr = Array.isArray(r.data) ? r.data : [];
      return wrapArray(arr);
    }),

  createDelivery: (payload: Record<string, unknown>) =>
    apiClient.post('/delivery-entries', payload).then((r) => ({ data: r.data, success: true })),

  markDelivered: (id: string) =>
    apiClient.put(`/delivery-entries/${id}/delivered`, {}).then((r) => ({ data: r.data, success: true })),
};

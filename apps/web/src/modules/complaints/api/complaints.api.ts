import apiClient from '@/api/client';
import { adaptListResponse } from '@/api/utils';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Complaint,
  ComplaintCategory,
  CreateComplaintPayload,
  UpdateComplaintPayload,
  ComplaintFiltersParams,
  ComplaintStatus,
  ComplaintTimelineEvent,
} from '../types/complaint.types';

const BASE = '/complaints';

export const complaintsApi = {
  getAll: (params?: ComplaintFiltersParams) =>
    apiClient.get(BASE, { params }).then((r) => adaptListResponse<Complaint>(r.data)),

  getById: (id: string) =>
    apiClient.get<Complaint>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  create: (payload: CreateComplaintPayload) =>
    apiClient.post<Complaint>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  update: (id: string, payload: UpdateComplaintPayload) =>
    apiClient.put<Complaint>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  // PUT /complaints/:id/status
  updateStatus: (id: string, status: ComplaintStatus, resolution_notes?: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}/status`, { status, resolution_notes }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  // PUT /complaints/:id/assign
  assign: (id: string, assigned_to: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}/assign`, { assigned_to }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  getTimeline: (id: string) =>
    apiClient.get(`${BASE}/${id}/timeline`).then((r) => adaptListResponse<ComplaintTimelineEvent>(r.data)),

  // Backend: /complaint-categories (separate resource)
  getCategories: (params?: { society_id?: number }) =>
    apiClient.get('/complaint-categories', { params }).then((r) => adaptListResponse<ComplaintCategory>(r.data)),

  createCategory: (data: { society_id: number; category_name: string; sla_hours?: number; escalation_hours?: number }) =>
    apiClient.post<ComplaintCategory>('/complaint-categories', data).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintCategory>),

  updateCategory: (id: string, data: Partial<ComplaintCategory>) =>
    apiClient.put<ComplaintCategory>(`/complaint-categories/${id}`, data).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintCategory>),

  // Backend: /complaints/dashboard
  getDashboard: () =>
    apiClient.get<Record<string, unknown>>(`${BASE}/dashboard`).then((r) => r.data),
};

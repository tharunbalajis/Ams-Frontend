import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Complaint,
  ComplaintListItem,
  ComplaintCategory,
  ComplaintMedia,
  CreateComplaintPayload,
  UpdateComplaintPayload,
  ComplaintFiltersParams,
  ComplaintStatus,
  ComplaintTimelineEvent,
} from '../types/complaint.types';
import type { ComplaintAnalytics } from '../types/analytics.types';

const BASE = '/complaints';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return { data: arr, meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false }, success: true };
}

export const complaintsApi = {
  getAll: (params?: ComplaintFiltersParams) =>
    apiClient.get<ComplaintListItem[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Complaint>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  create: (payload: CreateComplaintPayload) =>
    apiClient.post<Complaint>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  update: (id: string, payload: UpdateComplaintPayload) =>
    apiClient.put<Complaint>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  // PUT /complaints/:id/status
  updateStatus: (id: string, status: ComplaintStatus, notes?: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}/status`, { status, notes }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  // PUT /complaints/:id/assign
  assign: (id: string, assignedTo: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}/assign`, { assigned_to: assignedTo }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  getTimeline: (id: string) =>
    apiClient.get<ComplaintTimelineEvent[]>(`${BASE}/${id}/timeline`).then((r) => wrapArray(r.data)),

  uploadMedia: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post<ComplaintMedia>(`${BASE}/${id}/media`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintMedia>);
  },

  deleteMedia: (id: string, mediaId: string) =>
    apiClient.delete(`${BASE}/${id}/media/${mediaId}`).then((r) => r.data),

  // Backend: /complaint-categories (separate resource, not /complaints/categories)
  getCategories: (params?: { society_id?: number }) =>
    apiClient.get<ComplaintCategory[]>('/complaint-categories', { params }).then((r) => wrapArray(r.data)),

  createCategory: (data: { society_id: number; category_name: string; sla_hours?: number; escalation_hours?: number }) =>
    apiClient.post<ComplaintCategory>('/complaint-categories', data).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintCategory>),

  // Backend: /complaints/dashboard
  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<ComplaintAnalytics>(`${BASE}/dashboard`, { params }).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintAnalytics>),
};

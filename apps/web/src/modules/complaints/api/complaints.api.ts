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

export const complaintsApi = {
  getAll: (params?: ComplaintFiltersParams) =>
    apiClient.get<ApiListResponse<ComplaintListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Complaint>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateComplaintPayload) =>
    apiClient.post<ApiResponse<Complaint>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateComplaintPayload) =>
    apiClient.patch<ApiResponse<Complaint>>(`${BASE}/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  updateStatus: (id: string, status: ComplaintStatus, notes?: string) =>
    apiClient.patch<ApiResponse<Complaint>>(`${BASE}/${id}/status`, { status, notes }).then((r) => r.data),

  getTimeline: (id: string) =>
    apiClient.get<ApiListResponse<ComplaintTimelineEvent>>(`${BASE}/${id}/timeline`).then((r) => r.data),

  uploadMedia: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post<ApiResponse<ComplaintMedia>>(`${BASE}/${id}/media`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },

  deleteMedia: (id: string, mediaId: string) =>
    apiClient.delete(`${BASE}/${id}/media/${mediaId}`).then((r) => r.data),

  getCategories: () =>
    apiClient.get<ApiListResponse<ComplaintCategory>>(`${BASE}/categories`).then((r) => r.data),

  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<ApiResponse<ComplaintAnalytics>>(`${BASE}/analytics`, { params }).then((r) => r.data),
};

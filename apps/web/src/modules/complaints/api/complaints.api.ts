import apiClient from '@/api/client';
import { getSocietyId } from '@/utils/getSocietyId';
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

const sid = () => getSocietyId();

export const complaintsApi = {
  getAll: (params?: ComplaintFiltersParams) =>
    apiClient.get(BASE, { params: { society_id: sid(), limit: 20, offset: 0, ...params } }).then((r) => adaptListResponse<Complaint>(r.data)),

  getById: (id: string) =>
    apiClient.get<Complaint>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  create: (payload: CreateComplaintPayload) =>
    apiClient.post<Complaint>(BASE, { ...payload, society_id: sid() }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  update: (id: string, payload: UpdateComplaintPayload) =>
    apiClient.put<Complaint>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  // PUT /complaints/:id/status
  updateStatus: (id: string, status: ComplaintStatus, resolution_notes?: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}`, { status, resolution_notes }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  // PUT /complaints/:id/assign
  assign: (id: string, assigned_to: string) =>
    apiClient.put<Complaint>(`${BASE}/${id}`, { assigned_to }).then((r) => ({ data: r.data, success: true }) as ApiResponse<Complaint>),

  getTimeline: (id: string) =>
    apiClient.get(`${BASE}/${id}`).then((r) => {
      // Timeline is part of the complaint data
      const data = r.data;
      return { data: data?.timeline || [], success: true };
    }),

  // Backend: /complaint-categories (separate resource)
  getCategories: (complaint_type?: 'USER' | 'MANAGEMENT') =>
    apiClient.get('/complaint-categories', { params: { society_id: sid(), ...(complaint_type ? { complaint_type } : {}) } }).then((r) => adaptListResponse<ComplaintCategory>(r.data)),

  createCategory: (data: { category_name: string; sla_hours?: number; escalation_hours?: number; complaint_type?: 'USER' | 'MANAGEMENT' }) =>
    apiClient.post<ComplaintCategory>('/complaint-categories', { ...data, society_id: sid() }).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintCategory>),

  updateCategory: (id: string, data: Partial<ComplaintCategory>) =>
    apiClient.put<ComplaintCategory>(`/complaint-categories/${id}`, data).then((r) => ({ data: r.data, success: true }) as ApiResponse<ComplaintCategory>),

  // Dashboard: aggregate from complaints list
  getDashboard: async () => {
    const sid_val = sid();
    const [allRes, openRes, criticalRes, resolvedTodayRes] = await Promise.all([
      apiClient.get(BASE, { params: { society_id: sid_val, limit: 100, offset: 0 } }),
      apiClient.get(BASE, { params: { society_id: sid_val, status: 'OPEN', limit: 100, offset: 0 } }),
      apiClient.get(BASE, { params: { society_id: sid_val, priority: 'CRITICAL', limit: 100, offset: 0 } }),
      apiClient.get(BASE, { params: { society_id: sid_val, status: 'RESOLVED', limit: 100, offset: 0 } }),
    ]);
    const all = adaptListResponse(allRes.data);
    const open = adaptListResponse(openRes.data);
    const critical = adaptListResponse(criticalRes.data);
    const resolved = adaptListResponse(resolvedTodayRes.data);
    return {
      total: all.total,
      open: open.data,
      critical: critical.data,
      resolved_today: resolved.data,
    };
  },

  // SLA: filter by OPEN complaints
  getSLA: () =>
    apiClient.get(BASE, { params: { society_id: sid(), status: 'OPEN', limit: 100, offset: 0 } }).then((r) => adaptListResponse(r.data)),

  // Escalation: CRITICAL priority complaints
  getEscalation: () =>
    apiClient.get(BASE, { params: { society_id: sid(), priority: 'CRITICAL', limit: 100, offset: 0 } }).then((r) => adaptListResponse(r.data)),
};
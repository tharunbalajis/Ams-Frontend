import apiClient from './client';
import type { Complaint, ComplaintCategory } from '@/modules/complaints/types/complaint.types';

export const complaintsApi = {
  getCategories: (params?: { society_id?: number }) =>
    apiClient.get<ComplaintCategory[]>('/complaint-categories', { params }),
  createCategory: (data: { society_id: number; category_name: string; sla_hours?: number; escalation_hours?: number }) =>
    apiClient.post<ComplaintCategory>('/complaint-categories', data),
  updateCategory: (id: string, data: Partial<ComplaintCategory>) =>
    apiClient.put<ComplaintCategory>(`/complaint-categories/${id}`, data),
  getDashboard: () => apiClient.get('/complaints/dashboard'),
  getAll: (params?: { society_id?: number; status?: string; priority?: string; cat_id?: string }) =>
    apiClient.get<Complaint[]>('/complaints', { params }),
  getById: (id: string) => apiClient.get<Complaint>(`/complaints/${id}`),
  create: (data: {
    society_id: number; unit_id: number; raised_by: string;
    cat_id: string; title: string; description: string; priority?: string;
  }) => apiClient.post<Complaint>('/complaints', data),
  assign: (id: string, data: { assigned_to: string }) =>
    apiClient.put(`/complaints/${id}/assign`, data),
  updateStatus: (id: string, data: { status: string; resolution_notes?: string }) =>
    apiClient.put(`/complaints/${id}/status`, data),
};

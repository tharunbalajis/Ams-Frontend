import apiClient from './client';

// Complaints API — placeholder definitions
// Aligns with backend: modules/complaints
// Implement in Phase 2

const BASE = '/complaints';

export const complaintsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.put(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  updateStatus: (id: string, payload: unknown) =>
    apiClient.put(`${BASE}/${id}/status`, payload),
};

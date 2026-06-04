import apiClient from './client';

// Residents API — placeholder definitions
// Aligns with backend: modules/residents
// Implement in Phase 2

const BASE = '/residents';

export const residentsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.put(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
};

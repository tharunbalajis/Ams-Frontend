import apiClient from './client';

// Notices API — placeholder definitions
// Aligns with backend: modules/notices
// Implement in Phase 2

const BASE = '/notices';

export const noticesApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  publish: (id: string) => apiClient.post(`${BASE}/${id}/publish`),
};

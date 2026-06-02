import apiClient from './client';

// Compliance API — placeholder definitions
// Aligns with backend: modules/compliance
// Implement in Phase 2

const BASE = '/compliance';

export const complianceApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  getReport: (params?: unknown) => apiClient.get(`${BASE}/report`, { params }),
};

import apiClient from './client';

// Assets API — placeholder definitions
// Aligns with backend: modules/assets
// Implement in Phase 2

const BASE = '/assets';

export const assetsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
};

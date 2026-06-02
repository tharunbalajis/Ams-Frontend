import apiClient from './client';

// Units API — placeholder definitions
// Aligns with backend: modules/units
// Implement in Phase 2

const BASE = '/units';

export const unitsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
};

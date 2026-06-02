import apiClient from './client';

// Visitors API — placeholder definitions
// Aligns with backend: modules/visitors
// Implement in Phase 2

const BASE = '/visitors';

export const visitorsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  checkIn: (id: string) => apiClient.post(`${BASE}/${id}/check-in`),
  checkOut: (id: string) => apiClient.post(`${BASE}/${id}/check-out`),
};

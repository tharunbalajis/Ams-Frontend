import apiClient from './client';

// Meetings API — placeholder definitions
// Aligns with backend: modules/meetings
// Implement in Phase 2

const BASE = '/meetings';

export const meetingsApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  addAttendee: (id: string, payload: unknown) =>
    apiClient.post(`${BASE}/${id}/attendees`, payload),
  updateMinutes: (id: string, payload: unknown) =>
    apiClient.patch(`${BASE}/${id}/minutes`, payload),
};

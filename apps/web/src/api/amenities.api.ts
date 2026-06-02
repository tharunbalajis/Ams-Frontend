import apiClient from './client';

// Amenities API — placeholder definitions
// Aligns with backend: modules/amenities
// Implement in Phase 2

const BASE = '/amenities';

export const amenitiesApi = {
  getAll: (params?: unknown) => apiClient.get(BASE, { params }),
  getById: (id: string) => apiClient.get(`${BASE}/${id}`),
  create: (payload: unknown) => apiClient.post(BASE, payload),
  update: (id: string, payload: unknown) => apiClient.patch(`${BASE}/${id}`, payload),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  getBookings: (id: string, params?: unknown) =>
    apiClient.get(`${BASE}/${id}/bookings`, { params }),
  createBooking: (id: string, payload: unknown) =>
    apiClient.post(`${BASE}/${id}/bookings`, payload),
};

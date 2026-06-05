import apiClient from './client';

const BASE = '/settings';

export const settingsApi = {
  get: () => apiClient.get(BASE),
  update: (payload: unknown) => apiClient.put(BASE, payload),
  getProfile: () => apiClient.get(`${BASE}/profile`),
  updateProfile: (payload: unknown) => apiClient.put(`${BASE}/profile`, payload),
  changePassword: (payload: unknown) => apiClient.post(`${BASE}/change-password`, payload),
};

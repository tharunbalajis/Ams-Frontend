import apiClient from './client';

// Settings API — placeholder definitions
// Aligns with backend: modules/settings
// Implement in Phase 2

const BASE = '/settings';

export const settingsApi = {
  get: () => apiClient.get(BASE),
  update: (payload: unknown) => apiClient.patch(BASE, payload),
  getProfile: () => apiClient.get(`${BASE}/profile`),
  updateProfile: (payload: unknown) => apiClient.patch(`${BASE}/profile`, payload),
  changePassword: (payload: unknown) => apiClient.post(`${BASE}/change-password`, payload),
};

import apiClient from './client';

// Auth API — placeholder definitions
// Aligns with backend: modules/auth
// Implement in Phase 2

const BASE = '/auth';

export const authApi = {
  login: (payload: unknown) => apiClient.post(`${BASE}/login`, payload),
  logout: () => apiClient.post(`${BASE}/logout`),
  refresh: (payload: unknown) => apiClient.post(`${BASE}/refresh`, payload),
  me: () => apiClient.get(`${BASE}/me`),
  forgotPassword: (payload: unknown) => apiClient.post(`${BASE}/forgot-password`, payload),
  resetPassword: (payload: unknown) => apiClient.post(`${BASE}/reset-password`, payload),
};

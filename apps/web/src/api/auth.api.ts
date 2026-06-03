import apiClient from './client';

const BASE = '/auth';

export const authApi = {
  login:  (payload: unknown) => apiClient.post(`${BASE}/login`, payload),
  logout: ()                 => apiClient.post(`${BASE}/logout`),
  refresh:(payload: unknown) => apiClient.post(`${BASE}/refresh`, payload),
  me:     ()                 => apiClient.get(`${BASE}/me`),
};

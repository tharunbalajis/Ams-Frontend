import apiClient from './client';

const BASE = '/units';

export const unitsApi = {
  getAll:    (params?: unknown)                       => apiClient.get(BASE, { params }),
  getById:   (id: string)                             => apiClient.get(`${BASE}/${id}`),
  create:    (payload: unknown)                       => apiClient.post(BASE, payload),
  update:    (id: string, payload: unknown)           => apiClient.patch(`${BASE}/${id}`, payload),
  remove:    (id: string)                             => apiClient.delete(`${BASE}/${id}`),
  getBlocks: ()                                       => apiClient.get(`${BASE}/blocks`),
};

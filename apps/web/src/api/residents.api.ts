import apiClient from './client';
import type { Resident } from '@/modules/residents/types/resident.types';

const BASE = '/residents';

export const residentsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<Resident[]>(BASE, { params }),
  getById: (id: string) => apiClient.get<Resident>(`${BASE}/${id}`),
  create: (data: {
    society_id: number; unit_id: number; full_name: string;
    mobile_primary: string; move_in_date: string;
    relationship?: string; resident_type?: string;
    email?: string; mobile_secondary?: string;
  }) => apiClient.post<Resident>(BASE, data),
  update: (id: string, data: Partial<Resident>) =>
    apiClient.put<Resident>(`${BASE}/${id}`, data),
  remove: (id: string) => apiClient.delete(`${BASE}/${id}`),
  getDashboard: (society_id: number) =>
    apiClient.get('/residents/dashboard', { params: { society_id } }),
};

import apiClient from '@/api/client';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type {
  Resident,
  CreateResidentPayload,
  UpdateResidentPayload,
  ResidentFiltersParams,
} from '../types/resident.types';

const BASE = '/residents';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return {
    data: arr,
    meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
    success: true,
  };
}

export const residentsApi = {
  getAll: (params?: ResidentFiltersParams) =>
    apiClient.get<Resident[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: string) =>
    apiClient.get<Resident>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  create: (payload: CreateResidentPayload) =>
    apiClient.post<Resident>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  update: (id: string, payload: UpdateResidentPayload) =>
    apiClient.put<Resident>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  getDashboard: (society_id?: number) =>
    apiClient.get(`${BASE}/dashboard`, { params: { society_id } }).then((r) => r.data),
};

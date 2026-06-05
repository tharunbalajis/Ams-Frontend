import apiClient from '@/api/client';
import { adaptListResponse } from '@/api/utils';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type {
  Resident,
  ResidentSummary,
  CreateResidentPayload,
  UpdateResidentPayload,
  ResidentFiltersParams,
} from '../types/resident.types';

const BASE = '/residents';

export const residentsApi = {
  getAll: (params?: ResidentFiltersParams) =>
    apiClient.get(BASE, { params }).then((r) => adaptListResponse<Resident>(r.data)),

  getById: (id: string) =>
    apiClient.get<Resident>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  getSummary: () =>
    apiClient.get<ResidentSummary>(`${BASE}/summary`).then((r) => r.data),

  create: (payload: CreateResidentPayload) =>
    apiClient.post<Resident>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  update: (id: string, payload: UpdateResidentPayload) =>
    apiClient.put<Resident>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Resident>),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};

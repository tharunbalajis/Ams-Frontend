import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Resident,
  ResidentListItem,
  CreateResidentPayload,
  UpdateResidentPayload,
  ResidentFiltersParams,
} from '../types/resident.types';

const BASE = '/residents';

export const residentsApi = {
  getAll: (params?: ResidentFiltersParams) =>
    apiClient.get<ApiListResponse<ResidentListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Resident>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateResidentPayload) =>
    apiClient.post<ApiResponse<Resident>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateResidentPayload) =>
    apiClient.patch<ApiResponse<Resident>>(`${BASE}/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  uploadIdProof: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post<ApiResponse<{ url: string }>>(`${BASE}/${id}/id-proof`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};

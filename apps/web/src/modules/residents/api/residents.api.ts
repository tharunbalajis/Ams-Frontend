import type { AxiosResponse } from 'axios';
import { residentsApi as globalApi } from '@/api/residents.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Resident,
  ResidentListItem,
  CreateResidentPayload,
  UpdateResidentPayload,
  ResidentFiltersParams,
} from '../types/resident.types';

export const residentsApi = {
  getAll: (params?: ResidentFiltersParams): Promise<AxiosResponse<ApiListResponse<ResidentListItem>>> =>
    globalApi.getAll(params) as Promise<AxiosResponse<ApiListResponse<ResidentListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Resident>>> =>
    globalApi.getById(id) as Promise<AxiosResponse<ApiResponse<Resident>>>,

  create: (payload: CreateResidentPayload): Promise<AxiosResponse<ApiResponse<Resident>>> =>
    globalApi.create(payload) as Promise<AxiosResponse<ApiResponse<Resident>>>,

  update: (id: string, payload: UpdateResidentPayload): Promise<AxiosResponse<ApiResponse<Resident>>> =>
    globalApi.update(id, payload) as Promise<AxiosResponse<ApiResponse<Resident>>>,

  remove: (id: string): Promise<AxiosResponse<void>> =>
    globalApi.remove(id) as Promise<AxiosResponse<void>>,
};

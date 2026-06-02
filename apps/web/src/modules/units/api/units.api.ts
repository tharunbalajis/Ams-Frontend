import type { AxiosResponse } from 'axios';
import { unitsApi as globalApi } from '@/api/units.api';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type {
  Unit,
  UnitListItem,
  CreateUnitPayload,
  UpdateUnitPayload,
  UnitFiltersParams,
} from '../types/unit.types';

export const unitsApi = {
  getAll: (params?: UnitFiltersParams): Promise<AxiosResponse<ApiListResponse<UnitListItem>>> =>
    globalApi.getAll(params) as Promise<AxiosResponse<ApiListResponse<UnitListItem>>>,

  getById: (id: string): Promise<AxiosResponse<ApiResponse<Unit>>> =>
    globalApi.getById(id) as Promise<AxiosResponse<ApiResponse<Unit>>>,

  create: (payload: CreateUnitPayload): Promise<AxiosResponse<ApiResponse<Unit>>> =>
    globalApi.create(payload) as Promise<AxiosResponse<ApiResponse<Unit>>>,

  update: (id: string, payload: UpdateUnitPayload): Promise<AxiosResponse<ApiResponse<Unit>>> =>
    globalApi.update(id, payload) as Promise<AxiosResponse<ApiResponse<Unit>>>,

  remove: (id: string): Promise<AxiosResponse<void>> =>
    globalApi.remove(id) as Promise<AxiosResponse<void>>,
};

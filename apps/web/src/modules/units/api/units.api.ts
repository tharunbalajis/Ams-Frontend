import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse, PlainArrayResponse } from '@/types/api.types';
import type {
  Unit,
  UnitListItem,
  CreateUnitPayload,
  UpdateUnitPayload,
  UnitFiltersParams,
} from '../types/unit.types';
import type { Block } from '../types/block.types';

const BASE = '/units';

export const unitsApi = {
  getAll: (params?: UnitFiltersParams) =>
    apiClient.get<ApiListResponse<UnitListItem>>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Unit>>(`${BASE}/${id}`).then((r) => r.data),

  create: (payload: CreateUnitPayload) =>
    apiClient.post<ApiResponse<Unit>>(BASE, payload).then((r) => r.data),

  update: (id: string, payload: UpdateUnitPayload) =>
    apiClient.patch<ApiResponse<Unit>>(`${BASE}/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  getBlocks: () =>
    apiClient.get<PlainArrayResponse<Block>>(`${BASE}/blocks`).then((r) => r.data),
};

import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { Unit, CreateUnitPayload, UpdateUnitPayload, UnitFiltersParams } from '../types/unit.types';
import type { Block } from '../types/block.types';

const BASE = '/units';

function wrapArray<T>(data: T[]): ApiListResponse<T> {
  const arr = Array.isArray(data) ? data : [];
  return {
    data: arr,
    meta: { total: arr.length, page: 1, limit: arr.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
    success: true,
  };
}

export const unitsApi = {
  getAll: (params?: UnitFiltersParams) =>
    apiClient.get<Unit[]>(BASE, { params }).then((r) => wrapArray(r.data)),

  getById: (id: number) =>
    apiClient.get<Unit>(`${BASE}/${id}`).then((r) => ({ data: r.data, success: true }) as ApiResponse<Unit>),

  create: (payload: CreateUnitPayload) =>
    apiClient.post<Unit>(BASE, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Unit>),

  update: (id: number, payload: UpdateUnitPayload) =>
    apiClient.put<Unit>(`${BASE}/${id}`, payload).then((r) => ({ data: r.data, success: true }) as ApiResponse<Unit>),

  remove: (id: number) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  // Blocks are at /blocks (separate top-level resource)
  getBlocks: (params?: { society_id?: number }) =>
    apiClient.get<Block[]>('/blocks', { params }).then((r) => {
      const arr = Array.isArray(r.data) ? r.data : [];
      return { data: arr, success: true };
    }),

  createBlock: (data: { society_id: number; block_name: string; total_floors?: number }) =>
    apiClient.post<Block>('/blocks', data).then((r) => ({ data: r.data, success: true })),
};

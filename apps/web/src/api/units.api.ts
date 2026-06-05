import apiClient from './client';
import type { Unit } from '@/modules/units/types/unit.types';
import type { Block } from '@/modules/units/types/block.types';

export const unitsApi = {
  getBlocks: (params?: { society_id?: number }) =>
    apiClient.get<Block[]>('/blocks', { params }),
  createBlock: (data: { society_id: number; block_name: string; total_floors?: number }) =>
    apiClient.post<Block>('/blocks', data),
  updateBlock: (id: number, data: Partial<Block>) =>
    apiClient.put<Block>(`/blocks/${id}`, data),
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<Unit[]>('/units', { params }),
  getById: (id: number) => apiClient.get<Unit>(`/units/${id}`),
  create: (data: {
    society_id: number; unit_number: string;
    unit_type: '1BHK' | '2BHK' | '3BHK' | 'STUDIO';
    block_id?: number; floor_number?: number; ownership_type?: string;
    super_built_up?: number; carpet_area?: number; parking_slots?: number;
  }) => apiClient.post<Unit>('/units', data),
  update: (id: number, data: Partial<Unit>) =>
    apiClient.put<Unit>(`/units/${id}`, data),
  remove: (id: number) => apiClient.delete(`/units/${id}`),
};

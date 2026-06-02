import apiClient from '@/api/client';
import type { ApiListResponse } from '@/types/api.types';
import type { Floor, Block } from '../types/floor.types';

export const floorApi = {
  getBlocks: () =>
    apiClient.get<ApiListResponse<Block>>('/units/blocks').then((r) => r.data),

  getFloors: (blockId: string) =>
    apiClient.get<ApiListResponse<Floor>>(`/units/blocks/${blockId}/floors`).then((r) => r.data),
};

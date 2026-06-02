import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { OccupancyRecord, UpdateOccupancyPayload } from '../types/occupancy.types';

const base = (unitId: ID) => `/units/${unitId}/occupancy`;

export const occupancyApi = {
  getCurrent: (unitId: ID) =>
    apiClient.get<ApiResponse<OccupancyRecord>>(base(unitId)).then((r) => r.data),

  getHistory: (unitId: ID) =>
    apiClient.get<ApiListResponse<OccupancyRecord>>(`${base(unitId)}/history`).then((r) => r.data),

  update: (unitId: ID, payload: UpdateOccupancyPayload) =>
    apiClient.patch<ApiResponse<OccupancyRecord>>(base(unitId), payload).then((r) => r.data),
};

import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { OccupancyFormValues } from '../schemas/occupancy.schema';

export interface OccupancyRecord {
  id:        string;
  unitId:    string;
  status:    string;
  startDate: string;
  endDate?:  string;
  notes?:    string;
}

export const occupancyApi = {
  getByUnit: (unitId: string) =>
    apiClient.get<ApiResponse<OccupancyRecord>>(`/units/${unitId}/occupancy`).then((r) => r.data),

  update: (unitId: string, payload: OccupancyFormValues) =>
    apiClient.put<ApiResponse<OccupancyRecord>>(`/units/${unitId}/occupancy`, payload).then((r) => r.data),
};

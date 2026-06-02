import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Vehicle, CreateVehiclePayload, UpdateVehiclePayload } from '../types/vehicle.types';

const base = (residentId: ID) => `/residents/${residentId}/vehicles`;

export const vehiclesApi = {
  getByResident: (residentId: ID) =>
    apiClient.get<ApiListResponse<Vehicle>>(base(residentId)).then((r) => r.data),

  create: (residentId: ID, payload: CreateVehiclePayload) =>
    apiClient.post<ApiResponse<Vehicle>>(base(residentId), payload).then((r) => r.data),

  update: (residentId: ID, vehicleId: ID, payload: UpdateVehiclePayload) =>
    apiClient.patch<ApiResponse<Vehicle>>(`${base(residentId)}/${vehicleId}`, payload).then((r) => r.data),

  remove: (residentId: ID, vehicleId: ID) =>
    apiClient.delete(`${base(residentId)}/${vehicleId}`),
};

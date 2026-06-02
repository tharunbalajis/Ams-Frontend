import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Ownership, CreateOwnershipPayload, UpdateOwnershipPayload } from '../types/ownership.types';

const base = (unitId: ID) => `/units/${unitId}/ownership`;

export const ownershipApi = {
  getCurrent: (unitId: ID) =>
    apiClient.get<ApiResponse<Ownership>>(base(unitId)).then((r) => r.data),

  getHistory: (unitId: ID) =>
    apiClient.get<ApiListResponse<Ownership>>(`${base(unitId)}/history`).then((r) => r.data),

  create: (unitId: ID, payload: CreateOwnershipPayload) =>
    apiClient.post<ApiResponse<Ownership>>(base(unitId), payload).then((r) => r.data),

  update: (unitId: ID, ownershipId: ID, payload: UpdateOwnershipPayload) =>
    apiClient.patch<ApiResponse<Ownership>>(`${base(unitId)}/${ownershipId}`, payload).then((r) => r.data),
};

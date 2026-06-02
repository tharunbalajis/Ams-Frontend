import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { Pet, CreatePetPayload, UpdatePetPayload } from '../types/pet.types';

const base = (residentId: ID) => `/residents/${residentId}/pets`;

export const petsApi = {
  getByResident: (residentId: ID) =>
    apiClient.get<ApiListResponse<Pet>>(base(residentId)).then((r) => r.data),

  create: (residentId: ID, payload: CreatePetPayload) =>
    apiClient.post<ApiResponse<Pet>>(base(residentId), payload).then((r) => r.data),

  update: (residentId: ID, petId: ID, payload: UpdatePetPayload) =>
    apiClient.patch<ApiResponse<Pet>>(`${base(residentId)}/${petId}`, payload).then((r) => r.data),

  remove: (residentId: ID, petId: ID) =>
    apiClient.delete(`${base(residentId)}/${petId}`),
};

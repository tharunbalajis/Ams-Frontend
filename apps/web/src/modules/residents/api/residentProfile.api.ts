import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { ID } from '@/types/common.types';
import type { ResidentProfile } from '../types/residentProfile.types';

export const residentProfileApi = {
  getProfile: (residentId: ID) =>
    apiClient.get<ApiResponse<ResidentProfile>>(`/residents/${residentId}/profile`).then((r) => r.data),
};

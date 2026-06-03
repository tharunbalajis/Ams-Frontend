import { authApiService } from './auth.api';
import type { ApiResponse } from '@/types/api.types';
import type { AuthUser } from '@/types/auth.types';

export const currentUserApi = {
  getMe: (): Promise<ApiResponse<AuthUser>> => authApiService.me(),
};

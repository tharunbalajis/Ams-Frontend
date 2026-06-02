import type { AxiosResponse } from 'axios';
import { authApi } from '@/api/auth.api';
import type { AuthUser } from '../types/auth.types';

export const currentUserApi = {
  getMe: (): Promise<AxiosResponse<AuthUser>> =>
    authApi.me() as Promise<AxiosResponse<AuthUser>>,
};

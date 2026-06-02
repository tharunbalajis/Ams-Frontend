import type { AxiosResponse } from 'axios';
import { authApi } from '@/api/auth.api';

export const logoutApi = {
  logout: (): Promise<AxiosResponse<void>> =>
    authApi.logout() as Promise<AxiosResponse<void>>,
};

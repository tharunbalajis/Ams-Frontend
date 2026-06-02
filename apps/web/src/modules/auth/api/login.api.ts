import type { AxiosResponse } from 'axios';
import { authApi } from '@/api/auth.api';
import type { LoginPayload, LoginResponse } from '../types/login.types';

export const loginApi = {
  login: (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> =>
    authApi.login(payload) as Promise<AxiosResponse<LoginResponse>>,
};

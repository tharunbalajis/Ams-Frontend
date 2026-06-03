import { authApiService } from './auth.api';
import type { LoginPayload, LoginResponse } from '@/types/auth.types';

export const loginApi = {
  login: (payload: LoginPayload): Promise<LoginResponse> =>
    authApiService.login(payload),
};

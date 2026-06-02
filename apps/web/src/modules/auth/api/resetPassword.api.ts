import type { AxiosResponse } from 'axios';
import { authApi } from '@/api/auth.api';
import type { ResetPasswordPayload, ResetPasswordResponse } from '../types/auth.types';

export const resetPasswordApi = {
  reset: (payload: ResetPasswordPayload): Promise<AxiosResponse<ResetPasswordResponse>> =>
    authApi.resetPassword(payload) as Promise<AxiosResponse<ResetPasswordResponse>>,
};

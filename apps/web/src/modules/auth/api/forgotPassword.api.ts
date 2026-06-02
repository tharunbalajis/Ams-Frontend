import type { AxiosResponse } from 'axios';
import { authApi } from '@/api/auth.api';
import type { ForgotPasswordPayload, ForgotPasswordResponse } from '../types/auth.types';

export const forgotPasswordApi = {
  send: (payload: ForgotPasswordPayload): Promise<AxiosResponse<ForgotPasswordResponse>> =>
    authApi.forgotPassword(payload) as Promise<AxiosResponse<ForgotPasswordResponse>>,
};

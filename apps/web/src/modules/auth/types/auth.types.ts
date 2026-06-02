import type { AuthUser as SharedAuthUser } from '@/types/auth.types';

export type { SharedAuthUser as AuthUser };

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordPayload {
  token:    string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

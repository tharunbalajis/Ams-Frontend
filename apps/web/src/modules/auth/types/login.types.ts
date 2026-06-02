import type { AuthUser, AuthTokens } from '@/types/auth.types';

export type { AuthUser, AuthTokens };

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface LoginResponse {
  user:   AuthUser;
  tokens: AuthTokens;
}

import type { AuthUser, AuthTokens } from '@/types/auth.types';

export interface SessionState {
  user:            AuthUser   | null;
  tokens:          AuthTokens | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  expiresAt:       number | null;
}

export interface SessionStorage {
  accessToken:  string;
  refreshToken: string;
  expiresAt:    number;
}

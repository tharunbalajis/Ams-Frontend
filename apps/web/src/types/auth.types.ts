import type { Role } from '@/config/roles';

export interface AuthUser {
  id:         string;
  email:      string;
  name:       string;
  firstName:  string;
  lastName:   string;
  role:       Role;
  avatar?:    string;
  phone?:     string;
  isActive:   boolean;
}

export interface AuthTokens {
  accessToken:  string;
  refreshToken: string;
  expiresIn:    number;
}

export interface AuthState {
  user:            AuthUser | null;
  tokens:          AuthTokens | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface LoginResponse {
  user:   AuthUser;
  tokens: AuthTokens;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token:    string;
  password: string;
}

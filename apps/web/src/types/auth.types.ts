import type { Role } from '@/config/roles';

export interface AuthUser {
  id:         string;
  email:      string;
  name:       string;
  role:       Role;
  societyId:  string;
  isActive:   boolean;
  phone?:     string;
  avatar?:    string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType:   'bearer';
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
  access_token: string;
  token_type:   'bearer';
  user:         AuthUser;
}

import type { Role } from '@/config/roles';

export interface AuthUser {
  id:         string;
  email:      string;
  full_name:  string;
  role:       Role;
  society_id: number;
  is_active?: boolean;
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

/**
 * Raw shape returned by POST /auth/login.
 * Fields match the backend exactly.
 */
export interface LoginResponseRaw {
  access_token:  string;
  refresh_token: string;
  token_type:    'Bearer';
  expires_in:    number;
  user: {
    id:         string;
    full_name:  string;
    email:      string;
    role:       Role;
    society_id: number;
  };
}

/**
 * Normalised login response used in the UI.
 */
export interface LoginResponse {
  access_token:  string;
  refresh_token: string;
  token_type:    'Bearer';
  expires_in:    number;
  user:          AuthUser;
}

/**
 * Maps the raw backend login response.
 */
export function mapLoginResponse(raw: LoginResponseRaw): LoginResponse {
  return {
    access_token:  raw.access_token,
    refresh_token: raw.refresh_token,
    token_type:    raw.token_type,
    expires_in:    raw.expires_in,
    user: {
      id:         raw.user.id,
      email:      raw.user.email,
      full_name:  raw.user.full_name,
      role:       raw.user.role,
      society_id: raw.user.society_id,
      is_active:  true,
    },
  };
}

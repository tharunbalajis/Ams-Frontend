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

/**
 * Raw shape returned by the backend POST /auth/login.
 * Fields are snake_case and the user object uses full_name / society_id.
 * Use LoginResponse (the mapped shape) everywhere in UI code.
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
    society_id: string;
  };
}

/**
 * Normalised login response — camelCase, matches AuthUser shape.
 * Produced by mapLoginResponse() after calling the API.
 */
export interface LoginResponse {
  access_token:  string;
  refresh_token: string;
  token_type:    'Bearer';
  expires_in:    number;
  user:          AuthUser;
}

/**
 * Maps the raw backend login response to the normalised LoginResponse.
 * Converts full_name → name and society_id → societyId.
 */
export function mapLoginResponse(raw: LoginResponseRaw): LoginResponse {
  return {
    access_token:  raw.access_token,
    refresh_token: raw.refresh_token,
    token_type:    raw.token_type,
    expires_in:    raw.expires_in,
    user: {
      id:        raw.user.id,
      email:     raw.user.email,
      name:      raw.user.full_name,
      role:      raw.user.role,
      societyId: raw.user.society_id,
      isActive:  true,
    },
  };
}
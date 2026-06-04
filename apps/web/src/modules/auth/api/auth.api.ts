import apiClient from '@/api/client';
import type { ApiResponse, ApiListResponse } from '@/types/api.types';
import type { LoginPayload, LoginResponseRaw, LoginResponse, AuthUser } from '@/types/auth.types';
import { mapLoginResponse } from '@/types/auth.types';

const BASE = '/auth';

export interface RegisterUserPayload {
  name:     string;
  email:    string;
  password: string;
  role:     string;
  phone?:   string;
}

export interface AuditLog {
  id:         string;
  userId:     string;
  userEmail:  string;
  action:     string;
  resource:   string;
  resourceId: string | null;
  ipAddress:  string | null;
  createdAt:  string;
}

export interface AuditLogFilters {
  userId?:   string;
  action?:   string;
  resource?: string;
  dateFrom?: string;
  dateTo?:   string;
  page?:     number;
  limit?:    number;
}

export interface UpdateUserPayload {
  name?:    string;
  phone?:   string;
  role?:    string;
}

export const authApiService = {
  /**
   * POST /auth/login
   * Returns the raw backend shape mapped to the normalised LoginResponse.
   */
  login: (payload: LoginPayload): Promise<LoginResponse> =>
    apiClient
      .post<LoginResponseRaw>(`${BASE}/login`, payload)
      .then((r) => mapLoginResponse(r.data)),

  logout: () =>
    apiClient.post<void>(`${BASE}/logout`).then((r) => r.data),

  refresh: (refreshToken: string) =>
    apiClient
      .post<{ access_token: string }>(`${BASE}/refresh`, { refresh_token: refreshToken })
      .then((r) => r.data),

  me: () =>
    apiClient.get<ApiResponse<AuthUser>>(`${BASE}/me`).then((r) => r.data),

  registerUser: (payload: RegisterUserPayload) =>
    apiClient.post<ApiResponse<AuthUser>>(`${BASE}/register`, payload).then((r) => r.data),

  getUsers: (params?: { role?: string; page?: number; limit?: number; search?: string }) =>
    apiClient.get<ApiListResponse<AuthUser>>(`${BASE}/users`, { params }).then((r) => r.data),

  getUserById: (id: string) =>
    apiClient.get<ApiResponse<AuthUser>>(`${BASE}/users/${id}`).then((r) => r.data),

  /**
   * Bug 5 fix: backend registers this as PUT /users/:id — was incorrectly PATCH.
   */
  updateUser: (id: string, payload: UpdateUserPayload) =>
    apiClient.put<ApiResponse<AuthUser>>(`${BASE}/users/${id}`, payload).then((r) => r.data),

  /**
   * Bug 5 fix: backend registers this as PUT /users/:id/deactivate — was incorrectly PATCH.
   */
  deactivateUser: (id: string) =>
    apiClient.put<ApiResponse<AuthUser>>(`${BASE}/users/${id}/deactivate`).then((r) => r.data),

  getAuditLogs: (params?: AuditLogFilters) =>
    apiClient.get<ApiListResponse<AuditLog>>(`${BASE}/audit-logs`, { params }).then((r) => r.data),
};
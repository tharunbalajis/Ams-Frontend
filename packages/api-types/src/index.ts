// @ams/api-types — Shared API response/request type definitions
// These types mirror backend DTOs and are shared across all modules.
// Placeholder exports — implement in Phase 2

export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiError = {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};

import type { ApiListResponse } from '@/types/api.types';

/**
 * Adapts any backend list response to ApiListResponse.
 * Handles two shapes:
 *   1. Raw array: T[]
 *   2. Paginated object: { data: T[], meta: { pagination: { total, page, page_size, total_pages } } }
 */
export function adaptListResponse<T>(responseData: unknown): ApiListResponse<T> {
  if (Array.isArray(responseData)) {
    return {
      data:    responseData as T[],
      meta:    { total: responseData.length, page: 1, limit: responseData.length || 20, totalPages: 1, hasNextPage: false, hasPreviousPage: false },
      success: true,
    };
  }

  const body = responseData as {
    data?: T[];
    meta?: { pagination?: { total?: number; page?: number; page_size?: number; total_pages?: number } };
  };

  const arr        = Array.isArray(body?.data) ? body.data : [];
  const pg         = body?.meta?.pagination;
  const total      = pg?.total      ?? arr.length;
  const page       = pg?.page       ?? 1;
  const pageSize   = pg?.page_size  ?? 20;
  const totalPages = pg?.total_pages ?? 1;

  return {
    data:    arr,
    meta:    { total, page, limit: pageSize, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
    success: true,
  };
}

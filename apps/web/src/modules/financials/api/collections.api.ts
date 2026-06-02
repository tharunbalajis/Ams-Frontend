import apiClient from '@/api/client';
import type { ApiListResponse, ApiResponse } from '@/types/api.types';
import type { CollectionRecord, CollectionSummary, CollectionFiltersParams, Defaulter, AgingBucket } from '../types/collection.types';

const BASE = '/financials/collections';

export const collectionsApi = {
  getAll: (params?: CollectionFiltersParams) =>
    apiClient.get<ApiListResponse<CollectionRecord>>(BASE, { params }).then((r) => r.data),

  getSummary: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<ApiResponse<CollectionSummary>>(`${BASE}/summary`, { params }).then((r) => r.data),

  getDefaulters: (params?: { page?: number; pageSize?: number }) =>
    apiClient.get<ApiListResponse<Defaulter>>(`${BASE}/defaulters`, { params }).then((r) => r.data),

  getAgingBuckets: () =>
    apiClient.get<ApiListResponse<AgingBucket>>(`${BASE}/aging`).then((r) => r.data),
};

import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardSummary, DashboardPeriod } from '../types/dashboard.types';

export const metricsApi = {
  getMetrics: (params?: { period?: DashboardPeriod }) =>
    apiClient
      .get<ApiResponse<DashboardSummary>>('/dashboard/metrics', { params })
      .then((res) => res.data),
};

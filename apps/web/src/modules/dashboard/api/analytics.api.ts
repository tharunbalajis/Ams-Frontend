import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { AnalyticsSummary } from '../types/analytics.types';
import type { DashboardPeriod } from '../types/dashboard.types';

export const analyticsApi = {
  getSummary: (period?: DashboardPeriod) =>
    apiClient
      .get<ApiResponse<AnalyticsSummary>>('/dashboard/analytics', { params: { period } })
      .then((res) => res.data),
};

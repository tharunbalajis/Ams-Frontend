import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardSummary, DashboardFilters } from '../types/dashboard.types';

export const dashboardApi = {
  getSummary: (filters?: DashboardFilters) =>
    apiClient.get<ApiResponse<DashboardSummary>>('/dashboard/summary', { params: filters }),
};

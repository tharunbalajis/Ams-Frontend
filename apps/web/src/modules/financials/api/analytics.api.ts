import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { FinancialAnalytics } from '../types/analytics.types';

export const analyticsApi = {
  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<ApiResponse<FinancialAnalytics>>('/financials/dashboard', { params }).then((r) => r.data),
};

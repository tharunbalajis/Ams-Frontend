import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';
import type { ComplaintAnalytics } from '../types/analytics.types';

export const analyticsApi = {
  getSummary: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<ApiResponse<ComplaintAnalytics>>('/complaints/analytics', { params }).then((r) => r.data),
};

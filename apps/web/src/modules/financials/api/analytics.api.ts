import type { AxiosResponse } from 'axios';
import { financialsApi as globalApi } from '@/api/financials.api';
import type { ApiResponse } from '@/types/api.types';
import type { FinancialAnalytics } from '../types/analytics.types';

export const analyticsApi = {
  getSummary: (params?: { dateFrom?: string; dateTo?: string }): Promise<AxiosResponse<ApiResponse<FinancialAnalytics>>> =>
    globalApi.getSummary(params) as Promise<AxiosResponse<ApiResponse<FinancialAnalytics>>>,
};

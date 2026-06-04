import apiClient from '@/api/client';
import type { FinancialAnalytics } from '../types/analytics.types';

export const analyticsApi = {
  getDashboard: (params?: { dateFrom?: string; dateTo?: string }) =>
    apiClient.get<FinancialAnalytics>('/finance/dashboard', { params }).then((r) => ({ data: r.data, success: true })),
};

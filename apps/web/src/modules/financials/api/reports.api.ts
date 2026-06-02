import apiClient from '@/api/client';
import type { ApiResponse } from '@/types/api.types';

export type ReportType = 'collection' | 'expense' | 'revenue' | 'defaulters' | 'budget';

export interface ReportParams {
  type:      ReportType;
  dateFrom?: string;
  dateTo?:   string;
  format?:   'json' | 'csv' | 'pdf';
}

export const reportsApi = {
  generate: (params: ReportParams) =>
    apiClient.get<ApiResponse<{ downloadUrl: string }>>('/financials/reports', { params }).then((r) => r.data),

  download: (params: Omit<ReportParams, 'format'> & { format: 'csv' | 'pdf' }) =>
    apiClient.get('/financials/reports/download', { params, responseType: 'blob' }),
};

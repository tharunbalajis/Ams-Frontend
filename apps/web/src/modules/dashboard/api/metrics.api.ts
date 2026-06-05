import apiClient from '@/api/client';
import type { DashboardSummary } from '../types/dashboard.types';

export const metricsApi = {
  getMetrics: (_params?: { period?: string }) =>
    apiClient.get<{ data: DashboardSummary } | DashboardSummary>('/dashboard/metrics').then((r) => {
      const body = r.data as unknown;
      // Backend wraps the payload in { data: ... }
      if (body && typeof body === 'object' && 'data' in (body as Record<string, unknown>)) {
        return (body as { data: DashboardSummary }).data;
      }
      return body as DashboardSummary;
    }),
};

import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { metricsApi } from '../api/metrics.api';
import type { DashboardPeriod } from '../types/dashboard.types';

export function useDashboardMetrics(period?: DashboardPeriod) {
  return useQuery({
    queryKey: ['dashboard', 'metrics', period],
    queryFn:  () => metricsApi.getMetrics({ period }),
    staleTime: STALE_TIME.DEFAULT,
  });
}

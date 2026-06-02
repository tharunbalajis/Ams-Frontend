import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { analyticsApi } from '../api/analytics.api';
import type { DashboardPeriod } from '../types/dashboard.types';

export function useAnalytics(period?: DashboardPeriod) {
  return useQuery({
    queryKey: ['dashboard', 'analytics', period],
    queryFn:  () => analyticsApi.getSummary(period),
    staleTime: STALE_TIME.LONG,
  });
}

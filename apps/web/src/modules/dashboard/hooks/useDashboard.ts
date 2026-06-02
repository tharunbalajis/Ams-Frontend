import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { dashboardApi } from '../api/dashboard.api';
import { DASHBOARD_REFRESH_INTERVAL } from '../constants/dashboard.constants';
import type { DashboardFilters } from '../types/dashboard.types';

export function useDashboard(filters?: DashboardFilters) {
  return useQuery({
    queryKey:        ['dashboard', 'summary', filters],
    queryFn:         () => dashboardApi.getSummary(filters).then((res) => res.data),
    staleTime:       STALE_TIME.DEFAULT,
    refetchInterval: DASHBOARD_REFRESH_INTERVAL,
  });
}

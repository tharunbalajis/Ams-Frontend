import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { analyticsApi } from '../api/analytics.api';

export function useFinancialAnalytics(params?: { dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey:  [...financialKeys.summary(), params],
    queryFn:   () => analyticsApi.getSummary(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

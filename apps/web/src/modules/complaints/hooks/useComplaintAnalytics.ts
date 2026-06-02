import { useQuery } from '@tanstack/react-query';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { analyticsApi } from '../api/analytics.api';

export function useComplaintAnalytics(params?: { dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey:  [...complaintKeys.stats(), params],
    queryFn:   () => analyticsApi.getSummary(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

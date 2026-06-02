import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { preApprovedVisitorsApi } from '../api/preApprovedVisitors.api';

export function usePreApprovedVisitors(params?: Record<string, unknown>) {
  return useQuery({
    queryKey:  ['visitors', 'pre-approved', params],
    queryFn:   () => preApprovedVisitorsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

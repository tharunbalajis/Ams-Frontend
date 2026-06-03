import { useQuery } from '@tanstack/react-query';
import { complaintKeys } from '@/lib/index';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';

export function useComplaintAnalytics(params?: { dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey:  [...complaintKeys.dashboard(), params],
    queryFn:   () => complaintsApi.getDashboard(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

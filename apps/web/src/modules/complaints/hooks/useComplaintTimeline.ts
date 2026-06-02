import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';

export function useComplaintTimeline(id: string) {
  return useQuery({
    queryKey:  ['complaints', id, 'timeline'],
    queryFn:   () => complaintsApi.getTimeline(id).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

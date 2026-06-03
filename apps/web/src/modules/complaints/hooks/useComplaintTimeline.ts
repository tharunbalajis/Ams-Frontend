import { useQuery } from '@tanstack/react-query';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';

export function useComplaintTimeline(id: string) {
  return useQuery({
    queryKey:  complaintKeys.timeline.detail(id),
    queryFn:   () => complaintsApi.getTimeline(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

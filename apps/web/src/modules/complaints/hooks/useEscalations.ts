import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { escalationApi } from '../api/escalation.api';

export function useEscalations(complaintId: string) {
  return useQuery({
    queryKey:  ['complaints', complaintId, 'escalations'],
    queryFn:   () => escalationApi.getByComplaint(complaintId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!complaintId,
  });
}

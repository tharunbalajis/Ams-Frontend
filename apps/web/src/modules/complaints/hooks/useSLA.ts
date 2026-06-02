import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { slaApi } from '../api/sla.api';

export function useSLA(complaintId: string) {
  return useQuery({
    queryKey:  ['complaints', complaintId, 'sla'],
    queryFn:   () => slaApi.getByComplaint(complaintId),
    staleTime: STALE_TIME.SHORT,
    enabled:   !!complaintId,
  });
}

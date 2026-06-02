import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { leaseApi } from '../api/lease.api';
import type { ID } from '@/types/common.types';

export function useLease(residentId: ID) {
  return useQuery({
    queryKey: ['residents', residentId, 'lease'],
    queryFn:  () => leaseApi.getActive(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:  !!residentId,
  });
}

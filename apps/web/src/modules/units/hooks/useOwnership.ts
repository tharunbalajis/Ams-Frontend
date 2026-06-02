import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { ownershipApi } from '../api/ownership.api';
import type { ID } from '@/types/common.types';

export function useOwnership(unitId: ID) {
  return useQuery({
    queryKey:  ['units', unitId, 'ownership'],
    queryFn:   () => ownershipApi.getCurrent(unitId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!unitId,
  });
}

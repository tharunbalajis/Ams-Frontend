import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { occupancyApi } from '../api/occupancy.api';
import type { ID } from '@/types/common.types';

export function useOccupancy(unitId: ID) {
  return useQuery({
    queryKey:  ['units', unitId, 'occupancy'],
    queryFn:   () => occupancyApi.getCurrent(unitId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!unitId,
  });
}

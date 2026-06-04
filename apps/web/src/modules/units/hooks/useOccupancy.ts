import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { occupancyApi } from '../api/occupancy.api';

export function useOccupancy(unitId: string) {
  return useQuery({
    queryKey:  ['units', unitId, 'occupancy'],
    queryFn:   () => occupancyApi.getByUnit(unitId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!unitId,
  });
}

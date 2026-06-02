import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { vehiclesApi } from '../api/vehicles.api';
import type { ID } from '@/types/common.types';

export function useVehicles(residentId: ID) {
  return useQuery({
    queryKey: ['residents', residentId, 'vehicles'],
    queryFn:  () => vehiclesApi.getByResident(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:  !!residentId,
  });
}

import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { petsApi } from '../api/pets.api';
import type { ID } from '@/types/common.types';

export function usePets(residentId: ID) {
  return useQuery({
    queryKey: ['residents', residentId, 'pets'],
    queryFn:  () => petsApi.getByResident(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:  !!residentId,
  });
}

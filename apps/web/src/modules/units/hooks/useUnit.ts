import { useQuery } from '@tanstack/react-query';
import { unitKeys } from '@/lib/index';
import { STALE_TIME } from '@/constants/query.constants';
import { unitsApi } from '../api/units.api';

export function useUnit(id: string) {
  return useQuery({
    queryKey:  unitKeys.detail(id),
    queryFn:   () => unitsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

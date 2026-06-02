import { useQuery } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { unitsApi } from '../api/units.api';
import type { UnitFiltersParams } from '../types/unit.types';

export function useUnits(params?: UnitFiltersParams) {
  return useQuery({
    queryKey:  unitKeys.list(params),
    queryFn:   () => unitsApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

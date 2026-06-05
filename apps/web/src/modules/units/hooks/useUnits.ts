import { useQuery } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { unitsApi } from '../api/units.api';
import type { UnitFiltersParams } from '../types/unit.types';

export function useUnits(params?: UnitFiltersParams) {
  return useQuery({
    queryKey:  unitKeys.list(params),
    queryFn:   () => unitsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useUnitSummary() {
  return useQuery({
    queryKey:  unitKeys.summary(),
    queryFn:   () => unitsApi.getSummary(),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useBlocks(societyId?: number) {
  return useQuery({
    queryKey:  [...unitKeys.blocks(), societyId],
    queryFn:   () => unitsApi.getBlocks(societyId ? { society_id: societyId } : undefined),
    staleTime: STALE_TIME.LONG,
  });
}

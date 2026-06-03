import { useQuery } from '@tanstack/react-query';
import { residentKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { residentsApi } from '../api/residents.api';
import type { ResidentFiltersParams } from '../types/resident.types';

export function useResidents(params?: ResidentFiltersParams) {
  return useQuery({
    queryKey:  residentKeys.list(params),
    queryFn:   () => residentsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

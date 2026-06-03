import { useQuery } from '@tanstack/react-query';
import { visitorKeys } from '@/lib/index';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';
import type { VisitorFiltersParams } from '../types/visitor.types';

export function useVisitors(params?: VisitorFiltersParams) {
  return useQuery({
    queryKey:  visitorKeys.list(params),
    queryFn:   () => visitorsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

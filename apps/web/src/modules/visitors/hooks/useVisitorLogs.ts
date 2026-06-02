import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';
import type { VisitorFiltersParams } from '../types/visitor.types';

export function useVisitorLogs(params?: VisitorFiltersParams) {
  return useQuery({
    queryKey:  ['visitors', 'logs', params],
    queryFn:   () => visitorsApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

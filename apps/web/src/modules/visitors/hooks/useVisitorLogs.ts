import { useQuery } from '@tanstack/react-query';
import { visitorKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';
import type { VisitorFiltersParams } from '../types/visitor.types';

export function useVisitorLogs(params?: VisitorFiltersParams) {
  return useQuery({
    queryKey:  [...visitorKeys.lists(), 'logs', params],
    queryFn:   () => visitorsApi.getAll(params),
    staleTime: STALE_TIME.SHORT,
  });
}

export function useVisitorDashboard(params?: { dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey:     visitorKeys.dashboard(),
    queryFn:      () => visitorsApi.getDashboard(params),
    staleTime:    STALE_TIME.SHORT,
    refetchInterval: 60_000,
  });
}

import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { sosApi } from '../api/sos.api';

export function useSOS(params?: { status?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey:  ['visitors', 'sos', params],
    queryFn:   () => sosApi.getAll(params),
    staleTime: STALE_TIME.SHORT,
  });
}

export function useSOSActive() {
  return useQuery({
    queryKey:  ['visitors', 'sos', 'active'],
    queryFn:   () => sosApi.getActive(),
    staleTime: STALE_TIME.SHORT,
    refetchInterval: 30_000,
  });
}

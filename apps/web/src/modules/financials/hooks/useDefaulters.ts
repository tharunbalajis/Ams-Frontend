import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { collectionsApi } from '../api/collections.api';

export function useDefaulters(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey:  ['financials', 'defaulters', params],
    queryFn:   () => collectionsApi.getDefaulters(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

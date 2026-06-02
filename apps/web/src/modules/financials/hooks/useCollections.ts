import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { collectionsApi } from '../api/collections.api';
import type { CollectionFiltersParams } from '../types/collection.types';

export function useCollections(params?: CollectionFiltersParams) {
  return useQuery({
    queryKey:  ['financials', 'collections', params],
    queryFn:   () => collectionsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useCollectionSummary(params?: { dateFrom?: string; dateTo?: string }) {
  return useQuery({
    queryKey:  ['financials', 'collections', 'summary', params],
    queryFn:   () => collectionsApi.getSummary(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

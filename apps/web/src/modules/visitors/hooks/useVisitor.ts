import { useQuery } from '@tanstack/react-query';
import { visitorKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';

export function useVisitor(id: string) {
  return useQuery({
    queryKey:  visitorKeys.detail(id),
    queryFn:   () => visitorsApi.getById(id).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

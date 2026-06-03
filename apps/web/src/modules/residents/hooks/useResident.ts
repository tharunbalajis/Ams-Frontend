import { useQuery } from '@tanstack/react-query';
import { residentKeys } from '@/lib/index';
import { STALE_TIME } from '@/constants/query.constants';
import { residentsApi } from '../api/residents.api';

export function useResident(id: string) {
  return useQuery({
    queryKey:  residentKeys.detail(id),
    queryFn:   () => residentsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

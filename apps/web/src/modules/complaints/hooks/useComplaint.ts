import { useQuery } from '@tanstack/react-query';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';

export function useComplaint(id: string) {
  return useQuery({
    queryKey:  complaintKeys.detail(id),
    queryFn:   () => complaintsApi.getById(id).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

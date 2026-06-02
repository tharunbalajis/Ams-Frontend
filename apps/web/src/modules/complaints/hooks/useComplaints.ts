import { useQuery } from '@tanstack/react-query';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';
import type { ComplaintFiltersParams } from '../types/complaint.types';

export function useComplaints(params?: ComplaintFiltersParams) {
  return useQuery({
    queryKey:  complaintKeys.list(params),
    queryFn:   () => complaintsApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { residentKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { leaseApi } from '../api/lease.api';
import { toast } from '@/utils/toast';
import type { ID } from '@/types/common.types';
import type { CreateLeasePayload, UpdateLeasePayload } from '../types/lease.types';

export function useLease(residentId: ID) {
  return useQuery({
    queryKey:  residentKeys.lease.detail(residentId),
    queryFn:   () => leaseApi.getActive(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!residentId,
  });
}

export function useLeaseHistory(residentId: ID) {
  return useQuery({
    queryKey:  [...residentKeys.lease.detail(residentId), 'history'],
    queryFn:   () => leaseApi.getByResident(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!residentId,
  });
}

export function useCreateLease(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLeasePayload) => leaseApi.create(residentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.lease.detail(residentId) });
      toast.success('Lease created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateLease(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ leaseId, payload }: { leaseId: ID; payload: UpdateLeasePayload }) =>
      leaseApi.update(residentId, leaseId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.lease.detail(residentId) });
      toast.success('Lease updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

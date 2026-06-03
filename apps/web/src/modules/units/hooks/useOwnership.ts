import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { ownershipApi } from '../api/ownership.api';
import { toast } from '@/utils/toast';
import type { ID } from '@/types/common.types';
import type { CreateOwnershipPayload, UpdateOwnershipPayload } from '../types/ownership.types';

export function useOwnership(unitId: ID) {
  return useQuery({
    queryKey:  unitKeys.ownership.detail(unitId),
    queryFn:   () => ownershipApi.getCurrent(unitId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!unitId,
  });
}

export function useOwnershipHistory(unitId: ID) {
  return useQuery({
    queryKey:  [...unitKeys.ownership.detail(unitId), 'history'],
    queryFn:   () => ownershipApi.getHistory(unitId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!unitId,
  });
}

export function useCreateOwnership(unitId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOwnershipPayload) => ownershipApi.create(unitId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.ownership.detail(unitId) });
      toast.success('Ownership record created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateOwnership(unitId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ownershipId, payload }: { ownershipId: ID; payload: UpdateOwnershipPayload }) =>
      ownershipApi.update(unitId, ownershipId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.ownership.detail(unitId) });
      toast.success('Ownership updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitorKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';
import { toast } from '@/utils/toast';
import type { CreateInvitePayload } from '../types/invite.types';

export function usePreApprovedVisitors(params?: Record<string, unknown>) {
  return useQuery({
    queryKey:  visitorKeys.invites.list(params),
    queryFn:   () => visitorsApi.getInvites(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useCreateInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInvitePayload) => visitorsApi.createInvite(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.invites.all() });
      toast.success('Invite created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useRevokeInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => visitorsApi.revokeInvite(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.invites.all() });
      toast.success('Invite revoked.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitorKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { sosApi } from '../api/sos.api';
import { toast } from '@/utils/toast';
import type { CreateSOSAlertPayload, ResolveSOSAlertPayload } from '../types/sos.types';

export function useSOS(params?: { status?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey:  visitorKeys.sos.list(params),
    queryFn:   () => sosApi.getAll(params),
    staleTime: STALE_TIME.SHORT,
  });
}

export function useSOSActive() {
  return useQuery({
    queryKey:        visitorKeys.sos.list({ status: 'ACTIVE' }),
    queryFn:         () => sosApi.getActive(),
    staleTime:       STALE_TIME.SHORT,
    refetchInterval: 30_000,
  });
}

export function useRaiseSOS() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSOSAlertPayload) => sosApi.raise(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.sos.all() });
      toast.warning('SOS alert raised!');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useAcknowledgeSOS() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sosApi.acknowledge(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.sos.detail(id) });
      void queryClient.invalidateQueries({ queryKey: visitorKeys.sos.all() });
      toast.success('SOS acknowledged.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useResolveSOS() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ResolveSOSAlertPayload }) =>
      sosApi.resolve(id, payload),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.sos.detail(id) });
      void queryClient.invalidateQueries({ queryKey: visitorKeys.sos.all() });
      toast.success('SOS resolved.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitorKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { visitorsApi } from '../api/visitors.api';
import { toast } from '@/utils/toast';
import type { CreateVisitorPayload, UpdateVisitorPayload } from '../types/visitor.types';

export function useVisitor(id: string) {
  return useQuery({
    queryKey:  visitorKeys.detail(id),
    queryFn:   () => visitorsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateVisitor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVisitorPayload) => visitorsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.lists() });
      toast.success('Visitor logged.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateVisitor(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateVisitorPayload) => visitorsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: visitorKeys.lists() });
      toast.success('Visitor updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useCheckInVisitor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, gateNumber }: { id: string; gateNumber?: string }) =>
      visitorsApi.checkIn(id, gateNumber),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: visitorKeys.lists() });
      toast.success('Visitor checked in.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useCheckOutVisitor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => visitorsApi.checkOut(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: visitorKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: visitorKeys.lists() });
      toast.success('Visitor checked out.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { authApiService, type RegisterUserPayload, type UpdateUserPayload } from '../api/auth.api';
import { toast } from '@/utils/toast';

// Query keys for user management
const userKeys = {
  all:     ['auth', 'users']            as const,
  lists:   () => [...userKeys.all, 'list'] as const,
  list:    (p?: Record<string, unknown>) => [...userKeys.lists(), p] as const,
  detail:  (id: string) => [...userKeys.all, 'detail', id] as const,
  audit:   (p?: Record<string, unknown>) => ['auth', 'audit-logs', p] as const,
};

export function useUsers(params?: { role?: string; page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey:  userKeys.list(params),
    queryFn:   () => authApiService.getUsers(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey:  userKeys.detail(id),
    queryFn:   () => authApiService.getUserById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useRegisterUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterUserPayload) => authApiService.registerUser(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User registered successfully.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => authApiService.updateUser(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => authApiService.deactivateUser(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User deactivated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useAuditLogs(params?: { userId?: string; action?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey:  userKeys.audit(params),
    queryFn:   () => authApiService.getAuditLogs(params),
    staleTime: STALE_TIME.SHORT,
  });
}

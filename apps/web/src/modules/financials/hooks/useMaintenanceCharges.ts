import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { maintenanceApi } from '../api/maintenance.api';
import { financialKeys } from '@/lib/queryKeys/financials.keys';
import type { CreateMaintenanceHeadPayload } from '../types/maintenance.types';

export function useMaintenanceHeads(params?: Record<string, unknown>) {
  return useQuery({
    queryKey:  financialKeys.heads.list(params),
    queryFn:   () => maintenanceApi.getHeads(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useMaintenanceHead(id: string) {
  return useQuery({
    queryKey: financialKeys.heads.detail(id),
    queryFn:  () => maintenanceApi.getHeadById(id),
    enabled:  !!id,
  });
}

export function useCreateMaintenanceHead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMaintenanceHeadPayload) => maintenanceApi.createHead(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.heads.all() });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
import { unitsApi } from '../api/units.api';
import { toast } from '@/utils/toast';
import type { CreateUnitPayload } from '../types/unit.types';

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUnitPayload) => unitsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: unitKeys.summary() });
      toast.success('Unit created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

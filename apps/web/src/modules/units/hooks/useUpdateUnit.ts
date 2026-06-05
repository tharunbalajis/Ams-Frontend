import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
import { unitsApi } from '../api/units.api';
import { toast } from '@/utils/toast';
import type { UpdateUnitPayload } from '../types/unit.types';

export function useUpdateUnit(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUnitPayload) => unitsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.detail(String(id)) });
      void queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      toast.success('Unit updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { unitKeys } from '@/lib';
import { unitsApi } from '../api/units.api';
import type { UpdateUnitPayload } from '../types/unit.types';

export function useUpdateUnit(id: string) {
  return useMutation({
    mutationFn: (payload: UpdateUnitPayload) => unitsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

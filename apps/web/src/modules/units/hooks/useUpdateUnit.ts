<<<<<<< HEAD
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
=======
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { unitKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { unitsApi } from '../api/units.api';
import { toast } from '@/utils/toast';
import type { UpdateUnitPayload } from '../types/unit.types';

export function useUpdateUnit(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUnitPayload) => unitsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      toast.success('Unit updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

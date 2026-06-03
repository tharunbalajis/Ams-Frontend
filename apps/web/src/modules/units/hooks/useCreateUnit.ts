import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { unitKeys } from '@/lib';
=======
import { queryClient } from '@/lib/queryClient';
import { unitKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { unitsApi } from '../api/units.api';
import { UNIT_ROUTES } from '../constants/unit.constants';
import { toast } from '@/utils/toast';
import type { CreateUnitPayload } from '../types/unit.types';

export function useCreateUnit() {
  const navigate    = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUnitPayload) => unitsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      toast.success('Unit created.');
      void navigate(UNIT_ROUTES.LIST);
    },
    onError: (error) => { toast.apiError(error); },
  });
}

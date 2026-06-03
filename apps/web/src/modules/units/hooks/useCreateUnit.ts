import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { unitKeys } from '@/lib';
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

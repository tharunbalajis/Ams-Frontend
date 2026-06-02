import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { unitKeys } from '@/lib';
import { unitsApi } from '../api/units.api';
import { UNIT_ROUTES } from '../constants/unit.constants';
import type { CreateUnitPayload } from '../types/unit.types';

export function useCreateUnit() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: CreateUnitPayload) => unitsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      void navigate(UNIT_ROUTES.LIST);
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

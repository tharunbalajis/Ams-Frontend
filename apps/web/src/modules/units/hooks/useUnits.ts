<<<<<<< HEAD
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKeys } from '@/lib';
=======
import { useQuery } from '@tanstack/react-query';
import { unitKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { STALE_TIME } from '@/constants/query.constants';
import { unitsApi } from '../api/units.api';
import { toast } from '@/utils/toast';
import type { UnitFiltersParams, CreateUnitPayload, UpdateUnitPayload } from '../types/unit.types';

export function useUnits(params?: UnitFiltersParams) {
  return useQuery({
    queryKey:  unitKeys.list(params),
    queryFn:   () => unitsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useUnit(id: string) {
  return useQuery({
    queryKey:  unitKeys.detail(id),
    queryFn:   () => unitsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useBlocks() {
  return useQuery({
    queryKey:  unitKeys.blocks(),
    queryFn:   () => unitsApi.getBlocks(),
    staleTime: STALE_TIME.LONG,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUnitPayload) => unitsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: unitKeys.lists() });
      toast.success('Unit created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

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

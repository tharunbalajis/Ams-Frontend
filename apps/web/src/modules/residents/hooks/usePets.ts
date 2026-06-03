import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { residentKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { petsApi } from '../api/pets.api';
import { toast } from '@/utils/toast';
import type { ID } from '@/types/common.types';
import type { CreatePetPayload, UpdatePetPayload } from '../types/pet.types';

export function usePets(residentId: ID) {
  return useQuery({
    queryKey:  residentKeys.pets.list(residentId),
    queryFn:   () => petsApi.getByResident(residentId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!residentId,
  });
}

export function useCreatePet(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePetPayload) => petsApi.create(residentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.pets.list(residentId) });
      toast.success('Pet added.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdatePet(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ petId, payload }: { petId: ID; payload: UpdatePetPayload }) =>
      petsApi.update(residentId, petId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.pets.list(residentId) });
      toast.success('Pet updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useDeletePet(residentId: ID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (petId: ID) => petsApi.remove(residentId, petId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.pets.list(residentId) });
      toast.success('Pet removed.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

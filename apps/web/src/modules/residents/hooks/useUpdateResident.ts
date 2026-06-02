import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { residentKeys } from '@/lib';
import { residentsApi } from '../api/residents.api';
import type { UpdateResidentPayload } from '../types/resident.types';

export function useUpdateResident(id: string) {
  return useMutation({
    mutationFn: (payload: UpdateResidentPayload) => residentsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: residentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

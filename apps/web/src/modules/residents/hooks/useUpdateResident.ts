import { useMutation, useQueryClient } from '@tanstack/react-query';
import { residentKeys } from '@/lib';
import { residentsApi } from '../api/residents.api';
import { toast } from '@/utils/toast';
import type { UpdateResidentPayload } from '../types/resident.types';

export function useUpdateResident(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateResidentPayload) => residentsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
      toast.success('Resident updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

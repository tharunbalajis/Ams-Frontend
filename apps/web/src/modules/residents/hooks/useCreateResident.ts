import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { residentKeys } from '@/lib';
import { residentsApi } from '../api/residents.api';
import { RESIDENT_ROUTES } from '../constants/resident.constants';
import { toast } from '@/utils/toast';
import type { CreateResidentPayload } from '../types/resident.types';

export function useCreateResident() {
  const navigate    = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateResidentPayload) => residentsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
      toast.success('Resident created successfully.');
      void navigate(RESIDENT_ROUTES.LIST);
    },
    onError: (error) => { toast.apiError(error); },
  });
}

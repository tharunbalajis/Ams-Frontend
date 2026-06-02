import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { residentKeys } from '@/lib';
import { residentsApi } from '../api/residents.api';
import { RESIDENT_ROUTES } from '../constants/resident.constants';
import type { CreateResidentPayload } from '../types/resident.types';

export function useCreateResident() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: CreateResidentPayload) => residentsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
      void navigate(RESIDENT_ROUTES.LIST);
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

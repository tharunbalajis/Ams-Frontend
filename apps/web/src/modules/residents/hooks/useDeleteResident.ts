import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { residentKeys } from '@/lib';
import { residentsApi } from '../api/residents.api';
import { RESIDENT_ROUTES } from '../constants/resident.constants';

export function useDeleteResident() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => residentsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: residentKeys.all });
      void navigate(RESIDENT_ROUTES.LIST);
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

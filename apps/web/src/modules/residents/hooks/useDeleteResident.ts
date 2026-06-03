import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { residentKeys } from '@/lib';
=======
import { queryClient } from '@/lib/queryClient';
import { residentKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { residentsApi } from '../api/residents.api';
import { RESIDENT_ROUTES } from '../constants/resident.constants';
import { toast } from '@/utils/toast';

export function useDeleteResident() {
  const navigate    = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => residentsApi.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: residentKeys.all });
      toast.success('Resident removed.');
      void navigate(RESIDENT_ROUTES.LIST);
    },
    onError: (error) => { toast.apiError(error); },
  });
}

<<<<<<< HEAD
export { useCreateComplaint } from './useComplaint';
=======
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { complaintKeys } from '@/lib/index';
import { complaintsApi } from '../api/complaints.api';
import { COMPLAINT_ROUTES } from '../constants/complaint.constants';
import type { CreateComplaintPayload } from '../types/complaint.types';

export function useCreateComplaint() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: CreateComplaintPayload) => complaintsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
      void navigate(COMPLAINT_ROUTES.LIST);
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}
>>>>>>> d852c2e (final)

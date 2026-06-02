import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { complaintKeys } from '@/lib';
import { complaintsApi } from '../api/complaints.api';
import type { UpdateComplaintPayload } from '../types/complaint.types';

export function useUpdateComplaint(id: string) {
  return useMutation({
    mutationFn: (payload: UpdateComplaintPayload) => complaintsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
    },
    onError: (_error) => {
      // Implement: toast.error(...)
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { assignmentsApi } from '../api/assignments.api';
import { toast } from '@/utils/toast';
import type { CreateAssignmentPayload } from '../types/assignment.types';

export function useComplaintAssignments(complaintId: string) {
  return useQuery({
    queryKey:  complaintKeys.assignments.detail(complaintId),
    queryFn:   () => assignmentsApi.getByComplaint(complaintId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!complaintId,
  });
}

export function useAssignComplaint(complaintId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAssignmentPayload) => assignmentsApi.create(complaintId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: complaintKeys.assignments.detail(complaintId) });
      void queryClient.invalidateQueries({ queryKey: complaintKeys.detail(complaintId) });
      toast.success('Complaint assigned.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

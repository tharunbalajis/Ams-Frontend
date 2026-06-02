import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { assignmentsApi } from '../api/assignments.api';

export function useComplaintAssignments(complaintId: string) {
  return useQuery({
    queryKey:  ['complaints', complaintId, 'assignments'],
    queryFn:   () => assignmentsApi.getByComplaint(complaintId),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!complaintId,
  });
}

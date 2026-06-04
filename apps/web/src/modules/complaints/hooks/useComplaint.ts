import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { complaintKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { complaintsApi } from '../api/complaints.api';
import { toast } from '@/utils/toast';
import { COMPLAINT_ROUTES } from '../constants/complaint.constants';
import type {
  CreateComplaintPayload,
  UpdateComplaintPayload,
  ComplaintStatus,
} from '../types/complaint.types';

export function useComplaint(id: string) {
  return useQuery({
    queryKey:  complaintKeys.detail(id),
    queryFn:   () => complaintsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateComplaint() {
  const navigate    = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateComplaintPayload) => complaintsApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
      toast.success('Complaint raised.');
      void navigate(COMPLAINT_ROUTES.LIST);
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateComplaint(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateComplaintPayload) => complaintsApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
      toast.success('Complaint updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateComplaintStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ status, notes }: { status: ComplaintStatus; notes?: string }) =>
      complaintsApi.updateStatus(id, status, notes),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
      toast.success('Complaint status updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useCategories() {
  return useQuery({
    queryKey:  complaintKeys.categories.lists(),
    queryFn:   () => complaintsApi.getCategories(),
    staleTime: STALE_TIME.LONG,
  });
}

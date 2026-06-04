import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { meetingKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { meetingsApi } from '@/api/meetings.api';
import { toast } from '@/utils/toast';
import type { MeetingFilters, CreateMeetingDto, UpdateMeetingDto } from '@/api/meetings.api';

export function useMeetings(params?: MeetingFilters) {
  return useQuery({
    queryKey:  meetingKeys.list(params),
    queryFn:   () => meetingsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useMeeting(id: string) {
  return useQuery({
    queryKey:  meetingKeys.detail(id),
    queryFn:   () => meetingsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateMeeting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeetingDto) => meetingsApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: meetingKeys.lists() });
      toast.success('Meeting scheduled.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateMeeting(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMeetingDto) => meetingsApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: meetingKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: meetingKeys.lists() });
      toast.success('Meeting updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteMeeting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => meetingsApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: meetingKeys.lists() });
      toast.success('Meeting deleted.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

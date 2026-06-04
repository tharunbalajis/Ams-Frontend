import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noticeKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { noticesApi } from '@/api/notices.api';
import { toast } from '@/utils/toast';
import type { NoticeFilters, CreateNoticeDto, UpdateNoticeDto } from '@/api/notices.api';

export function useNotices(params?: NoticeFilters) {
  return useQuery({
    queryKey:  noticeKeys.list(params),
    queryFn:   () => noticesApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useNotice(id: string) {
  return useQuery({
    queryKey:  noticeKeys.detail(id),
    queryFn:   () => noticesApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateNoticeDto) => noticesApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: noticeKeys.lists() });
      toast.success('Notice published.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateNotice(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateNoticeDto) => noticesApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: noticeKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: noticeKeys.lists() });
      toast.success('Notice updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => noticesApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: noticeKeys.lists() });
      toast.success('Notice deleted.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

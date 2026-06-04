import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { staffApi } from '@/api/staff.api';
import { toast } from '@/utils/toast';
import type { StaffFilters, CreateStaffDto, UpdateStaffDto } from '@/api/staff.api';

export function useStaffList(params?: StaffFilters) {
  return useQuery({
    queryKey:  staffKeys.list(params),
    queryFn:   () => staffApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useStaffMember(id: string) {
  return useQuery({
    queryKey:  staffKeys.detail(id),
    queryFn:   () => staffApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStaffDto) => staffApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success('Staff member added.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateStaff(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStaffDto) => staffApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: staffKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success('Staff member updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success('Staff member removed.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

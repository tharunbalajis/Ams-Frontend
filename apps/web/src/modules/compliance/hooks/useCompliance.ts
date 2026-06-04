import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { complianceKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { complianceApi } from '@/api/compliance.api';
import { toast } from '@/utils/toast';
import type { ComplianceFilters, CreateComplianceDto, UpdateComplianceDto } from '@/api/compliance.api';

export function useComplianceList(params?: ComplianceFilters) {
  return useQuery({
    queryKey:  complianceKeys.list(params),
    queryFn:   () => complianceApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useComplianceRecord(id: string) {
  return useQuery({
    queryKey:  complianceKeys.detail(id),
    queryFn:   () => complianceApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateCompliance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateComplianceDto) => complianceApi.create(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: complianceKeys.lists() });
      toast.success('Compliance record created.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useUpdateCompliance(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateComplianceDto) => complianceApi.update(id, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: complianceKeys.detail(id) });
      void qc.invalidateQueries({ queryKey: complianceKeys.lists() });
      toast.success('Compliance record updated.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

export function useDeleteCompliance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => complianceApi.remove(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: complianceKeys.lists() });
      toast.success('Compliance record deleted.');
    },
    onError: (err) => { toast.apiError(err); },
  });
}

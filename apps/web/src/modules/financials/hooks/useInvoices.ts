<<<<<<< HEAD
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
=======
import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { STALE_TIME } from '@/constants/query.constants';
import { invoicesApi } from '../api/invoices.api';
import { toast } from '@/utils/toast';
import type { InvoiceFiltersParams, CreateInvoicePayload, UpdateInvoicePayload } from '../types/invoice.types';

export function useInvoices(params?: InvoiceFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.invoices.list(params),
    queryFn:   () => invoicesApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey:  financialKeys.invoices.detail(id),
    queryFn:   () => invoicesApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useInvoicePayments(id: string) {
  return useQuery({
    queryKey:  financialKeys.invoices.payments(id),
    queryFn:   () => invoicesApi.getPayments(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInvoicePayload) => invoicesApi.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.all() });
      toast.success('Invoice created.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useUpdateInvoice(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateInvoicePayload) => invoicesApi.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.detail(id) });
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.all() });
      toast.success('Invoice updated.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

export function useCancelInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoicesApi.cancel(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.detail(id) });
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.all() });
      toast.success('Invoice cancelled.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

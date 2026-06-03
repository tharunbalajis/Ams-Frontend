<<<<<<< HEAD
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
=======
import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib/index';
>>>>>>> d852c2e (final)
import { STALE_TIME } from '@/constants/query.constants';
import { paymentsApi } from '../api/payments.api';
import { toast } from '@/utils/toast';
import type { PaymentFiltersParams, CreatePaymentPayload } from '../types/payment.types';

export function usePayments(params?: PaymentFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.payments.list(params),
    queryFn:   () => paymentsApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

export function usePayment(id: string) {
  return useQuery({
    queryKey:  financialKeys.payments.detail(id),
    queryFn:   () => paymentsApi.getById(id),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

export function useRecordPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) => paymentsApi.create(payload),
    onSuccess: (data) => {
      const invoiceId = data.data?.invoiceId;
      void queryClient.invalidateQueries({ queryKey: financialKeys.payments.all() });
      if (invoiceId) {
        void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.detail(invoiceId) });
        void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.payments(invoiceId) });
      }
      void queryClient.invalidateQueries({ queryKey: financialKeys.invoices.all() });
      toast.success('Payment recorded.');
    },
    onError: (error) => { toast.apiError(error); },
  });
}

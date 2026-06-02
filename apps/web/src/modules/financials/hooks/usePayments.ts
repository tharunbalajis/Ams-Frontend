import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { paymentsApi } from '../api/payments.api';
import type { PaymentFiltersParams } from '../types/payment.types';

export function usePayments(params?: PaymentFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.payments.list(params),
    queryFn:   () => paymentsApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

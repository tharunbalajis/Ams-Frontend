import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { invoicesApi } from '../api/invoices.api';
import type { InvoiceFiltersParams } from '../types/invoice.types';

export function useInvoices(params?: InvoiceFiltersParams) {
  return useQuery({
    queryKey:  financialKeys.invoices.list(params),
    queryFn:   () => invoicesApi.getAll(params).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
  });
}

import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { invoicesApi } from '../api/invoices.api';

export function useInvoice(id: string) {
  return useQuery({
    queryKey:  financialKeys.invoices.detail(id),
    queryFn:   () => invoicesApi.getById(id).then((r) => r.data),
    staleTime: STALE_TIME.DEFAULT,
    enabled:   !!id,
  });
}

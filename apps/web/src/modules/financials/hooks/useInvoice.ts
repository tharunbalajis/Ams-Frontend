<<<<<<< HEAD
export { useInvoice } from './useInvoices';
=======
import { useQuery } from '@tanstack/react-query';
import { financialKeys } from '@/lib/index';
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
>>>>>>> d852c2e (final)

import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/query.constants';
import { maintenanceApi } from '../api/maintenance.api';

export function useMaintenanceCharges(params?: { period?: string; page?: number; pageSize?: number }) {
  return useQuery({
    queryKey:  ['financials', 'maintenance', params],
    queryFn:   () => maintenanceApi.getAll(params),
    staleTime: STALE_TIME.DEFAULT,
  });
}

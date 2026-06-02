import { useMutation } from '@tanstack/react-query';
import { reportsApi, type ReportParams } from '../api/reports.api';

export function useFinancialReports() {
  return useMutation({
    mutationFn: (params: ReportParams) => reportsApi.generate(params),
  });
}

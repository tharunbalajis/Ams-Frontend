import { z } from 'zod';

const periodEnum = z.enum(['today', 'week', 'month', 'quarter', 'year']);

export const dashboardFilterSchema = z.object({
  period:   periodEnum.default('month'),
  dateFrom: z.string().optional(),
  dateTo:   z.string().optional(),
});

export type DashboardFilterValues = z.infer<typeof dashboardFilterSchema>;

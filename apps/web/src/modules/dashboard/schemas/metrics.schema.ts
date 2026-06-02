import { z } from 'zod';

export const metricsRequestSchema = z.object({
  period:  z.enum(['today', 'week', 'month', 'quarter', 'year']).optional(),
  modules: z.array(z.string()).optional(),
});

export type MetricsRequestValues = z.infer<typeof metricsRequestSchema>;

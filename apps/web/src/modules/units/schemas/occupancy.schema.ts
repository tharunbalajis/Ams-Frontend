import { z } from 'zod';

export const occupancySchema = z.object({
  status:    z.string().min(1),
  startDate: z.string().min(1),
  notes:     z.string().optional(),
});

export type OccupancyFormValues = z.infer<typeof occupancySchema>;

import { z } from 'zod';

export const occupancySchema = z.object({
  status:    z.enum(['occupied', 'vacant', 'reserved', 'under_maintenance']),
  startDate: z.string().min(1),
  endDate:   z.string().optional(),
  notes:     z.string().optional(),
});

export type OccupancyFormValues = z.infer<typeof occupancySchema>;

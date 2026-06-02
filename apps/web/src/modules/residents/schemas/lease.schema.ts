import { z } from 'zod';

export const leaseSchema = z.object({
  startDate:     z.string(),
  endDate:       z.string(),
  monthlyRent:   z.number(),
  depositAmount: z.number(),
});

export type LeaseFormValues = z.infer<typeof leaseSchema>;

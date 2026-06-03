import { z } from 'zod';

export const leaseSchema = z.object({
  startDate:     z.string().min(1),
  endDate:       z.string().min(1),
  monthlyRent:   z.number().positive(),
  depositAmount: z.number().min(0),
});

export type LeaseFormValues = z.infer<typeof leaseSchema>;

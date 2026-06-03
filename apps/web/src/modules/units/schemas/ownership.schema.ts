import { z } from 'zod';

export const ownershipSchema = z.object({
  ownershipType: z.enum(['OWNED', 'RENTED', 'LEASED']),
  ownerId:       z.string().min(1),
  tenantId:      z.string().optional(),
  startDate:     z.string().min(1),
  endDate:       z.string().optional(),
});

export type OwnershipFormValues = z.infer<typeof ownershipSchema>;

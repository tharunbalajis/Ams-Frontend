import { z } from 'zod';

export const createVisitorSchema = z.object({
  visitor_name:   z.string().min(1, 'Visitor name is required'),
  visitor_mobile: z.string().optional(),
  visitor_type:   z.enum(['GUEST', 'DELIVERY', 'DOMESTIC_HELP', 'SERVICE', 'CONTRACTOR', 'BROKER', 'UNKNOWN']),
  purpose:        z.string().optional(),
  unit_id:        z.string().optional(),
  resident_id:    z.string().optional(),
});

export type CreateVisitorFormValues = z.infer<typeof createVisitorSchema>;

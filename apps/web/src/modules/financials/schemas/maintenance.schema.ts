import { z } from 'zod';

export const createMaintenanceHeadSchema = z.object({
  name:             z.string().min(1),
  code:             z.string().min(1),
  headType:         z.enum(['MAINTENANCE', 'UTILITIES', 'SECURITY', 'HOUSEKEEPING', 'ADMIN', 'OTHER']),
  frequency:        z.enum(['MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY', 'ONE_TIME']),
  calculationBasis: z.enum(['PER_UNIT', 'PER_SQ_FT', 'FIXED', 'PERCENTAGE']),
  defaultAmount:    z.number().positive(),
  description:      z.string().optional(),
});

export const generateInvoicesSchema = z.object({
  headId:  z.string().min(1),
  period:  z.string().min(1),
  dueDate: z.string().min(1),
});

export type CreateMaintenanceHeadFormValues = z.infer<typeof createMaintenanceHeadSchema>;
export type GenerateInvoicesFormValues      = z.infer<typeof generateInvoicesSchema>;

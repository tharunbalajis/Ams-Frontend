import { z } from 'zod';

export const generateMaintenanceSchema = z.object({
  period:     z.string().min(1),
  dueDate:    z.string().min(1),
  chargeType: z.enum(['monthly', 'special_assessment', 'late_fee', 'penalty']),
  amount:     z.number().positive().optional(),
});

export type GenerateMaintenanceFormValues = z.infer<typeof generateMaintenanceSchema>;

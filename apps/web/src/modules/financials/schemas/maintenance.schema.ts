import { z } from 'zod';

export const createMaintenanceHeadSchema = z.object({
  head_name:         z.string().min(1, 'Head name is required'),
  head_type:         z.enum(['MAINTENANCE', 'UTILITY', 'FUND', 'OTHER']),
  calculation_basis: z.enum(['FLAT', 'PER_SQFT', 'CUSTOM']),
  amount:            z.number().positive('Amount must be positive'),
  frequency:         z.enum(['MONTHLY', 'QUARTERLY', 'ANNUAL', 'ONE_TIME']),
  gst_applicable:    z.boolean().optional(),
  gst_rate:          z.number().min(0).optional(),
});

export type CreateMaintenanceHeadFormValues = z.infer<typeof createMaintenanceHeadSchema>;

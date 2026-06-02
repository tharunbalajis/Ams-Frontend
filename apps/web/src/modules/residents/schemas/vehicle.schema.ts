import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleNumber: z.string(),
  type:          z.enum(['car', 'motorcycle', 'truck', 'van', 'other']),
  brand:         z.string(),
  model:         z.string(),
  color:         z.string().optional(),
  parkingSlot:   z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

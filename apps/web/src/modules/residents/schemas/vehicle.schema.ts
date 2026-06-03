import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleNumber: z.string().min(1),
  type:          z.enum(['CAR', 'MOTORCYCLE', 'SCOOTER', 'TRUCK', 'VAN', 'BICYCLE', 'OTHER']),
  brand:         z.string().min(1),
  model:         z.string().min(1),
  color:         z.string().optional(),
  parkingSlot:   z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

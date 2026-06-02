import { z } from 'zod';

export const floorSchema = z.object({
  blockId:     z.string().min(1),
  floorNumber: z.number().int().min(0),
  label:       z.string().min(1),
});

export type FloorFormValues = z.infer<typeof floorSchema>;

import { z } from 'zod';

export const createComplaintSchema = z.object({
  title:       z.string().min(5),
  categoryId:  z.string().min(1),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  description: z.string().min(10),
  residentId:  z.string().min(1),
});

export const updateComplaintSchema = createComplaintSchema.partial().extend({
  status: z.enum(['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED']).optional(),
});

export type CreateComplaintFormValues = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintFormValues = z.infer<typeof updateComplaintSchema>;

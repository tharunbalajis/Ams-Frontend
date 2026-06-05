import { z } from 'zod';

export const createComplaintSchema = z.object({
  title:       z.string().min(5, 'Title must be at least 5 characters'),
  cat_id:      z.string().min(1, 'Category is required'),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  unit_id:     z.string().min(1, 'Unit ID is required'),
});

export const updateComplaintSchema = createComplaintSchema.partial().extend({
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
});

export type CreateComplaintFormValues = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintFormValues = z.infer<typeof updateComplaintSchema>;

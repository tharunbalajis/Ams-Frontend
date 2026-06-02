import { z } from 'zod';

export const createExpenseSchema = z.object({
  category:    z.enum(['maintenance', 'utilities', 'security', 'housekeeping', 'repairs', 'admin', 'landscaping', 'amenities', 'insurance', 'other']),
  vendor:      z.string().min(1),
  expenseDate: z.string().min(1),
  amount:      z.number().positive(),
  description: z.string().min(5),
  receiptUrl:  z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseFormValues = z.infer<typeof updateExpenseSchema>;

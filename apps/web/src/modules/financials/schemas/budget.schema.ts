import { z } from 'zod';

const budgetLineItemSchema = z.object({
  category: z.enum(['maintenance', 'utilities', 'security', 'housekeeping', 'repairs', 'admin', 'landscaping', 'amenities', 'insurance', 'other']),
  budgeted: z.number().positive(),
});

export const createBudgetSchema = z.object({
  period:      z.string().min(1),
  fiscalYear:  z.string().min(4),
  totalBudget: z.number().positive(),
  lineItems:   z.array(budgetLineItemSchema).min(1),
});

export type CreateBudgetFormValues = z.infer<typeof createBudgetSchema>;

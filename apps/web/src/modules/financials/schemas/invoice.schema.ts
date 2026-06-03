import { z } from 'zod';

const lineItemSchema = z.object({
  description: z.string().min(1),
  amount:      z.number().positive(),
  taxRate:     z.number().min(0).max(100).default(0),
});

export const createInvoiceSchema = z.object({
  type:        z.enum(['MAINTENANCE', 'SPECIAL_ASSESSMENT', 'PENALTY', 'LATE_FEE', 'MISCELLANEOUS']),
  residentId:  z.string().min(1),
  invoiceDate: z.string().min(1),
  dueDate:     z.string().min(1),
  lineItems:   z.array(lineItemSchema).min(1),
  remarks:     z.string().optional(),
});

export const updateInvoiceSchema = z.object({
  dueDate: z.string().min(1).optional(),
  remarks: z.string().optional(),
});

export type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceFormValues = z.infer<typeof updateInvoiceSchema>;

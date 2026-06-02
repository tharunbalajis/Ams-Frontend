import { z } from 'zod';

export const createPaymentSchema = z.object({
  invoiceId:      z.string().min(1),
  paymentDate:    z.string().min(1),
  method:         z.enum(['cash', 'upi', 'bank_transfer', 'cheque', 'card', 'online_gateway']),
  amount:         z.number().positive(),
  transactionRef: z.string().optional(),
  remarks:        z.string().optional(),
});

export type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>;

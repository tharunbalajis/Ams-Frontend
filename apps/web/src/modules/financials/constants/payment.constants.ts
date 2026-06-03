import type { PaymentMethod, PaymentStatus } from '../types/payment.types';

export const PAYMENT_METHOD_OPTIONS: { label: string; value: PaymentMethod }[] = [
  { label: 'Cash',           value: 'CASH' },
  { label: 'UPI',            value: 'UPI' },
  { label: 'Bank Transfer',  value: 'BANK_TRANSFER' },
  { label: 'Cheque',         value: 'CHEQUE' },
  { label: 'Card',           value: 'CARD' },
  { label: 'Online Gateway', value: 'ONLINE_GATEWAY' },
];

export const PAYMENT_STATUS_OPTIONS: { label: string; value: PaymentStatus }[] = [
  { label: 'Pending',   value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed',    value: 'FAILED' },
  { label: 'Refunded',  value: 'REFUNDED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export const PAYMENT_STATUS_COLOR: Record<PaymentStatus, string> = {
  PENDING:   'warning',
  COMPLETED: 'success',
  FAILED:    'destructive',
  REFUNDED:  'secondary',
  CANCELLED: 'outline',
};

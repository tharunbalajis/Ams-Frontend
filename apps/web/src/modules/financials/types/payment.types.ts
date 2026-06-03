import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type PaymentMethod =
  | 'CASH'
  | 'UPI'
  | 'BANK_TRANSFER'
  | 'CHEQUE'
  | 'CARD'
  | 'ONLINE_GATEWAY';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface Payment {
  id:             ID;
  paymentNumber:  string;
  invoiceId:      ID;
  invoiceNumber:  string;
  residentId:     ID;
  residentName:   string;
  unitNumber:     string;
  paymentDate:    string;
  method:         PaymentMethod;
  transactionRef: Nullable<string>;
  amount:         number;
  status:         PaymentStatus;
  remarks:        Nullable<string>;
  processedBy:    string;
  createdAt:      Timestamp;
  updatedAt:      Timestamp;
}

export type PaymentListItem = Pick<
  Payment,
  | 'id'
  | 'paymentNumber'
  | 'invoiceNumber'
  | 'residentName'
  | 'unitNumber'
  | 'paymentDate'
  | 'method'
  | 'amount'
  | 'status'
  | 'transactionRef'
>;

export interface CreatePaymentPayload {
  invoiceId:       ID;
  paymentDate:     string;
  method:          PaymentMethod;
  amount:          number;
  transactionRef?: string;
  remarks?:        string;
}

export interface PaymentFiltersParams {
  search?:   string;
  method?:   PaymentMethod;
  status?:   PaymentStatus;
  dateFrom?: string;
  dateTo?:   string;
  page?:     number;
  limit?:    number;
}

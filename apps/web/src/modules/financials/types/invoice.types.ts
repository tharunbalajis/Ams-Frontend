import type { ID, Nullable, Timestamp } from '@/types/common.types';

export type InvoiceStatus =
  | 'draft'
  | 'pending'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled';

export type InvoiceType = 'maintenance' | 'special_assessment' | 'penalty' | 'late_fee' | 'miscellaneous';

export interface InvoiceLineItem {
  id:          ID;
  description: string;
  amount:      number;
  taxRate:     number;
  taxAmount:   number;
  total:       number;
}

export interface Invoice {
  id:             ID;
  invoiceNumber:  string;
  type:           InvoiceType;
  status:         InvoiceStatus;
  residentId:     ID;
  residentName:   string;
  unitNumber:     string;
  invoiceDate:    string;
  dueDate:        string;
  subtotal:       number;
  taxAmount:      number;
  totalAmount:    number;
  paidAmount:     number;
  balanceDue:     number;
  lineItems:      InvoiceLineItem[];
  remarks:        Nullable<string>;
  generatedBy:    string;
  createdAt:      Timestamp;
  updatedAt:      Timestamp;
}

export type InvoiceListItem = Pick<
  Invoice,
  | 'id'
  | 'invoiceNumber'
  | 'type'
  | 'status'
  | 'residentName'
  | 'unitNumber'
  | 'invoiceDate'
  | 'dueDate'
  | 'totalAmount'
  | 'paidAmount'
  | 'balanceDue'
>;

export interface CreateInvoicePayload {
  type:        InvoiceType;
  residentId:  ID;
  invoiceDate: string;
  dueDate:     string;
  lineItems:   Omit<InvoiceLineItem, 'id'>[];
  remarks?:    string;
}

export type UpdateInvoicePayload = Partial<CreateInvoicePayload & { status: InvoiceStatus }>;

export interface InvoiceFiltersParams {
  search?:     string;
  type?:       InvoiceType;
  status?:     InvoiceStatus;
  residentId?: ID;
  dateFrom?:   string;
  dateTo?:     string;
  page?:       number;
  pageSize?:   number;
  sortBy?:     string;
  sortDir?:    'asc' | 'desc';
}

export type InvoiceStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface InvoiceLineItem {
  maintenance_head_id: string;
  description:         string;
  quantity:            number;
  rate:                number;
  gst_rate:            number;
}

export interface Invoice {
  id:             string;
  society_id:     number;
  unit_id:        number;
  resident_id:    string;
  invoice_number: string;
  billing_period: string;   // format: "JUN-2026"
  invoice_date:   string;
  due_date:       string;
  subtotal:       number;
  gst_amount:     number;
  penalty_amount: number;
  total_amount:   number;
  paid_amount:    number;
  status:         InvoiceStatus;
  is_active:      boolean;
  created_at:     string;
}

export type InvoiceListItem = Invoice;

export interface CreateInvoicePayload {
  unit_id:        number;
  resident_id:    string;
  billing_period: string;    // "JUN-2026" — required
  invoice_date:   string;
  due_date:       string;
  line_items:     InvoiceLineItem[];  // required
}

export type UpdateInvoicePayload = Partial<Pick<CreateInvoicePayload, 'due_date'>>;

export interface InvoiceFiltersParams {
  society_id?: number;
  unit_id?:    number;
  status?:     InvoiceStatus;
  search?:     string;
  page?:       number;
  limit?:      number;
}

export interface InvoicePaymentRecord {
  id:              string;
  invoice_id:      string;
  amount:          number;
  payment_mode:    string;
  idempotency_key: string;
  created_at:      string;
}

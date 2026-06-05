import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { FINANCIAL_ROUTES } from '../../constants/invoice.constants';
import type { InvoiceListItem, InvoiceStatus } from '../../types/invoice.types';
import type { PaginationState } from '@ams/ui';

const STATUS_VARIANT: Record<InvoiceStatus, string> = {
  PENDING:   'warning',
  PAID:      'success',
  OVERDUE:   'destructive',
  CANCELLED: 'secondary',
};

export interface InvoiceTableProps {
  data:             InvoiceListItem[];
  loading?:         boolean;
  pagination:       PaginationState;
  onPageChange:     (page: number) => void;
  onRecordPayment?: (id: string) => void;
}

export function InvoiceTable({ data, loading, pagination, onPageChange, onRecordPayment }: InvoiceTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<InvoiceListItem>[] = [
    {
      accessorKey: 'invoice_number',
      header:      'Invoice #',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', row.original.id))}
        >
          {row.original.invoice_number}
        </button>
      ),
    },
    {
      accessorKey: 'billing_period',
      header:      'Period',
    },
    {
      accessorKey: 'unit_id',
      header:      'Unit',
      cell:        ({ getValue }) => `Unit ${getValue() as number}`,
    },
    {
      accessorKey: 'invoice_date',
      header:      'Invoice Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'due_date',
      header:      'Due Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'total_amount',
      header:      'Total',
      cell:        ({ getValue }) => `₹${(getValue() as number).toLocaleString('en-IN')}`,
    },
    {
      accessorKey: 'paid_amount',
      header:      'Paid',
      cell:        ({ getValue }) => {
        const v = getValue() as number;
        return <span className={v > 0 ? 'text-green-600 font-medium' : 'text-muted-foreground'}>₹{v.toLocaleString('en-IN')}</span>;
      },
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as InvoiceStatus;
        const variant = (STATUS_VARIANT[s] ?? 'secondary') as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
        return <Badge variant={variant}>{s}</Badge>;
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', row.original.id))}
          >
            View
          </Button>
          {onRecordPayment && row.original.status !== 'PAID' && row.original.status !== 'CANCELLED' && (
            <Button variant="ghost" size="sm" onClick={() => onRecordPayment(row.original.id)}>
              Pay
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <ServerTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyState={<p className="text-muted-foreground">No invoices found.</p>}
    />
  );
}

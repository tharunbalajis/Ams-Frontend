import type { ColumnDef } from '@tanstack/react-table';
import { Badge, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { PAYMENT_STATUS_COLOR } from '../../constants/payment.constants';
import type { PaymentListItem, PaymentStatus } from '../../types/payment.types';
import type { PaginationState } from '@ams/ui';

export interface PaymentTableProps {
  data:         PaymentListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function PaymentTable({ data, loading, pagination, onPageChange }: PaymentTableProps) {
  const columns: ColumnDef<PaymentListItem>[] = [
    { accessorKey: 'paymentNumber', header: 'Payment #' },
    { accessorKey: 'invoiceNumber', header: 'Invoice #' },
    {
      accessorKey: 'residentName',
      header:      'Resident',
      cell:        ({ row }) => (
        <div>
          <p className="font-medium">{row.original.residentName}</p>
          <p className="text-xs text-muted-foreground">Unit {row.original.unitNumber}</p>
        </div>
      ),
    },
    {
      accessorKey: 'paymentDate',
      header:      'Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'method',
      header:      'Method',
      cell:        ({ getValue }) => <span className="capitalize">{(getValue() as string).replace('_', ' ')}</span>,
    },
    {
      accessorKey: 'amount',
      header:      'Amount',
      cell:        ({ getValue }) => <span className="font-semibold">₹{(getValue() as number).toLocaleString()}</span>,
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as PaymentStatus;
        const v = PAYMENT_STATUS_COLOR[s] as 'success' | 'destructive' | 'warning' | 'secondary' | 'outline';
        return <Badge variant={v}>{s}</Badge>;
      },
    },
    {
      accessorKey: 'transactionRef',
      header:      'Reference',
      cell:        ({ getValue }) => (getValue() as string | null) ?? '—',
    },
  ];

  return (
    <ServerTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyState={<p className="text-muted-foreground">No payments found.</p>}
    />
  );
}

import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { INVOICE_STATUS_COLOR, FINANCIAL_ROUTES } from '../../constants/invoice.constants';
import type { InvoiceListItem, InvoiceStatus } from '../../types/invoice.types';
import type { PaginationState } from '@ams/ui';

export interface InvoiceTableProps {
  data:         InvoiceListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onRecordPayment?: (id: string) => void;
}

export function InvoiceTable({ data, loading, pagination, onPageChange, onRecordPayment }: InvoiceTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<InvoiceListItem>[] = [
    {
      accessorKey: 'invoiceNumber',
      header:      'Invoice #',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', row.original.id))}
        >
          {row.original.invoiceNumber}
        </button>
      ),
    },
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
      accessorKey: 'type',
      header:      'Type',
      cell:        ({ getValue }) => <span className="capitalize">{(getValue() as string).replace('_', ' ')}</span>,
    },
    {
      accessorKey: 'invoiceDate',
      header:      'Invoice Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'dueDate',
      header:      'Due Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'totalAmount',
      header:      'Total',
      cell:        ({ getValue }) => `₹${(getValue() as number).toLocaleString()}`,
    },
    {
      accessorKey: 'balanceDue',
      header:      'Balance',
      cell:        ({ getValue }) => {
        const v = getValue() as number;
        return <span className={v > 0 ? 'font-semibold text-destructive' : 'text-muted-foreground'}>₹{v.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as InvoiceStatus;
        const variant = INVOICE_STATUS_COLOR[s] as 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
        return <Badge variant={variant}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => void navigate(FINANCIAL_ROUTES.INVOICE_DETAIL.replace(':id', row.original.id))}>
            View
          </Button>
          {onRecordPayment && row.original.balanceDue > 0 && (
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

import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { ExpenseListItem, ExpenseStatus } from '../../types/expense.types';
import type { PaginationState } from '@ams/ui';

const STATUS_VARIANT: Record<ExpenseStatus, string> = {
  PENDING:  'warning',
  APPROVED: 'success',
  REJECTED: 'destructive',
};

export interface ExpenseTableProps {
  data:         ExpenseListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onApprove?:   (id: string) => void;
  onReject?:    (id: string) => void;
}

export function ExpenseTable({ data, loading, pagination, onPageChange, onApprove, onReject }: ExpenseTableProps) {
  const columns: ColumnDef<ExpenseListItem>[] = [
    {
      accessorKey: 'expense_date',
      header:      'Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'description',
      header:      'Description',
    },
    {
      accessorKey: 'category_id',
      header:      'Category',
      cell:        ({ getValue }) => (getValue() as string).slice(0, 8) + '…',
    },
    {
      accessorKey: 'amount',
      header:      'Amount',
      cell:        ({ getValue }) => (
        <span className="font-semibold">₹{(getValue() as number).toLocaleString('en-IN')}</span>
      ),
    },
    {
      accessorKey: 'gst_amount',
      header:      'GST',
      cell:        ({ getValue }) => `₹${(getValue() as number).toLocaleString('en-IN')}`,
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as ExpenseStatus;
        const v = (STATUS_VARIANT[s] ?? 'secondary') as 'success' | 'destructive' | 'warning' | 'secondary' | 'outline';
        return <Badge variant={v}>{s}</Badge>;
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => {
        if (row.original.status !== 'PENDING') return null;
        return (
          <div className="flex gap-1">
            {onApprove && (
              <Button variant="ghost" size="sm" onClick={() => onApprove(row.original.id)}>
                Approve
              </Button>
            )}
            {onReject && (
              <Button variant="ghost" size="sm" onClick={() => onReject(row.original.id)}>
                Reject
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <ServerTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyState={<p className="text-muted-foreground">No expenses found.</p>}
    />
  );
}

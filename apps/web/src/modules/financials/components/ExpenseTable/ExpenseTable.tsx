import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { EXPENSE_STATUS_COLOR } from '../../constants/expense.constants';
import type { ExpenseListItem, ExpenseStatus } from '../../types/expense.types';
import type { PaginationState } from '@ams/ui';

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
    { accessorKey: 'expenseNumber', header: 'Expense #' },
    { accessorKey: 'headName',      header: 'Head' },
    { accessorKey: 'vendor',        header: 'Vendor' },
    {
      accessorKey: 'expenseDate',
      header:      'Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
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
        const s = getValue() as ExpenseStatus;
        const v = EXPENSE_STATUS_COLOR[s] as 'success' | 'destructive' | 'warning' | 'secondary' | 'outline';
        return <Badge variant={v}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'approvedBy',
      header:      'Approved By',
      cell:        ({ getValue }) => (getValue() as string | null) ?? '—',
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => {
        if (row.original.status !== 'PENDING_APPROVAL') return null;
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

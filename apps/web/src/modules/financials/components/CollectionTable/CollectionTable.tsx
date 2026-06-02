import type { ColumnDef } from '@tanstack/react-table';
import { Badge, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { CollectionRecord } from '../../types/collection.types';
import type { PaginationState } from '@ams/ui';

export interface CollectionTableProps {
  data:         CollectionRecord[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function CollectionTable({ data, loading, pagination, onPageChange }: CollectionTableProps) {
  const columns: ColumnDef<CollectionRecord>[] = [
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
    { accessorKey: 'invoiceNumber', header: 'Invoice #' },
    {
      accessorKey: 'invoiceAmount',
      header:      'Billed',
      cell:        ({ getValue }) => `₹${(getValue() as number).toLocaleString()}`,
    },
    {
      accessorKey: 'collectedAmount',
      header:      'Collected',
      cell:        ({ getValue }) => <span className="text-green-600">₹{(getValue() as number).toLocaleString()}</span>,
    },
    {
      accessorKey: 'pendingAmount',
      header:      'Pending',
      cell:        ({ getValue }) => {
        const v = getValue() as number;
        return <span className={v > 0 ? 'font-semibold text-destructive' : 'text-muted-foreground'}>₹{v.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: 'collectionDate',
      header:      'Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'daysOverdue',
      header:      'Overdue',
      cell:        ({ getValue }) => {
        const d = getValue() as number;
        if (d <= 0) return <Badge variant="success">On Time</Badge>;
        return <Badge variant="destructive">{d}d overdue</Badge>;
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
      emptyState={<p className="text-muted-foreground">No collection records found.</p>}
    />
  );
}

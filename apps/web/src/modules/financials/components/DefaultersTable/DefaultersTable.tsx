import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, DataTable } from '@ams/ui';
import type { Defaulter } from '../../types/collection.types';

export interface DefaultersTableProps {
  data:          Defaulter[];
  loading?:      boolean;
  onSendNotice?: (residentId: string) => void;
}

const NOTICE_LABEL: Record<Defaulter['noticeStatus'], string> = {
  none:          'No Notice',
  first_notice:  '1st Notice',
  second_notice: '2nd Notice',
  legal:         'Legal',
};

const NOTICE_VARIANT: Record<Defaulter['noticeStatus'], string> = {
  none:          'outline',
  first_notice:  'warning',
  second_notice: 'destructive',
  legal:         'destructive',
};

export function DefaultersTable({ data, loading, onSendNotice }: DefaultersTableProps) {
  const columns: ColumnDef<Defaulter>[] = [
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
      accessorKey: 'outstandingAmount',
      header:      'Outstanding',
      cell:        ({ getValue }) => <span className="font-semibold text-destructive">₹{(getValue() as number).toLocaleString()}</span>,
    },
    {
      accessorKey: 'invoiceCount',
      header:      'Invoices',
    },
    {
      accessorKey: 'daysOverdue',
      header:      'Overdue',
      cell:        ({ getValue }) => <span className="font-semibold">{getValue() as number} days</span>,
    },
    {
      accessorKey: 'noticeStatus',
      header:      'Notice',
      cell:        ({ getValue }) => {
        const s = getValue() as Defaulter['noticeStatus'];
        return <Badge variant={NOTICE_VARIANT[s] as 'destructive' | 'warning' | 'outline'}>{NOTICE_LABEL[s]}</Badge>;
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        onSendNotice
          ? <Button variant="ghost" size="sm" onClick={() => onSendNotice(row.original.residentId)}>Send Notice</Button>
          : null
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyState={<p className="text-muted-foreground">No defaulters found.</p>}
    />
  );
}

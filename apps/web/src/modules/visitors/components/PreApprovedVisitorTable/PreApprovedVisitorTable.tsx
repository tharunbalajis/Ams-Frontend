import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, DataTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { PreApprovedVisitor } from '../../types/visitor.types';

export interface PreApprovedVisitorTableProps {
  data:      PreApprovedVisitor[];
  loading?:  boolean;
  onRevoke?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PreApprovedVisitorTable({ data, loading, onRevoke, onDelete }: PreApprovedVisitorTableProps) {
  const columns: ColumnDef<PreApprovedVisitor>[] = [
    {
      accessorKey: 'visitorName',
      header:      'Visitor',
      cell:        ({ row }) => (
        <div>
          <p className="font-medium">{row.original.visitorName}</p>
          <p className="text-xs text-muted-foreground">{row.original.visitorMobile}</p>
        </div>
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
      accessorKey: 'approvalDate',
      header:      'Approved On',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'validUntil',
      header:      'Valid Until',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as PreApprovedVisitor['status'];
        return (
          <Badge variant={s === 'active' ? 'success' : s === 'expired' ? 'secondary' : 'destructive'}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Badge>
        );
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          {row.original.status === 'active' && onRevoke && (
            <Button variant="ghost" size="sm" onClick={() => onRevoke(row.original.id)}>
              Revoke
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(row.original.id)}>
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyState={<p className="text-muted-foreground">No pre-approved visitors found.</p>}
    />
  );
}

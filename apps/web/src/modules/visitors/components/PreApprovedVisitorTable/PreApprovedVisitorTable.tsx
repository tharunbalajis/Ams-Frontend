import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, DataTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Invite } from '../../types/invite.types';

export interface PreApprovedVisitorTableProps {
  data:      Invite[];
  loading?:  boolean;
  onRevoke?: (id: string) => void;
}

export function PreApprovedVisitorTable({ data, loading, onRevoke }: PreApprovedVisitorTableProps) {
  const columns: ColumnDef<Invite>[] = [
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
      accessorKey: 'validFrom',
      header:      'Valid From',
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
        const s = getValue() as string;
        const variant =
          s === 'ACTIVE' ? 'success' :
          s === 'EXPIRED' ? 'secondary' :
          'destructive';
        return <Badge variant={variant}>{s}</Badge>;
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          {row.original.status === 'ACTIVE' && onRevoke && (
            <Button variant="ghost" size="sm" onClick={() => onRevoke(row.original.id)}>
              Revoke
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
      emptyState={<p className="text-muted-foreground">No invites found.</p>}
    />
  );
}

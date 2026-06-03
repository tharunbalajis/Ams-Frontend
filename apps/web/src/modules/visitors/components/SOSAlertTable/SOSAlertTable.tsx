import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, DataTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { SOS_STATUS_COLOR, SOS_TYPE_ICON } from '../../constants/sos.constants';
import type { SOSAlert } from '../../types/sos.types';

export interface SOSAlertTableProps {
  data:            SOSAlert[];
  loading?:        boolean;
  onView?:         (id: string) => void;
  onAcknowledge?:  (id: string) => void;
}

export function SOSAlertTable({ data, loading, onView, onAcknowledge }: SOSAlertTableProps) {
  const columns: ColumnDef<SOSAlert>[] = [
    {
      accessorKey: 'type',
      header:      'Type',
      cell:        ({ getValue }) => {
        const t = getValue() as SOSAlert['type'];
        return (
          <span className="flex items-center gap-1">
            <span>{SOS_TYPE_ICON[t]}</span>
            <span className="capitalize">{t.replace('_', ' ')}</span>
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as SOSAlert['status'];
        const v = SOS_STATUS_COLOR[s] as 'destructive' | 'warning' | 'success' | 'secondary';
        return <Badge variant={v}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'location',
      header:      'Location',
    },
    {
      accessorKey: 'raisedBy',
      header:      'Raised By',
    },
    {
      accessorKey: 'createdAt',
      header:      'Time',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          {onView && (
            <Button variant="ghost" size="sm" onClick={() => onView(row.original.id)}>View</Button>
          )}
          {onAcknowledge && row.original.status === 'ACTIVE' && (
            <Button variant="ghost" size="sm" onClick={() => onAcknowledge(row.original.id)}>Acknowledge</Button>
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
      emptyState={<p className="text-muted-foreground">No SOS alerts found.</p>}
    />
  );
}

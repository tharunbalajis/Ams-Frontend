import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable, StatusBadge } from '@ams/ui';
import type { Meeting } from '@/api/meetings.api';
import type { PaginationState } from '@ams/ui';

export interface MeetingTableProps {
  data:         Meeting[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (meeting: Meeting) => void;
  onDelete:     (id: string) => void;
}

export function MeetingTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: MeetingTableProps) {
  const columns: ColumnDef<Meeting>[] = [
    { accessorKey: 'title', header: 'Title' },
    {
      accessorKey: 'meeting_type',
      header:      'Type',
      cell:        ({ getValue }) => <Badge variant="outline">{getValue() as string}</Badge>,
    },
    {
      accessorKey: 'scheduled_at',
      header:      'Scheduled',
      cell:        ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>Edit</Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(row.original.id)}>Delete</Button>
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
      emptyState={<p className="text-muted-foreground">No meetings found.</p>}
    />
  );
}

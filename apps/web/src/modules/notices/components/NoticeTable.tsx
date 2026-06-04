import type { ColumnDef } from '@tanstack/react-table';
import { Badge, Button, ServerTable } from '@ams/ui';
import type { Notice } from '@/api/notices.api';
import type { PaginationState } from '@ams/ui';

const typeColor: Record<string, string> = {
  EMERGENCY:   'destructive',
  MAINTENANCE: 'warning',
  GENERAL:     'secondary',
};

export interface NoticeTableProps {
  data:         Notice[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onEdit:       (notice: Notice) => void;
  onDelete:     (id: string) => void;
}

export function NoticeTable({ data, loading, pagination, onPageChange, onEdit, onDelete }: NoticeTableProps) {
  const columns: ColumnDef<Notice>[] = [
    { accessorKey: 'title', header: 'Title' },
    {
      accessorKey: 'notice_type',
      header:      'Type',
      cell:        ({ getValue }) => {
        const t = getValue() as string;
        return <Badge variant={(typeColor[t] ?? 'secondary') as 'destructive' | 'warning' | 'secondary' | 'outline'}>{t}</Badge>;
      },
    },
    { accessorKey: 'description', header: 'Description', cell: ({ getValue }) => <span className="line-clamp-1">{getValue() as string}</span> },
    { accessorKey: 'created_at',  header: 'Posted',      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString() },
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
      emptyState={<p className="text-muted-foreground">No notices found.</p>}
    />
  );
}

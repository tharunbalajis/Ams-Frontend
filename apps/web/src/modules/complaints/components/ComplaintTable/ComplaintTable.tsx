import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { ComplaintStatusBadge } from '../ComplaintStatusBadge';
import type { ComplaintListItem } from '../../types/complaint.types';
import type { PaginationState } from '@ams/ui';
import { COMPLAINT_ROUTES } from '../../constants/complaint.constants';

export interface ComplaintTableProps {
  data:         ComplaintListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function ComplaintTable({ data, loading, pagination, onPageChange }: ComplaintTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<ComplaintListItem>[] = [
    {
      accessorKey: 'ticket_number',
      header:      'Ticket #',
      cell:        ({ row }) => (
        <button
          className="max-w-xs truncate text-left font-medium text-primary hover:underline"
          onClick={() => void navigate(COMPLAINT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.ticket_number ?? row.original.id.slice(0, 8)}
        </button>
      ),
    },
    {
      accessorKey: 'title',
      header:      'Title',
      cell:        ({ row }) => (
        <button
          className="max-w-xs truncate text-left font-medium text-primary hover:underline"
          onClick={() => void navigate(COMPLAINT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.title}
        </button>
      ),
    },
    {
      accessorKey: 'category_name',
      header:      'Category',
      cell:        ({ row }) =>
        <span>{row.original.category_name ?? row.original.cat_id.slice(0, 8)}</span>,
    },
    {
      accessorKey: 'priority',
      header:      'Priority',
      cell:        ({ getValue }) => (
        <ComplaintStatusBadge priority={getValue() as ComplaintListItem['priority']} />
      ),
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => (
        <ComplaintStatusBadge status={getValue() as ComplaintListItem['status']} />
      ),
    },
    {
      accessorKey: 'unit_id',
      header:      'Unit',
      cell:        ({ getValue }) => `Unit ${getValue() as number}`,
    },
    {
      accessorKey: 'assigned_to',
      header:      'Assigned To',
      cell:        ({ getValue }) => {
        const v = getValue() as string | undefined;
        return v ? v.slice(0, 8) + '…' : '—';
      },
    },
    {
      accessorKey: 'created_at',
      header:      'Date',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void navigate(COMPLAINT_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          View
        </Button>
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
      emptyState={<p className="text-muted-foreground">No complaints found.</p>}
    />
  );
}

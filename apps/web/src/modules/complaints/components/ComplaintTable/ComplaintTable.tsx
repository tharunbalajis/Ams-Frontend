import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { ComplaintStatusBadge } from '../ComplaintStatusBadge';
import { SLABadge }             from '../SLABadge';
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
      accessorKey: 'category',
      header:      'Category',
      cell:        ({ getValue }) => (
        <span className="capitalize">{(getValue() as string).replace('_', ' ')}</span>
      ),
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
      accessorKey: 'assignedTo',
      header:      'Assigned To',
      cell:        ({ getValue }) => (getValue() as string | null) ?? '—',
    },
    {
      accessorKey: 'slaBreached',
      header:      'SLA',
      cell:        ({ getValue }) => (
        (getValue() as boolean)
          ? <SLABadge status="breached" breached />
          : <SLABadge status="on_track" />
      ),
    },
    {
      accessorKey: 'complaintDate',
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

import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { VisitorStatusBadge } from '../VisitorStatusBadge';
import type { VisitorListItem } from '../../types/visitor.types';
import type { PaginationState } from '@ams/ui';
import { VISITOR_ROUTES } from '../../constants/visitor.constants';

export interface VisitorTableProps {
  data:         VisitorListItem[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
  onCheckIn?:   (id: string) => void;
  onCheckOut?:  (id: string) => void;
}

export function VisitorTable({ data, loading, pagination, onPageChange, onCheckIn, onCheckOut }: VisitorTableProps) {
  const navigate = useNavigate();

  const columns: ColumnDef<VisitorListItem>[] = [
    {
      accessorKey: 'name',
      header:      'Visitor Name',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(VISITOR_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.name}
        </button>
      ),
    },
    { accessorKey: 'mobile',        header: 'Mobile' },
    {
      accessorKey: 'type',
      header:      'Type',
      cell:        ({ getValue }) => (
        <span className="capitalize">{(getValue() as string).replace(/_/g, ' ')}</span>
      ),
    },
    { accessorKey: 'purposeOfVisit', header: 'Purpose' },
    {
      accessorKey: 'residentName',
      header:      'Resident',
      cell:        ({ row }) => (
        <div>
          <p className="font-medium">{row.original.residentName}</p>
          <p className="text-xs text-muted-foreground">{row.original.unitNumber}</p>
        </div>
      ),
    },
    {
      accessorKey: 'entryStatus',
      header:      'Entry',
      cell:        ({ getValue }) => (
        <VisitorStatusBadge entryStatus={getValue() as VisitorListItem['entryStatus']} />
      ),
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => (
        <VisitorStatusBadge visitorStatus={getValue() as VisitorListItem['status']} />
      ),
    },
    {
      accessorKey: 'expectedEntryTime',
      header:      'Expected',
      cell:        ({ getValue }) => formatDate(getValue() as string),
    },
    {
      accessorKey: 'isPreApproved',
      header:      'Pre-Approved',
      cell:        ({ getValue }) => (
        getValue() ? <Badge variant="success">Yes</Badge> : <Badge variant="outline">No</Badge>
      ),
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(VISITOR_ROUTES.DETAIL.replace(':id', row.original.id))}
          >
            View
          </Button>
          {row.original.entryStatus === 'EXPECTED' && onCheckIn && (
            <Button variant="ghost" size="sm" onClick={() => onCheckIn(row.original.id)}>
              Check In
            </Button>
          )}
          {row.original.entryStatus === 'CHECKED_IN' && onCheckOut && (
            <Button variant="ghost" size="sm" onClick={() => onCheckOut(row.original.id)}>
              Check Out
            </Button>
          )}
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
      emptyState={<p className="text-muted-foreground">No visitor logs found.</p>}
    />
  );
}

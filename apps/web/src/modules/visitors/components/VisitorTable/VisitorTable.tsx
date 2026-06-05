import type { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, ServerTable } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
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
      accessorKey: 'visitor_name',
      header:      'Visitor Name',
      cell:        ({ row }) => (
        <button
          className="font-medium text-primary hover:underline"
          onClick={() => void navigate(VISITOR_ROUTES.DETAIL.replace(':id', row.original.id))}
        >
          {row.original.visitor_name}
        </button>
      ),
    },
    {
      accessorKey: 'visitor_mobile',
      header:      'Mobile',
      cell:        ({ getValue }) => (getValue() as string | undefined) ?? '—',
    },
    {
      accessorKey: 'visitor_type',
      header:      'Type',
      cell:        ({ getValue }) => (
        <span className="capitalize">{(getValue() as string).replace(/_/g, ' ').toLowerCase()}</span>
      ),
    },
    {
      accessorKey: 'purpose',
      header:      'Purpose',
      cell:        ({ getValue }) => (getValue() as string | undefined) ?? '—',
    },
    {
      accessorKey: 'unit_id',
      header:      'Unit',
      cell:        ({ getValue }) => `Unit ${getValue() as number}`,
    },
    {
      accessorKey: 'check_in_at',
      header:      'Check In',
      cell:        ({ getValue }) => {
        const v = getValue() as string | undefined;
        return v ? formatDate(v) : <Badge variant="secondary">Not checked in</Badge>;
      },
    },
    {
      accessorKey: 'check_out_at',
      header:      'Check Out',
      cell:        ({ getValue }) => {
        const v = getValue() as string | undefined;
        return v ? formatDate(v) : '—';
      },
    },
    {
      id:     'actions',
      header: 'Actions',
      cell:   ({ row }) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate(VISITOR_ROUTES.DETAIL.replace(':id', row.original.id))}
          >
            View
          </Button>
          {!row.original.check_in_at && onCheckIn && (
            <Button variant="ghost" size="sm" onClick={() => onCheckIn(row.original.id)}>
              Check In
            </Button>
          )}
          {row.original.check_in_at && !row.original.check_out_at && onCheckOut && (
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

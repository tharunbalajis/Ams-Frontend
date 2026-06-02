import type { ColumnDef } from '@tanstack/react-table';
import { Badge, ServerTable } from '@ams/ui';
import { ATTENDANCE_STATUS_COLOR } from '../../constants/attendance.constants';
import type { AttendanceRecord } from '../../types/attendance.types';
import type { PaginationState } from '@ams/ui';

export interface AttendanceTableProps {
  data:         AttendanceRecord[];
  loading?:     boolean;
  pagination:   PaginationState;
  onPageChange: (page: number) => void;
}

export function AttendanceTable({ data, loading, pagination, onPageChange }: AttendanceTableProps) {
  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: 'staffName',
      header:      'Staff Member',
      cell:        ({ row }) => (
        <div>
          <p className="font-medium">{row.original.staffName}</p>
          <p className="text-xs text-muted-foreground">{row.original.role}</p>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header:      'Date',
    },
    {
      accessorKey: 'checkInTime',
      header:      'Check-In',
      cell:        ({ getValue }) => (getValue() as string | null) ?? '—',
    },
    {
      accessorKey: 'checkOutTime',
      header:      'Check-Out',
      cell:        ({ getValue }) => (getValue() as string | null) ?? '—',
    },
    {
      accessorKey: 'status',
      header:      'Status',
      cell:        ({ getValue }) => {
        const s = getValue() as AttendanceRecord['status'];
        const variant = ATTENDANCE_STATUS_COLOR[s] as 'success' | 'destructive' | 'warning' | 'secondary' | 'outline';
        return <Badge variant={variant}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'isLate',
      header:      'Late',
      cell:        ({ getValue }) => (
        getValue() ? <Badge variant="warning">Late</Badge> : <span className="text-muted-foreground">—</span>
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
      emptyState={<p className="text-muted-foreground">No attendance records found.</p>}
    />
  );
}

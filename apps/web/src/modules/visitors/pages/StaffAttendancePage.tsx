import { useState } from 'react';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { AttendanceFilters } from '../components/AttendanceFilters';
import { AttendanceTable }   from '../components/AttendanceTable';
import { useAttendance }     from '../hooks/useAttendance';
import { usePagination }     from '@/hooks/usePagination';
import { VISITOR_ROUTES }    from '../constants/visitor.constants';
import type { AttendanceFiltersParams } from '../types/attendance.types';

export function StaffAttendancePage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<AttendanceFiltersParams>>({});

  const { data, isLoading } = useAttendance({ ...filters, page, pageSize });

  const handleFiltersChange = (next: Partial<AttendanceFiltersParams>) => {
    setFilters(next);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Attendance"
        description="Track security and maintenance staff attendance"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors',  href: VISITOR_ROUTES.LIST },
            { label: 'Staff Attendance' },
          ]} />
        }
      />

      <AttendanceFilters filters={filters} onChange={handleFiltersChange} />

      <AttendanceTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}

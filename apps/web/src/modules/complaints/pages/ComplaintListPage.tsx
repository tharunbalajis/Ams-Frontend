import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { ComplaintFilters } from '../components/ComplaintFilters';
import { ComplaintTable }   from '../components/ComplaintTable';
import { useComplaints }    from '../hooks/useComplaints';
import { usePagination }    from '@/hooks/usePagination';
import { useDebounce }      from '@/hooks/useDebounce';
import { COMPLAINT_ROUTES } from '../constants/complaint.constants';
import type { ComplaintFiltersParams } from '../types/complaint.types';

export function ComplaintListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<ComplaintFiltersParams>>({});
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = useComplaints({
    ...filters,
    search: debouncedSearch,
    page,
    pageSize,
  });

  const handleFiltersChange = (next: Partial<ComplaintFiltersParams>) => {
    setFilters(next);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Complaints"
        description="Track, assign, and resolve resident complaints"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Complaints' },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void navigate(COMPLAINT_ROUTES.KANBAN)}>
              Kanban View
            </Button>
            <Button onClick={() => void navigate(COMPLAINT_ROUTES.CREATE)}>
              New Complaint
            </Button>
          </div>
        }
      />

      <ComplaintFilters filters={filters} onChange={handleFiltersChange} />

      <ComplaintTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}

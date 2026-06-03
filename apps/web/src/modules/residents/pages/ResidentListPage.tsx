import { useState }       from 'react';
import { useNavigate }    from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { ResidentFilters } from '../components/ResidentFilters';
import { ResidentTable }   from '../components/ResidentTable';
import { useResidents }    from '../hooks/useResidents';
import { usePagination }   from '@/hooks/usePagination';
import { useDebounce }     from '@/hooks/useDebounce';
import { RESIDENT_ROUTES } from '../constants/resident.constants';
import type { ResidentFiltersParams } from '../types/resident.types';

export function ResidentListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<ResidentFiltersParams>>({});
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = useResidents({ ...filters, search: debouncedSearch, page, limit: pageSize });

  const handleFiltersChange = (next: Partial<ResidentFiltersParams>) => {
    setFilters(next);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Residents"
        description="Manage residents, owners, and tenants"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Residents' },
          ]} />
        }
        actions={
          <Button onClick={() => void navigate(RESIDENT_ROUTES.CREATE)}>
            Add Resident
          </Button>
        }
      />

      <ResidentFilters filters={filters} onChange={handleFiltersChange} />

      <ResidentTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}

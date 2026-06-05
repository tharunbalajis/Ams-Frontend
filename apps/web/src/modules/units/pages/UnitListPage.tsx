import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { UnitFilters } from '../components/UnitFilters';
import { UnitTable }   from '../components/UnitTable';
import { useUnits }    from '../hooks/useUnits';
import { usePagination } from '@/hooks/usePagination';
import { UNIT_ROUTES }   from '../constants/unit.constants';
import type { UnitFiltersParams } from '../types/unit.types';

export function UnitListPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<UnitFiltersParams>>({});

  const { data, isLoading } = useUnits(filters);

  const handleFiltersChange = (next: Partial<UnitFiltersParams>) => {
    setFilters(next);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Units"
        description="Manage blocks, floors, and unit allocations"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units' },
          ]} />
        }
        actions={
          <Button onClick={() => void navigate(UNIT_ROUTES.CREATE)}>
            Add Unit
          </Button>
        }
      />

      <UnitFilters filters={filters} onChange={handleFiltersChange} />

      <UnitTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}

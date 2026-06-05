import { useState } from 'react';
import {
  Breadcrumbs, Button, PageHeader,
  MetricCard,
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody,
} from '@ams/ui';
import { ResidentFilters }   from '../components/ResidentFilters';
import { ResidentTable }     from '../components/ResidentTable';
import { ResidentForm }      from '../components/ResidentForm';
import { useResidents, useResidentSummary } from '../hooks/useResidents';
import { usePagination }     from '@/hooks/usePagination';
import { useDebounce }       from '@/hooks/useDebounce';
import type { ResidentFiltersParams } from '../types/resident.types';

export function ResidentListPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters]   = useState<Partial<ResidentFiltersParams>>({});
  const [addOpen, setAddOpen]   = useState(false);
  const debouncedSearch         = useDebounce(filters.search, 300);

  const { data: summary, isLoading: summaryLoading } = useResidentSummary();
  const { data, isLoading }                          = useResidents({
    ...filters,
    search: debouncedSearch,
    offset: (page - 1) * pageSize,
    limit:  pageSize,
  });

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
          <Button onClick={() => setAddOpen(true)}>
            Add Resident
          </Button>
        }
      />

      {/* KPI summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          title="Total Active"
          value={summary?.total_active ?? 0}
          loading={summaryLoading}
        />
        <MetricCard
          title="Owners"
          value={summary?.total_owners ?? 0}
          loading={summaryLoading}
        />
        <MetricCard
          title="Tenants"
          value={summary?.total_tenants ?? 0}
          loading={summaryLoading}
        />
      </div>

      <ResidentFilters filters={filters} onChange={handleFiltersChange} />

      <ResidentTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />

      {/* Inline Add Resident drawer */}
      <Drawer open={addOpen} onOpenChange={setAddOpen}>
        <DrawerContent side="right" width="lg">
          <DrawerHeader>
            <DrawerTitle>Register New Resident</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <ResidentForm
              mode="create"
              onSuccess={() => setAddOpen(false)}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

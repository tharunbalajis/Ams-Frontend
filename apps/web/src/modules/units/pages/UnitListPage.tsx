import { useState } from 'react';
import {
  Breadcrumbs, Button, PageHeader,
  MetricCard,
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody,
} from '@ams/ui';
import { UnitFilters }   from '../components/UnitFilters';
import { UnitTable }     from '../components/UnitTable';
import { UnitForm }      from '../components/UnitForm';
import { useUnits, useUnitSummary, useBlocks } from '../hooks/useUnits';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce }   from '@/hooks/useDebounce';
import { useAuth }       from '@/hooks/useAuth';
import type { UnitFiltersParams } from '../types/unit.types';

export function UnitListPage() {
  const { user }                            = useAuth();
  const societyId                           = user?.society_id;
  const { page, pageSize, setPage, reset }  = usePagination(1, 20);
  const [filters, setFilters]               = useState<Partial<UnitFiltersParams>>({});
  const [addOpen, setAddOpen]               = useState(false);
  const debouncedSearch                     = useDebounce(filters.search, 300);

  const { data: summary, isLoading: summaryLoading } = useUnitSummary();
  const { data: blocksData }                         = useBlocks(societyId);
  const { data, isLoading }                          = useUnits({
    ...filters,
    search: debouncedSearch,
    offset: (page - 1) * pageSize,
    limit:  pageSize,
  });

  const blockOptions = (blocksData?.data ?? []).map((b) => ({
    label: b.block_name,
    value: String(b.block_id),
  }));

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
          <Button onClick={() => setAddOpen(true)}>
            Add Unit
          </Button>
        }
      />

      {/* KPI summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Units"
          value={summary?.total_units ?? 0}
          loading={summaryLoading}
        />
        <MetricCard
          title="Vacant"
          value={summary?.vacant ?? 0}
          loading={summaryLoading}
        />
        <MetricCard
          title="Owner Occupied"
          value={summary?.owner_occupied ?? 0}
          loading={summaryLoading}
        />
        <MetricCard
          title="Rented"
          value={summary?.rented ?? 0}
          loading={summaryLoading}
        />
      </div>

      <UnitFilters
        filters={filters}
        onChange={handleFiltersChange}
        blocks={blockOptions}
      />

      <UnitTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />

      {/* Inline Add Unit drawer */}
      <Drawer open={addOpen} onOpenChange={setAddOpen}>
        <DrawerContent side="right" width="md">
          <DrawerHeader>
            <DrawerTitle>Add New Unit</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <UnitForm
              mode="create"
              onSuccess={() => setAddOpen(false)}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

import { useState } from 'react';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { CollectionTable }   from '../components/CollectionTable';
import { CollectionSummary } from '../components/CollectionSummary';
import { FinancialFilters }  from '../components/FinancialFilters';
import { useCollections, useCollectionSummary } from '../hooks/useCollections';
import { usePagination }     from '@/hooks/usePagination';
import { FINANCIAL_ROUTES }  from '../constants/invoice.constants';
import type { CollectionFiltersParams } from '../types/collection.types';

export function CollectionsPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<CollectionFiltersParams>>({});

  const { data,     isLoading }        = useCollections({ ...filters, page, pageSize });
  const { data: summary, isLoading: summaryLoading } = useCollectionSummary({ dateFrom: filters.dateFrom, dateTo: filters.dateTo });

  const defaultSummary = { period: 'Current', totalBilled: 0, totalCollected: 0, totalPending: 0, collectionRate: 0, defaulterCount: 0 };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        description="Track maintenance collection efficiency and dues"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Collections' }]} />}
      />

      <FinancialFilters filters={filters} onChange={(f) => { setFilters(f as Partial<CollectionFiltersParams>); reset(); }} showDateRange />

      <CollectionSummary summary={summary?.data ?? defaultSummary} loading={summaryLoading} />

      <CollectionTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
      />
    </div>
  );
}

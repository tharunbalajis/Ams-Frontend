import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, Button, Dialog, DialogContent, DialogHeader, DialogTitle, PageHeader } from '@ams/ui';
import { VisitorFilters } from '../components/VisitorFilters';
import { VisitorForm }    from '../components/VisitorForm';
import { VisitorTable }   from '../components/VisitorTable';
import { useVisitorLogs } from '../hooks/useVisitorLogs';
import { visitorsApi }    from '../api/visitors.api';
import { queryClient }    from '@/lib/queryClient';
import { usePagination }  from '@/hooks/usePagination';
import { useDebounce }    from '@/hooks/useDebounce';
import type { VisitorFiltersParams } from '../types/visitor.types';
import type { CreateVisitorFormValues } from '../schemas/visitor.schema';

export function VisitorLogsPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters, setFilters] = useState<Partial<VisitorFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = useVisitorLogs({
    ...filters,
    search: debouncedSearch,
    page,
    pageSize,
  });

  const { mutate: createVisitor, isPending: creating } = useMutation({
    mutationFn: (values: CreateVisitorFormValues) => visitorsApi.create(values),
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      setShowForm(false);
    },
  });

  const { mutate: checkIn } = useMutation({
    mutationFn: (id: string) => visitorsApi.checkIn(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors'] }),
  });

  const { mutate: checkOut } = useMutation({
    mutationFn: (id: string) => visitorsApi.checkOut(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors'] }),
  });

  const handleFiltersChange = (next: Partial<VisitorFiltersParams>) => {
    setFilters(next);
    reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visitor Logs"
        description="Monitor entries, exits, and visitor activity"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors' },
          ]} />
        }
        actions={
          <Button onClick={() => setShowForm(true)}>Register Visitor</Button>
        }
      />

      <VisitorFilters filters={filters} onChange={handleFiltersChange} />

      <VisitorTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
        onCheckIn={(id) => checkIn(id)}
        onCheckOut={(id) => checkOut(id)}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Register New Visitor</DialogTitle>
          </DialogHeader>
          <VisitorForm
            onSubmit={(v) => createVisitor(v)}
            onCancel={() => setShowForm(false)}
            isPending={creating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

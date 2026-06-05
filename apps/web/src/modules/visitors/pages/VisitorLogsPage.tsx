import { useState } from 'react';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { VisitorFilters } from '../components/VisitorFilters';
import { VisitorForm }    from '../components/VisitorForm';
import { VisitorTable }   from '../components/VisitorTable';
import { useVisitorLogs } from '../hooks/useVisitorLogs';
import { useCreateVisitor, useCheckInVisitor, useCheckOutVisitor } from '../hooks/useVisitor';
import { usePagination }  from '@/hooks/usePagination';
import type { VisitorFiltersParams } from '../types/visitor.types';
import type { CreateVisitorFormValues } from '../schemas/visitor.schema';

export function VisitorLogsPage() {
  const { page, pageSize, setPage, reset } = usePagination(1, 20);
  const [filters,  setFilters]  = useState<Partial<VisitorFiltersParams>>({});
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useVisitorLogs(filters);
  const { mutate: createVisitor, isPending: creating } = useCreateVisitor();
  const { mutate: checkIn }  = useCheckInVisitor();
  const { mutate: checkOut } = useCheckOutVisitor();

  const handleFiltersChange = (next: Partial<VisitorFiltersParams>) => {
    setFilters(next);
    reset();
  };

  const handleCreate = (values: CreateVisitorFormValues) => {
    createVisitor(
      {
        visitor_name:   values.visitor_name,
        visitor_type:   values.visitor_type!,
        visitor_mobile: values.visitor_mobile,
        purpose:        values.purpose,
        unit_id:        values.unit_id ? Number(values.unit_id) : undefined,
        resident_id:    values.resident_id,
      },
      { onSuccess: () => setShowForm(false) },
    );
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
        actions={<Button onClick={() => setShowForm(true)}>Register Visitor</Button>}
      />

      <VisitorFilters filters={filters} onChange={handleFiltersChange} />

      <VisitorTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{ page, pageSize, total: data?.meta?.total ?? 0 }}
        onPageChange={setPage}
        onCheckIn={(id) => checkIn({ id })}
        onCheckOut={(id) => checkOut(id)}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Register New Visitor</h2>
            <VisitorForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isPending={creating}
            />
          </div>
        </div>
      )}
    </div>
  );
}

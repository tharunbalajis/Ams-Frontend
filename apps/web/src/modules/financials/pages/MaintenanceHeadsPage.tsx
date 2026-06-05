import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumbs, PageHeader, Button,
  Card, CardContent, CardHeader, CardTitle,
  Badge, LoadingState, EmptyState,
} from '@ams/ui';
import { useMaintenanceHeads, useCreateMaintenanceHead } from '../hooks/useMaintenanceCharges';
import { createMaintenanceHeadSchema, type CreateMaintenanceHeadFormValues } from '../schemas/maintenance.schema';
import {
  MAINTENANCE_HEAD_TYPE_OPTIONS,
  FREQUENCY_OPTIONS,
  CALCULATION_BASIS_OPTIONS,
} from '../constants/maintenance.constants';
import { FINANCIAL_ROUTES } from '../constants/invoice.constants';

export function MaintenanceHeadsPage() {
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = useMaintenanceHeads();
  const { mutate: createHead, isPending: creating } = useCreateMaintenanceHead();

  const createForm = useForm<CreateMaintenanceHeadFormValues>({
    resolver: zodResolver(createMaintenanceHeadSchema),
    defaultValues: {
      head_name: '', head_type: 'MAINTENANCE', calculation_basis: 'FLAT',
      amount: 0, frequency: 'MONTHLY', gst_applicable: false, gst_rate: 0,
    },
  });

  const handleCreate = (values: CreateMaintenanceHeadFormValues) => {
    createHead(values, { onSuccess: () => { createForm.reset(); setShowCreate(false); } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Heads"
        description="Configure maintenance charge categories"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD },
            { label: 'Maintenance Heads' },
          ]} />
        }
        actions={
          <Button onClick={() => setShowCreate((v) => !v)}>
            {showCreate ? 'Cancel' : 'Add Head'}
          </Button>
        }
      />

      {showCreate && (
        <Card>
          <CardHeader><CardTitle>Add Maintenance Head</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={createForm.handleSubmit(handleCreate)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Head Name *</label>
                <input
                  {...createForm.register('head_name')}
                  placeholder="e.g. Society Maintenance"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {createForm.formState.errors.head_name && (
                  <p className="text-xs text-destructive">{createForm.formState.errors.head_name?.message}</p>
                )}
              </div>

              {([
                ['head_type', 'Head Type *', MAINTENANCE_HEAD_TYPE_OPTIONS],
                ['calculation_basis', 'Calculation Basis *', CALCULATION_BASIS_OPTIONS],
                ['frequency', 'Frequency *', FREQUENCY_OPTIONS],
              ] as const).map(([field, label, options]) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium">{label}</label>
                  <select
                    {...createForm.register(field)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-sm font-medium">Amount (₹) *</label>
                <input
                  {...createForm.register('amount', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">GST Rate (%)</label>
                <input
                  {...createForm.register('gst_rate', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  max={28}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-3">
                <Button type="submit" loading={creating}>Create Head</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {isLoading && <div className="p-6"><LoadingState variant="skeleton" rows={5} /></div>}
          {!isLoading && !data?.data?.length && (
            <div className="p-6"><EmptyState title="No maintenance heads" description="Add a head to configure charges." /></div>
          )}
          {!isLoading && !!data?.data?.length && (
            <div className="divide-y">
              {data.data.map((head) => (
                <div key={head.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{head.head_name}</p>
                      {!head.is_active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                      <span>{head.head_type}</span>
                      <span>{head.frequency}</span>
                      <span>{head.calculation_basis}</span>
                      <span>₹{head.amount.toLocaleString('en-IN')}</span>
                      {head.gst_applicable && <span>GST {head.gst_rate}%</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumbs, PageHeader, Button,
  Card, CardContent, CardHeader, CardTitle,
  Badge, LoadingState, EmptyState,
} from '@ams/ui';
import {
  useMaintenanceHeads,
  useCreateMaintenanceHead,
  useGenerateInvoices,
} from '../hooks/useMaintenanceCharges';
import { createMaintenanceHeadSchema, generateInvoicesSchema } from '../schemas/maintenance.schema';
import type { CreateMaintenanceHeadFormValues, GenerateInvoicesFormValues } from '../schemas/maintenance.schema';
import {
  MAINTENANCE_HEAD_TYPE_OPTIONS,
  FREQUENCY_OPTIONS,
  CALCULATION_BASIS_OPTIONS,
} from '../constants/maintenance.constants';
import { FINANCIAL_ROUTES } from '../constants/invoice.constants';

export function MaintenanceHeadsPage() {
  const [showCreate,   setShowCreate]   = useState(false);
  const [generateFor,  setGenerateFor]  = useState<string | null>(null);

  const { data, isLoading } = useMaintenanceHeads();
  const { mutate: createHead, isPending: creating } = useCreateMaintenanceHead();
  const { mutate: generateInvoices, isPending: generating } = useGenerateInvoices();

  const createForm = useForm<CreateMaintenanceHeadFormValues>({
    resolver: zodResolver(createMaintenanceHeadSchema),
    defaultValues: {
      name: '', code: '', headType: 'MAINTENANCE', frequency: 'MONTHLY',
      calculationBasis: 'FIXED', defaultAmount: 0,
    },
  });

  const generateForm = useForm<GenerateInvoicesFormValues>({
    resolver: zodResolver(generateInvoicesSchema),
    defaultValues: { headId: '', period: '', dueDate: '' },
  });

  const handleCreate = (values: CreateMaintenanceHeadFormValues) => {
    createHead(values, { onSuccess: () => { createForm.reset(); setShowCreate(false); } });
  };

  const handleGenerate = (values: GenerateInvoicesFormValues) => {
    if (!generateFor) return;
    generateInvoices({ ...values, headId: generateFor }, {
      onSuccess: () => { generateForm.reset(); setGenerateFor(null); },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Heads"
        description="Configure maintenance charge heads and generate invoices"
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
              {([
                ['name', 'Head Name *', 'text', 'e.g. Society Maintenance'],
                ['code', 'Code *', 'text', 'e.g. SOC_MAINT'],
              ] as const).map(([field, label, type, placeholder]) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    {...createForm.register(field)}
                    type={type}
                    placeholder={placeholder}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {createForm.formState.errors[field] && (
                    <p className="text-xs text-destructive">{createForm.formState.errors[field]?.message}</p>
                  )}
                </div>
              ))}

              {([
                ['headType', 'Head Type *', MAINTENANCE_HEAD_TYPE_OPTIONS],
                ['frequency', 'Frequency *', FREQUENCY_OPTIONS],
                ['calculationBasis', 'Calculation Basis *', CALCULATION_BASIS_OPTIONS],
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
                <label className="text-sm font-medium">Default Amount (₹) *</label>
                <input
                  {...createForm.register('defaultAmount', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                <label className="text-sm font-medium">Description</label>
                <input
                  {...createForm.register('description')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Optional description"
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

      {generateFor && (
        <Card className="border-primary">
          <CardHeader><CardTitle>Generate Invoices</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={generateForm.handleSubmit(handleGenerate)} className="flex flex-wrap items-end gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Period *</label>
                <input
                  {...generateForm.register('period')}
                  placeholder="e.g. 2025-01"
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Due Date *</label>
                <input
                  {...generateForm.register('dueDate')}
                  type="date"
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button type="submit" loading={generating}>Generate</Button>
              <Button type="button" variant="outline" onClick={() => setGenerateFor(null)}>Cancel</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {isLoading && <div className="p-6"><LoadingState variant="skeleton" rows={5} /></div>}
          {!isLoading && !data?.data?.length && (
            <div className="p-6"><EmptyState title="No maintenance heads" description="Add a head to start generating invoices." /></div>
          )}
          {!isLoading && !!data?.data?.length && (
            <div className="divide-y">
              {data.data.map((head) => (
                <div key={head.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{head.name}</p>
                      <Badge variant="outline" className="font-mono text-xs">{head.code}</Badge>
                      {!head.isActive && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                      <span>{head.headType}</span>
                      <span>{head.frequency}</span>
                      <span>{head.calculationBasis}</span>
                      <span>₹{head.defaultAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setGenerateFor(head.id)}
                    disabled={!head.isActive}
                  >
                    Generate Invoices
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

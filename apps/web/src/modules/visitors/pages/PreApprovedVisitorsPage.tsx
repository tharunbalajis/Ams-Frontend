import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumbs, Button, PageHeader, FormField, Input,
} from '@ams/ui';
import { PreApprovedVisitorTable } from '../components/PreApprovedVisitorTable';
import { usePreApprovedVisitors, useCreateInvite, useRevokeInvite } from '../hooks/usePreApprovedVisitors';
import { createInviteSchema, type CreateInviteFormValues } from '../schemas/visitor.schema';
import { VISITOR_ROUTES } from '../constants/visitor.constants';

export function PreApprovedVisitorsPage() {
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading }                         = usePreApprovedVisitors();
  const { mutate: createInvite, isPending: creating } = useCreateInvite();
  const { mutate: revokeInvite }                    = useRevokeInvite();

  const form = useForm<CreateInviteFormValues>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: {
      visitorName: '', visitorMobile: '',
      visitorType: 'GUEST', validFrom: '', validUntil: '',
    },
  });

  const handleAdd = (values: CreateInviteFormValues) => {
    createInvite(values, {
      onSuccess: () => { setShowForm(false); form.reset(); },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pre-Approved Visitors"
        description="Manage standing approvals for frequent visitors"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors',  href: VISITOR_ROUTES.LIST },
            { label: 'Pre-Approved' },
          ]} />
        }
        actions={<Button onClick={() => setShowForm((v) => !v)}>{showForm ? 'Cancel' : 'Add Invite'}</Button>}
      />

      {showForm && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Create Invite</h3>
          <form onSubmit={form.handleSubmit(handleAdd)} className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="visitorName" label="Visitor Name" required>
              {(f) => (
                <Input value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="Full name" disabled={creating} />
              )}
            </FormField>
            <FormField control={form.control} name="visitorMobile" label="Mobile" required>
              {(f) => (
                <Input type="tel" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} placeholder="+91 XXXXX XXXXX" disabled={creating} />
              )}
            </FormField>
            <FormField control={form.control} name="validFrom" label="Valid From" required>
              {(f) => (
                <Input type="date" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} disabled={creating} />
              )}
            </FormField>
            <FormField control={form.control} name="validUntil" label="Valid Until" required>
              {(f) => (
                <Input type="date" value={f.value as string} onChange={f.onChange} onBlur={f.onBlur} disabled={creating} />
              )}
            </FormField>
            <div className="flex gap-3 sm:col-span-2">
              <Button type="submit" loading={creating}>Create Invite</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <PreApprovedVisitorTable
        data={data?.data ?? []}
        loading={isLoading}
        onRevoke={(id) => revokeInvite(id)}
      />
    </div>
  );
}

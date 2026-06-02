import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, Button, Dialog, DialogContent, DialogHeader, DialogTitle, PageHeader } from '@ams/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button as FormButton, FormField, Input } from '@ams/ui';
import { PreApprovedVisitorTable }  from '../components/PreApprovedVisitorTable';
import { usePreApprovedVisitors }   from '../hooks/usePreApprovedVisitors';
import { preApprovedVisitorsApi }   from '../api/preApprovedVisitors.api';
import { queryClient }              from '@/lib/queryClient';
import { VISITOR_ROUTES }           from '../constants/visitor.constants';
import { preApproveVisitorSchema, type PreApproveVisitorFormValues } from '../schemas/visitor.schema';

export function PreApprovedVisitorsPage() {
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = usePreApprovedVisitors();

  const form = useForm<PreApproveVisitorFormValues>({
    resolver:      zodResolver(preApproveVisitorSchema),
    defaultValues: { visitorName: '', visitorMobile: '', residentId: '', validUntil: '' },
  });

  const { mutate: addPreApproved, isPending } = useMutation({
    mutationFn: (values: PreApproveVisitorFormValues) => preApprovedVisitorsApi.create(values),
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['visitors', 'pre-approved'] });
      setShowForm(false);
      form.reset();
    },
  });

  const { mutate: revokeApproval } = useMutation({
    mutationFn: (id: string) => preApprovedVisitorsApi.revoke(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors', 'pre-approved'] }),
  });

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
        actions={
          <Button onClick={() => setShowForm(true)}>Add Pre-Approval</Button>
        }
      />

      <PreApprovedVisitorTable
        data={data?.data ?? []}
        loading={isLoading}
        onRevoke={(id) => revokeApproval(id)}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Pre-Approved Visitor</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit((v) => addPreApproved(v))} className="space-y-4" noValidate>
            <FormField control={form.control} name="visitorName" label="Visitor Name" required>
              {(field) => (
                <Input value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="Full name" disabled={isPending} />
              )}
            </FormField>
            <FormField control={form.control} name="visitorMobile" label="Mobile" required>
              {(field) => (
                <Input type="tel" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} placeholder="+91 XXXXX XXXXX" disabled={isPending} />
              )}
            </FormField>
            <FormField control={form.control} name="validUntil" label="Valid Until" required>
              {(field) => (
                <Input type="date" value={field.value as string} onChange={field.onChange} onBlur={field.onBlur} disabled={isPending} />
              )}
            </FormField>
            <div className="flex justify-end gap-3">
              <FormButton type="button" variant="outline" onClick={() => setShowForm(false)} disabled={isPending}>Cancel</FormButton>
              <FormButton type="submit" loading={isPending}>Add Approval</FormButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

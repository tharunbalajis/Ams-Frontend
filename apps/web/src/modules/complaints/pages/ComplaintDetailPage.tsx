import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, Button, Dialog, DialogContent, DialogHeader, DialogTitle, ErrorState, LoadingState, PageHeader, Tabs, TabsContent, TabsList, TabsTrigger } from '@ams/ui';
import { ComplaintStatusBadge } from '../components/ComplaintStatusBadge';
import { ComplaintTimeline }    from '../components/ComplaintTimeline';
import { AssignmentDrawer }     from '../components/AssignmentDrawer';
import { EscalationPanel }      from '../components/EscalationPanel';
import { ResolutionForm }       from '../components/ResolutionForm';
import { SLAIndicator }         from '../components/SLAIndicator';
import { StatusStepper }        from '../components/StatusStepper';
import { useComplaint }             from '../hooks/useComplaint';
import { useComplaintTimeline }     from '../hooks/useComplaintTimeline';
import { useComplaintAssignments }  from '../hooks/useComplaintAssignments';
import { useEscalations }           from '../hooks/useEscalations';
import { useSLA }                   from '../hooks/useSLA';
import { complaintsApi }            from '../api/complaints.api';
import { assignmentsApi }           from '../api/assignments.api';
import { queryClient }              from '@/lib/queryClient';
import { complaintKeys }            from '@/lib';
import { COMPLAINT_ROUTES }         from '../constants/complaint.constants';
import type { ResolutionFormValues } from '../schemas/resolution.schema';
import type { AssignmentFormValues } from '../schemas/assignment.schema';

export function ComplaintDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [assignOpen,  setAssignOpen]  = useState(false);
  const [resolveOpen, setResolveOpen] = useState(false);

  const { data,         isLoading,      isError }   = useComplaint(id);
  const { data: tl,     isLoading: tlLoading }      = useComplaintTimeline(id);
  const { data: assigns }                            = useComplaintAssignments(id);
  const { data: escals }                             = useEscalations(id);
  const { data: sla }                                = useSLA(id);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
    queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
  };

  const { mutate: resolve, isPending: resolving } = useMutation({
    mutationFn: (values: ResolutionFormValues) =>
      complaintsApi.updateStatus(id, values.closeAfterResolve ? 'closed' : 'resolved', values.resolutionNotes),
    onSuccess: () => { invalidate(); setResolveOpen(false); },
  });

  const { mutate: assign, isPending: assigning } = useMutation({
    mutationFn: (values: AssignmentFormValues) =>
      assignmentsApi.create(id, { complaintId: id, ...values }),
    onSuccess: () => { invalidate(); setAssignOpen(false); },
  });

  if (isLoading) return <LoadingState />;
  if (isError || !data?.data) return <ErrorState />;

  const complaint = data.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={complaint.title}
        description={`${complaint.category.replace('_', ' ')} · Unit ${complaint.unitNumber}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',   href: '/dashboard' },
            { label: 'Complaints',  href: COMPLAINT_ROUTES.LIST },
            { label: complaint.title.slice(0, 30) },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <ComplaintStatusBadge priority={complaint.priority} />
            <ComplaintStatusBadge status={complaint.status} />
            {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
              <>
                <Button variant="outline" onClick={() => setAssignOpen(true)}>Assign</Button>
                <Button onClick={() => setResolveOpen(true)}>Resolve</Button>
              </>
            )}
          </div>
        }
      />

      <StatusStepper currentStatus={complaint.status} />

      {sla?.data && <SLAIndicator sla={sla.data} />}

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm leading-relaxed">{complaint.description}</p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div><p className="text-muted-foreground">Resident</p><p className="font-medium">{complaint.residentName}</p></div>
              <div><p className="text-muted-foreground">Unit</p><p className="font-medium">{complaint.unitNumber}</p></div>
              <div><p className="text-muted-foreground">Assigned To</p><p className="font-medium">{complaint.assignedTo ?? '—'}</p></div>
              <div><p className="text-muted-foreground">Date</p><p className="font-medium">{complaint.complaintDate}</p></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <ComplaintTimeline events={tl?.data ?? []} loading={tlLoading} />
        </TabsContent>

        <TabsContent value="escalations" className="mt-4">
          <EscalationPanel escalations={escals?.data ?? []} />
        </TabsContent>
      </Tabs>

      <AssignmentDrawer
        open={assignOpen}
        onOpenChange={setAssignOpen}
        assignment={assigns?.data?.[0]}
        onSubmit={(v) => assign(v)}
        isPending={assigning}
      />

      <Dialog open={resolveOpen} onOpenChange={setResolveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
          </DialogHeader>
          <ResolutionForm
            onSubmit={(v) => resolve(v)}
            onCancel={() => setResolveOpen(false)}
            isPending={resolving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

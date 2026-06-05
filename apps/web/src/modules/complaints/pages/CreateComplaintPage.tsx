import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, PageHeader } from '@ams/ui';
import { ComplaintForm }    from '../components/ComplaintForm';
import { useCreateComplaint } from '../hooks/useCreateComplaint';
import { COMPLAINT_ROUTES }   from '../constants/complaint.constants';
import type { CreateComplaintFormValues } from '../schemas/complaint.schema';
import { useAuth } from '@/hooks/useAuth';

export function CreateComplaintPage() {
  const { user } = useAuth();
  const { mutate, isPending } = useCreateComplaint();

  const handleSubmit = (values: CreateComplaintFormValues) => {
    mutate({
      ...values,
      unit_id:    Number(values.unit_id),
      raised_by:  user?.id ?? '',
      society_id: user?.society_id ?? 1,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Complaint"
        description="Register a new resident complaint"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',   href: '/dashboard' },
            { label: 'Complaints',  href: COMPLAINT_ROUTES.LIST },
            { label: 'New Complaint' },
          ]} />
        }
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ComplaintForm onSubmit={handleSubmit} isPending={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}

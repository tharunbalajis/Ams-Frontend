import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, PageHeader } from '@ams/ui';
import { ComplaintForm }    from '../components/ComplaintForm';
import { useCreateComplaint } from '../hooks/useCreateComplaint';
import { COMPLAINT_ROUTES }   from '../constants/complaint.constants';
import type { CreateComplaintFormValues } from '../schemas/complaint.schema';

export function CreateComplaintPage() {
  const { mutate, isPending } = useCreateComplaint();

  const handleSubmit = (values: CreateComplaintFormValues) => {
    mutate(values);
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

import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader } from '@ams/ui';
import { ComplaintKanban }  from '../components/ComplaintKanban';
import { useComplaints }    from '../hooks/useComplaints';
import { COMPLAINT_ROUTES } from '../constants/complaint.constants';

export function ComplaintKanbanPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useComplaints({ limit: 200 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Complaint Board"
        description="Kanban view of complaints by status"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Complaints', href: COMPLAINT_ROUTES.LIST },
            { label: 'Board' },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void navigate(COMPLAINT_ROUTES.LIST)}>
              List View
            </Button>
            <Button onClick={() => void navigate(COMPLAINT_ROUTES.CREATE)}>
              New Complaint
            </Button>
          </div>
        }
      />

      <ComplaintKanban
        complaints={data?.data ?? []}
        loading={isLoading}
      />
    </div>
  );
}

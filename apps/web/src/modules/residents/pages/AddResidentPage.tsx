import { Breadcrumbs, PageHeader } from '@ams/ui';
import { ResidentForm }    from '../components/ResidentForm';
import { RESIDENT_ROUTES } from '../constants/resident.constants';

export function AddResidentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Resident"
        description="Register a new resident to the system"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: 'Add Resident' },
          ]} />
        }
      />
      <ResidentForm mode="create" />
    </div>
  );
}

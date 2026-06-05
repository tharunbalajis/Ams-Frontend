import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, PageHeader } from '@ams/ui';
import { UnitForm }    from '../components/UnitForm';
import { UNIT_ROUTES } from '../constants/unit.constants';

export function AddUnitPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Unit"
        description="Register a new unit in the property"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units',     href: UNIT_ROUTES.LIST },
            { label: 'Add Unit' },
          ]} />
        }
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Unit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UnitForm
            mode="create"
            onSuccess={() => void navigate(UNIT_ROUTES.LIST)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

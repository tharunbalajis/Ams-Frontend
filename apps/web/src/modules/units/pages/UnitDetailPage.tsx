import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader, LoadingState, ErrorState, Tabs, TabsContent, TabsList, TabsTrigger } from '@ams/ui';
import { UnitProfile }      from '../components/UnitProfile';
import { OwnershipSection } from '../components/OwnershipSection';
import { useUnit }          from '../hooks/useUnit';
import { useOwnership }     from '../hooks/useOwnership';
import { UNIT_ROUTES }      from '../constants/unit.constants';

export function UnitDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate     = useNavigate();

  const { data: unit,      isLoading: loadingUnit,      isError: errorUnit }  = useUnit(id);
  const { data: ownership, isLoading: loadingOwnership }                       = useOwnership(id);

  if (loadingUnit) return <LoadingState />;
  if (errorUnit || !unit?.data) return <ErrorState />;

  const u = unit.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Unit ${u.unitNumber}`}
        description={`Block ${u.block} · Floor ${u.floor} · ${u.type}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units',     href: UNIT_ROUTES.LIST },
            { label: u.unitNumber },
          ]} />
        }
        actions={
          <Button
            variant="outline"
            onClick={() => void navigate(UNIT_ROUTES.EDIT.replace(':id', id))}
          >
            Edit Unit
          </Button>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ownership">Ownership</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <UnitProfile unit={u} ownership={ownership?.data} />
        </TabsContent>

        <TabsContent value="ownership" className="mt-4">
          {ownership?.data && (
            <OwnershipSection
              ownership={ownership.data}
              loading={loadingOwnership}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

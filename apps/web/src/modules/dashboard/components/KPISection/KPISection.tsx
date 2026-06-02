import { LoadingState } from '@ams/ui';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { ResidentStats }  from '../ResidentStats';
import { UnitStats }      from '../UnitStats';
import { ComplaintStats } from '../ComplaintStats';
import { VisitorStats }   from '../VisitorStats';
import { FinancialStats } from '../FinancialStats';
import { StaffStats }     from '../StaffStats';
import { AssetStats }     from '../AssetStats';
import { MeetingStats }   from '../MeetingStats';

export function KPISection() {
  const { isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingState key={i} variant="pulse" rows={1} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ResidentStats />
      <UnitStats />
      <ComplaintStats />
      <VisitorStats />
      <FinancialStats />
      <StaffStats />
      <AssetStats />
      <MeetingStats />
    </div>
  );
}

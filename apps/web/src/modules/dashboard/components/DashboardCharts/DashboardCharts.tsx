import { ResidentTrendChart }   from '../ResidentTrendChart';
import { ComplaintTrendChart }  from '../ComplaintTrendChart';
import { CollectionTrendChart } from '../CollectionTrendChart';
import { OccupancyChart }       from '../OccupancyChart';
import { VisitorTrendChart }    from '../VisitorTrendChart';

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ResidentTrendChart />
      <CollectionTrendChart />
      <OccupancyChart />
      <ComplaintTrendChart />
      <VisitorTrendChart />
    </div>
  );
}

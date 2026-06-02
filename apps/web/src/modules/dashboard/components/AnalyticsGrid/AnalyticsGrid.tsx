import { ResidentTrendChart }   from '../ResidentTrendChart';
import { CollectionTrendChart } from '../CollectionTrendChart';
import { OccupancyChart }       from '../OccupancyChart';
import { ComplaintTrendChart }  from '../ComplaintTrendChart';

export function AnalyticsGrid() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Trends &amp; Analytics
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <ResidentTrendChart />
        <CollectionTrendChart />
        <OccupancyChart />
        <ComplaintTrendChart />
      </div>
    </div>
  );
}

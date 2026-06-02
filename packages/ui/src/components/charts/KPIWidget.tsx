import * as React from 'react';
import { cn } from '../../styles/theme';
import { Card, CardContent } from '../cards/Card';
import { LineChart, type ChartDataPoint } from './LineChart';

export interface KPIWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  change?: { value: number; direction: 'up' | 'down' | 'neutral'; label?: string };
  sparklineData?: ChartDataPoint[];
  sparklineKey?: string;
  loading?: boolean;
}

const KPIWidget = React.forwardRef<HTMLDivElement, KPIWidgetProps>(
  ({ className, title, value, unit, change, sparklineData, sparklineKey = 'value', loading, ...props }, ref) => (
    <Card ref={ref} className={cn('overflow-hidden', className)} {...props}>
      <CardContent className="p-5">
        {loading ? (
          <div className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-7 w-28 animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {change && (
              <div className="mt-1 flex items-center gap-1 text-xs">
                <span className={cn(
                  'font-medium',
                  change.direction === 'up'      && 'text-green-600',
                  change.direction === 'down'    && 'text-red-600',
                  change.direction === 'neutral' && 'text-muted-foreground',
                )}>
                  {change.direction === 'up' ? '↑' : change.direction === 'down' ? '↓' : '—'}{' '}
                  {Math.abs(change.value)}%
                </span>
                {change.label && <span className="text-muted-foreground">{change.label}</span>}
              </div>
            )}
            {sparklineData && sparklineData.length > 0 && (
              <div className="-mx-5 mt-3">
                <LineChart
                  data={sparklineData}
                  series={[{ dataKey: sparklineKey }]}
                  xAxisKey="_x"
                  height={60}
                  showGrid={false}
                  showLegend={false}
                  showTooltip={false}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  ),
);
KPIWidget.displayName = 'KPIWidget';

export { KPIWidget };

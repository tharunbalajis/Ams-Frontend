import * as React from 'react';
import { cn } from '../../styles/theme';
import { Card, CardContent } from './Card';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: { value: number; direction: TrendDirection; label?: string };
  loading?: boolean;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, description, icon, trend, loading, ...props }, ref) => (
    <Card ref={ref} className={className} {...props}>
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              {trend && (
                <div className="flex items-center gap-1 text-xs">
                  {trend.direction === 'up' && (
                    <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  )}
                  {trend.direction === 'down' && (
                    <svg className="h-3 w-3 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                  <span className={cn(
                    'font-medium',
                    trend.direction === 'up'      && 'text-green-600',
                    trend.direction === 'down'    && 'text-red-600',
                    trend.direction === 'neutral' && 'text-muted-foreground',
                  )}>
                    {trend.value > 0 ? '+' : ''}{trend.value}%
                  </span>
                  {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
                </div>
              )}
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  ),
);
MetricCard.displayName = 'MetricCard';

export { MetricCard };

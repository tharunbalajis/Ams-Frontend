import * as React from 'react';
import { cn } from '../../styles/theme';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, breadcrumbs, actions, badge, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
      {breadcrumbs && <div className="mb-1">{breadcrumbs}</div>}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  ),
);
PageHeader.displayName = 'PageHeader';

export { PageHeader };

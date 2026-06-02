import * as React from 'react';
import { cn } from '../../styles/theme';
import { Button } from '../buttons/Button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col items-center justify-center py-12 text-center', className)} {...props}>
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && (
        <Button onClick={action.onClick} size="sm" className="mt-4">{action.label}</Button>
      )}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };

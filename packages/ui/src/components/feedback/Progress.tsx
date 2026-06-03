import * as React from 'react';
import { cn } from '../../styles/theme';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  variant?: 'default' | 'warning' | 'destructive';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <div
        className={cn(
          'h-full w-full flex-1 transition-all',
          variant === 'destructive' && 'bg-destructive',
          variant === 'warning'     && 'bg-yellow-500',
          variant === 'default'     && 'bg-primary',
        )}
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    </div>
  ),
);
Progress.displayName = 'Progress';

export { Progress };

import * as React from 'react';
import { cn } from '../../styles/theme';

export type LoadingVariant = 'spinner' | 'skeleton' | 'pulse';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoadingVariant;
  message?: string;
  rows?: number;
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, variant = 'spinner', message, rows = 5, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        variant === 'spinner' ? 'flex flex-col items-center justify-center gap-3 py-12' : 'w-full py-4',
        className,
      )}
      {...props}
    >
      {variant === 'spinner' && (
        <>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </>
      )}
      {variant === 'skeleton' && (
        <div className="w-full space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
      {variant === 'pulse' && (
        <div className="w-full space-y-2">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      )}
    </div>
  ),
);
LoadingState.displayName = 'LoadingState';

export { LoadingState };

import * as React from 'react';
import { cn } from '../../styles/theme';
import { Button } from '../buttons/Button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  error?: Error | string;
  onRetry?: () => void;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, title = 'Something went wrong', description, error, onRetry, ...props }, ref) => {
    const message = error ? (typeof error === 'string' ? error : error.message) : description;
    return (
      <div ref={ref} className={cn('flex flex-col items-center justify-center py-12 text-center', className)} {...props}>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx={12} cy={12} r={10} />
            <path d="m15 9-6 6M9 9l6 6" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {message && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>}
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="mt-4">Try again</Button>
        )}
      </div>
    );
  },
);
ErrorState.displayName = 'ErrorState';

export { ErrorState };

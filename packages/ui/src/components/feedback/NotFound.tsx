import * as React from 'react';
import { cn } from '../../styles/theme';
import { Button } from '../buttons/Button';

export interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onBack?: () => void;
  backLabel?: string;
}

const NotFound = React.forwardRef<HTMLDivElement, NotFoundProps>(
  ({
    className,
    title = 'Page not found',
    description = "The page you're looking for doesn't exist or has been moved.",
    onBack,
    backLabel = 'Go back',
    ...props
  }, ref) => (
    <div ref={ref} className={cn('flex flex-col items-center justify-center py-16 text-center', className)} {...props}>
      <p className="text-8xl font-extrabold tracking-tight text-muted-foreground/20">404</p>
      <h2 className="mt-4 text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onBack && (
        <Button onClick={onBack} size="sm" className="mt-6">{backLabel}</Button>
      )}
    </div>
  ),
);
NotFound.displayName = 'NotFound';

export { NotFound };

import * as React from 'react';
import { cn } from '../../styles/theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, startAdornment, endAdornment, ...props }, ref) => {
    const base =
      'flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    if (startAdornment || endAdornment) {
      return (
        <div className="relative flex items-center">
          {startAdornment && (
            <span className="absolute left-3 flex items-center text-muted-foreground">
              {startAdornment}
            </span>
          )}
          <input
            type={type}
            className={cn(base, startAdornment ? 'pl-9' : 'px-3', endAdornment ? 'pr-9' : 'px-3', error && 'border-destructive focus-visible:ring-destructive', className)}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <span className="absolute right-3 flex items-center text-muted-foreground">
              {endAdornment}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(base, 'px-3', error && 'border-destructive focus-visible:ring-destructive', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

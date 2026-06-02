import * as React from 'react';
import { cn } from '../../styles/theme';

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, value, onChange, min, max, disabled, error }, ref) => (
    <input
      ref={ref}
      type="date"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      min={min}
      max={max}
      disabled={disabled}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive focus-visible:ring-destructive',
        className,
      )}
    />
  ),
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };

import * as React from 'react';
import { cn } from '../../styles/theme';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, resize = 'vertical', ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        resize === 'none'       && 'resize-none',
        resize === 'vertical'   && 'resize-y',
        resize === 'horizontal' && 'resize-x',
        resize === 'both'       && 'resize',
        error && 'border-destructive focus-visible:ring-destructive',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TextArea.displayName = 'TextArea';

export { TextArea };

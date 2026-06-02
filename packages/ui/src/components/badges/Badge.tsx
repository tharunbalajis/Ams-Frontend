import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../styles/theme';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:     'border-transparent bg-primary text-primary-foreground',
        secondary:   'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline:     'text-foreground',
        success:     'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        warning:     'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
        info:        'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        muted:       'border-transparent bg-muted text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };

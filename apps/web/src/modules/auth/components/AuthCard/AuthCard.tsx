import type { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ams/ui';

export interface AuthCardProps {
  title:        string;
  description?: string;
  children:     ReactNode;
  footer?:      ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Brand header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            A
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Apartment Management System
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1 pb-4 text-center">
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </CardHeader>

          <CardContent>{children}</CardContent>

          {footer && <CardFooter className="justify-center">{footer}</CardFooter>}
        </Card>

      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/app/router/routeConfig';

interface PermissionRouteProps {
  children:    ReactNode;
  permission:  string;
  fallback?:   ReactNode;
  redirectTo?: string;
}

export function PermissionRoute({
  children,
  permission,
  fallback,
  redirectTo = ROUTES.DASHBOARD,
}: PermissionRouteProps) {
  const { can } = usePermissions();

  if (!can(permission)) {
    if (fallback !== undefined) return <>{fallback}</>;
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default PermissionRoute;

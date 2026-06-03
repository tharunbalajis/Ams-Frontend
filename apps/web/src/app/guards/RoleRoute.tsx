import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { Role } from '@/config/roles';
import { usePermissions } from '@/hooks/usePermissions';
import { ROUTES } from '@/app/router/routeConfig';

interface RoleRouteProps {
  children:     ReactNode;
  allowedRoles: Role[];
  fallback?:    ReactNode;
  redirectTo?:  string;
}

export function RoleRoute({
  children,
  allowedRoles,
  fallback,
  redirectTo = ROUTES.DASHBOARD,
}: RoleRouteProps) {
  const { hasAnyRole } = usePermissions();

  if (!hasAnyRole(allowedRoles)) {
    if (fallback !== undefined) return <>{fallback}</>;
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default RoleRoute;

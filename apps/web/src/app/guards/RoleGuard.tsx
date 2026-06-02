import type { ReactNode } from 'react';
import type { Role } from '@/config/roles';
import { usePermissions } from '@/hooks/usePermissions';

interface RoleGuardProps {
  children:     ReactNode;
  allowedRoles: Role[];
  fallback?:    ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { hasAnyRole } = usePermissions();
  return <>{hasAnyRole(allowedRoles) ? children : fallback}</>;
}

export default RoleGuard;

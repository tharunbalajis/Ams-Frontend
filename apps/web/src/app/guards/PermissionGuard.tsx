import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
  children:   ReactNode;
  permission: string;
  fallback?:  ReactNode;
}

export function PermissionGuard({ children, permission, fallback = null }: PermissionGuardProps) {
  const { can } = usePermissions();
  return <>{can(permission) ? children : fallback}</>;
}

export default PermissionGuard;

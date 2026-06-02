import { useAuth } from '@/app/providers/AuthProvider';
import { ROLE_HIERARCHY, type Role } from '@/config/roles';

export function usePermissions() {
  const { user } = useAuth();

  const hasRole = (role: Role): boolean =>
    !!user && user.role === role;

  const hasMinRole = (minRole: Role): boolean => {
    if (!user) return false;
    return (ROLE_HIERARCHY[user.role] ?? 0) >= (ROLE_HIERARCHY[minRole] ?? 0);
  };

  const hasAnyRole = (roles: Role[]): boolean =>
    !!user && roles.includes(user.role);

  // Permission matrix — implement in auth module when role-permission map is available
  const can = (_permission: string): boolean => !!user;

  return { hasRole, hasMinRole, hasAnyRole, can, user };
}

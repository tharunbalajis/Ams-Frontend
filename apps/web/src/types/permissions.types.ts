import type { Role } from '@/config/roles';
import type { Permission } from '@/config/permissions';

export type { Role, Permission };

export interface RolePermissions {
  role:        Role;
  permissions: Permission[];
}

export interface PermissionCheck {
  permission: Permission;
  allowed:    boolean;
}

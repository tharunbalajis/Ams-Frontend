export { ROUTES, buildRoute } from '@/app/router/routeConfig';
export type { RouteKey, RoutePath } from '@/app/router/routeConfig';

export const PUBLIC_ROUTES  = ['/login'] as const;
export const DEFAULT_REDIRECT = '/dashboard';

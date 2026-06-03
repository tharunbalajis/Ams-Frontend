export const AUTH_ROUTES = {
  LOGIN: '/login',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

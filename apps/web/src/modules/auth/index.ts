// Auth module public API — only import from here, never from sub-paths

// Pages — consumed by the router
export { LoginPage }          from './pages/LoginPage';
export { ForgotPasswordPage } from './pages/ForgotPasswordPage';
export { ResetPasswordPage }  from './pages/ResetPasswordPage';

// Hooks — available to app shell for session hydration
export { useCurrentUser } from './hooks/useCurrentUser';
export { useLogout }      from './hooks/useLogout';

// Types
export type { LoginPayload, LoginResponse }         from './types/login.types';
export type { SessionState, SessionStorage }        from './types/session.types';
export type { AuthUser, ForgotPasswordPayload, ResetPasswordPayload } from './types/auth.types';

// Constants
export { AUTH_ROUTES }         from './constants/auth.routes';
export { AUTH_ERROR_MESSAGES } from './constants/auth.constants';
export type { AuthRoute }      from './constants/auth.routes';

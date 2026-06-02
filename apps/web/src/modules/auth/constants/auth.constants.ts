export const AUTH_TOKEN_KEY         = 'ams_access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'ams_refresh_token';

export const SESSION_TIMEOUT_MS  = 30 * 60 * 1000; // 30 minutes
export const REFRESH_BUFFER_MS   = 60 * 1000;       // refresh 1 min before expiry
export const TOKEN_REFRESH_RETRY = 1;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED:     'Your session has expired. Please sign in again.',
  UNAUTHORIZED:        'You are not authorized to access this resource.',
  ACCOUNT_LOCKED:      'Your account has been locked. Contact an administrator.',
  EMAIL_NOT_FOUND:     'No account found with that email address.',
  WEAK_PASSWORD:       'Password must be at least 8 characters.',
  TOKEN_INVALID:       'Reset link is invalid or has expired.',
} as const;

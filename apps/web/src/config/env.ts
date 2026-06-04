export const env = {
  appName:    import.meta.env.VITE_APP_NAME    ?? 'AMS',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
  appEnv:    (import.meta.env.VITE_APP_ENV    ?? 'development') as 'development' | 'staging' | 'production',

  apiUrl:     import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL,
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT ?? 30_000),
  uploadUrl:  import.meta.env.VITE_UPLOAD_URL ?? '',

  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',

  authTokenKey:        import.meta.env.VITE_AUTH_TOKEN_KEY         ?? 'ams_access_token',
  authRefreshTokenKey: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY ?? 'ams_refresh_token',

  featureDarkMode:    import.meta.env.VITE_FEATURE_DARK_MODE    !== 'false',
  featureNotifications: import.meta.env.VITE_FEATURE_NOTIFICATIONS !== 'false',

  isDev:  import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;

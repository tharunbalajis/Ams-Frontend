# Auth Module

## Responsibilities

- User authentication (login, logout)
- Session management and token persistence
- Current user identity resolution
- Password reset flow (forgot password + reset password)
- Auth context hydration via `useCurrentUser`

## Owned Features

| Feature | Page | Component | Hook |
|---------|------|-----------|------|
| Login | `LoginPage` | `LoginForm`, `AuthCard` | `useLogin` |
| Logout | — | — | `useLogout` |
| Forgot Password | `ForgotPasswordPage` | `ForgotPasswordForm`, `AuthCard` | `useForgotPassword` |
| Reset Password | `ResetPasswordPage` | `ResetPasswordForm`, `AuthCard` | `useResetPassword` |
| Session Hydration | — | — | `useCurrentUser` |

## Auth Routes

```
/login            → LoginPage
/forgot-password  → ForgotPasswordPage
/reset-password   → ResetPasswordPage
```

## Module Structure

```
auth/
├── api/
│   ├── login.api.ts           Typed login endpoint
│   ├── logout.api.ts          Typed logout endpoint
│   ├── forgotPassword.api.ts  Typed forgot-password endpoint
│   ├── resetPassword.api.ts   Typed reset-password endpoint
│   └── currentUser.api.ts     Typed /auth/me endpoint
├── hooks/
│   ├── useLogin.ts            useMutation → sets context + tokens
│   ├── useLogout.ts           useMutation → clears context + redirects
│   ├── useCurrentUser.ts      useQuery → hydrates AuthProvider
│   ├── useForgotPassword.ts   useMutation → sends reset email
│   └── useResetPassword.ts    useMutation → sets new password
├── schemas/
│   ├── login.schema.ts        z.object({email, password})
│   ├── forgotPassword.schema.ts z.object({email})
│   └── resetPassword.schema.ts  z.object({token, password, confirmPassword})
├── pages/
│   ├── LoginPage.tsx
│   ├── ForgotPasswordPage.tsx
│   └── ResetPasswordPage.tsx
├── components/
│   ├── AuthCard/              Branded card wrapper for all auth pages
│   ├── LoginForm/
│   ├── ForgotPasswordForm/
│   └── ResetPasswordForm/
├── types/
│   ├── auth.types.ts          ForgotPasswordPayload, ResetPasswordPayload
│   ├── login.types.ts         LoginPayload, LoginResponse
│   └── session.types.ts       SessionState, SessionStorage
└── constants/
    ├── auth.constants.ts      TOKEN_KEY, AUTH_ERROR_MESSAGES, timeouts
    └── auth.routes.ts         AUTH_ROUTES
```

## Allowed Imports

```
@ams/ui
@ams/schemas
@ams/api-types
@/api/auth.api
@/config/routes
@/hooks/useAuth
@/hooks/useSession
@/lib
@/types/auth.types
@/constants/query.constants
react-router-dom
react-hook-form
@hookform/resolvers/zod
zod
```

## Forbidden Imports

Any other AMS module — `@modules/dashboard`, `@modules/residents`, `@modules/units`, etc.

## Public Exports

See `index.ts`. The public surface exposes only:
- **Pages** (for router registration)
- **Session hooks** (`useCurrentUser`, `useLogout`)
- **Types** (`LoginPayload`, `SessionState`, `AuthUser`, etc.)
- **Constants** (`AUTH_ROUTES`, `AUTH_ERROR_MESSAGES`)

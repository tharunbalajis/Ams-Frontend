import { Outlet } from 'react-router-dom';

// AuthLayout — centered card layout for login / auth pages
// Implement branding and background in Phase 2

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

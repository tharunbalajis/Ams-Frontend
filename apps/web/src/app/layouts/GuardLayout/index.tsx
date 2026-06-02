import { Outlet } from 'react-router-dom';

// GuardLayout — wrapper for role/permission guarded route groups
// Implement permission checks in Phase 2

export function GuardLayout() {
  return <Outlet />;
}

export default GuardLayout;

import { Outlet } from 'react-router-dom';

// ResidentLayout — layout variant for resident-facing views
// Implement in Phase 2

export function ResidentLayout() {
  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ResidentLayout;

import { Outlet } from 'react-router-dom';

// DashboardLayout — placeholder shell
// Implement Sidebar, Topbar, and content area in Phase 2

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar — Phase 2 */}
      <aside className="w-64 border-r bg-sidebar" />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar — Phase 2 */}
        <header className="h-14 border-b bg-card" />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

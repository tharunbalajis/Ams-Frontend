// NotFound — 404 page with navigation back home
// Implement in Phase 2

const NotFound = () => (
  <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
    <p className="text-4xl font-bold text-muted-foreground">404</p>
    <p className="text-sm text-muted-foreground">Page not found</p>
  </div>
);
export { NotFound };
export default NotFound;

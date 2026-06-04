import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? (error.data?.message ?? error.statusText)
    : error instanceof Error
    ? error.message
    : 'An unexpected error occurred';

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <span className="text-2xl">⚠️</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="max-w-md text-sm text-gray-500">{message}</p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

import { Link, Outlet, useLocation } from 'react-router-dom';

export function HelpLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    return `block px-4 py-2 rounded-lg transition-colors ${
      isActive(path)
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-secondary hover:bg-gray-100'
    }`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>
      <div className="flex gap-8">
        <aside className="w-64 shrink-0">
          <nav className="flex flex-col gap-2 sticky top-8">
            <Link
              to="/help/continue-setup"
              className={linkClass('/help/continue-setup')}
            >
              Continue Setup
            </Link>
            <Link
              to="/help/copilot-setup"
              className={linkClass('/help/copilot-setup')}
            >
              Copilot Setup
            </Link>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

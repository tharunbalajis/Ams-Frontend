import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Keyboard,
} from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function Topbar({ onMenuClick, sidebarCollapsed }: TopbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showNotifications, setShowNotifications] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      {/* Left: Menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Breadcrumb (simplified) */}
        <div className="hidden items-center gap-2 text-sm md:flex">
          <span className="text-gray-500">AMS</span>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">Dashboard</span>
        </div>
      </div>

      {/* Center: Society Selector */}
      <button className="hidden items-center gap-2 rounded-full border bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 md:flex">
        <span>Green Valley Apartments</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Right: Search + Notifications + Theme + User */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
              <Keyboard className="hidden h-3 w-3 text-gray-400 lg:inline" />
              <span className="hidden rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 lg:inline">
                ⌘K
              </span>
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg">
              <div className="border-b p-3">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="p-4 text-center text-sm text-gray-500">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-600" />
          ) : (
            <Sun className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* User */}
        <button className="flex items-center gap-2 rounded-lg hover:bg-gray-50 p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
            {user ? getInitials(user.full_name || 'U') : 'U'}
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium">{user?.full_name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-gray-400 lg:block" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState, useRef } from 'react';
import { logoutService } from '../../service/Service';
import NotificationOverlay from '../overlays/NotificationOverlay';
import SettingsDrawer from '../drawers/SettingsDrawer';
import ProfileDrawer from '../drawers/ProfileDrawer';
import AnalyticsDrawer from '../drawers/AnalyticsDrawer';
import { useNotifications } from '../../common/NotificationProvider';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ sidebarOpen, toggleSidebar }: HeaderProps) {
  const { user, setUser } = useAuth();
  const { unreadCount } = useNotifications();

  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifBtnRef = useRef<HTMLButtonElement>(null);

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const username =
    user && 'firstName' in user && 'otherName' in user
      ? `${(user as any).firstName} ${(user as any).otherName}`
      : localStorage.getItem('username') || 'Guest';

  return (
    <div className="relative">
      <header className="bg-blue-600 text-white p-4 shadow-md flex flex-wrap justify-between items-center gap-y-2 z-20 relative">
        {/* Left: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={toggleSidebar} aria-label="Toggle sidebar">
            {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <div className="text-lg font-bold tracking-wide">Justine Bank</div>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <>
              {/* Notifications */}
              <button
                ref={notifBtnRef}
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative focus:outline-none"
              >
                <BellIcon className="h-6 w-6 hover:text-yellow-300 transition" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* NotificationOverlay Popover */}
              <NotificationOverlay open={showNotifications} setOpen={setShowNotifications} />

              {/* Analytics */}
              <button title="Analytics" onClick={() => setShowAnalytics(true)}>
                <ChartBarIcon className="h-6 w-6 hover:text-yellow-300 transition" />
              </button>

              {/* Settings */}
              <button title="Settings" onClick={() => setShowSettings(true)}>
                <Cog6ToothIcon className="h-6 w-6 hover:text-green-300 transition" />
              </button>

              {/* Profile */}
              <button title="Profile" onClick={() => setShowProfile(true)}>
                <UserCircleIcon className="h-6 w-6 hover:text-indigo-300 transition" />
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="hover:bg-red-700 bg-red-500 p-1 rounded transition duration-200"
                title="Logout"
              >
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-white" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline text-white font-semibold">
                Login
              </Link>
              <Link to="/signup" className="hover:underline text-white font-semibold">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* User Welcome */}
        {user && (
          <div className="w-full text-sm font-semibold text-white text-right md:text-left">
            Welcome, {username}
          </div>
        )}
      </header>

      {/* Other Drawers */}
      <SettingsDrawer isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <ProfileDrawer isOpen={showProfile} onClose={() => setShowProfile(false)} />
      <AnalyticsDrawer isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />
    </div>
  );
}

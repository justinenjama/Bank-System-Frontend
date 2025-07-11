import { useEffect, useRef } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../common/NotificationProvider';

interface NotificationOverlayProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (seconds < 60) return rtf.format(-seconds, 'second');
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  const days = Math.floor(hours / 24);
  return rtf.format(-days, 'day');
};

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ open, setOpen }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Click-outside-to-close effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  // If not open, render nothing
  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={`
        absolute right-4 top-16 sm:right-6 w-80 max-w-[95vw]
        bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50
        transform transition-all duration-300 ease-out animate-fade-slide-in
      `}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Notifications</span>
          <button
            onClick={async () => {
              await markAllAsRead();
              setOpen(false);
            }}
            className="text-xs text-blue-600 hover:underline"
          >
            Mark all as read
          </button>
        </div>

        <ul className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <li className="text-gray-500 text-sm">No notifications</li>
          ) : (
            notifications.slice(0, 5).map((n) => (
              <li
                key={`${n.id}-${n.createdAt}`}
                className={`p-3 rounded flex justify-between items-start gap-2 ${
                  !n.read ? 'bg-yellow-100' : 'bg-gray-100'
                }`}
              >
                <div>
                  <div className="text-sm text-gray-800">{n.message}</div>
                  <div className="text-xs text-gray-500">{getRelativeTime(n.createdAt)}</div>
                </div>
                {!n.read && (
                  <button
                    title="Mark as read"
                    onClick={() => markAsRead(n.id)}
                    className="text-blue-500 hover:text-green-600"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))
          )}
        </ul>

        <div className="mt-3 text-center">
          <Link
            to="/notifications"
            className="text-blue-600 text-sm hover:underline"
            onClick={() => setOpen(false)}
          >
            View all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationOverlay;

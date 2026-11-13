import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem, NotificationType } from '../types/notifications';
import { buildNotification } from '../services/notificationTemplates';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toast: NotificationItem | null;
  dismissToast: () => void;
  sendNotification: (
    type: NotificationType,
    params?: Record<string, string>,
    overrides?: Partial<NotificationItem>
  ) => NotificationItem;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'celpin_notifications_v1';

const INITIAL_SAMPLES: NotificationItem[] = [
  {
    id: 'sample-1',
    type: 'booking_confirmed',
    category: 'booking',
    title: 'Booking confirmed',
    message: 'Your booking at Celpin Workspace — Indiranagar Desk A4 is confirmed for Today at 10:00 AM. View your booking details.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    read: false,
    spaceName: 'Celpin Workspace — Indiranagar Desk A4',
    actionLabel: 'View Booking',
    actionTarget: 'booking'
  },
  {
    id: 'sample-2',
    type: 'payment_successful',
    category: 'payment',
    title: 'Payment successful',
    message: 'Your payment of ₹350 for Celpin Workspace — Indiranagar Desk A4 was successful.',
    timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    read: false,
    spaceName: 'Celpin Workspace — Indiranagar Desk A4',
    actionLabel: 'Receipt',
    actionTarget: 'booking'
  },
  {
    id: 'sample-3',
    type: 'access_details_ready',
    category: 'access',
    title: 'Access details ready',
    message: 'Your access instructions for Celpin Workspace — Indiranagar Desk A4 are ready. View them before you arrive.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    spaceName: 'Celpin Workspace — Indiranagar Desk A4',
    actionLabel: 'View Access Pass',
    actionTarget: 'booking'
  },
  {
    id: 'sample-4',
    type: 'saved_space_availability',
    category: 'optional',
    title: 'Saved space availability',
    message: 'Celpin Terrace Executive Suite is available on this Friday. Book it before it’s gone.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: true,
    spaceName: 'Celpin Terrace Executive Suite',
    actionLabel: 'Book Now',
    actionTarget: 'booking'
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load notifications from storage', e);
    }
    return INITIAL_SAMPLES;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<NotificationItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications to storage', e);
    }
  }, [notifications]);

  // Unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  const dismissToast = () => setToast(null);

  const sendNotification = (
    type: NotificationType,
    params?: Record<string, string>,
    overrides?: Partial<NotificationItem>
  ): NotificationItem => {
    const item = buildNotification(type, params, overrides);
    setNotifications(prev => [item, ...prev]);
    setToast(item);
    return item;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isDrawerOpen,
        setIsDrawerOpen,
        toast,
        dismissToast,
        sendNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

import React, { useEffect } from 'react';
import {
  Calendar,
  CreditCard,
  Key,
  LifeBuoy,
  Star,
  X,
  ArrowRight,
  Bell
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationCategory } from '../types/notifications';

interface NotificationToastProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ onNavigate }) => {
  const { toast, dismissToast, setIsDrawerOpen, markAsRead } = useNotifications();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'booking':
        return <Calendar className="h-4 w-4 text-emerald-500" />;
      case 'payment':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'access':
        return <Key className="h-4 w-4 text-amber-500" />;
      case 'support':
        return <LifeBuoy className="h-4 w-4 text-rose-500" />;
      case 'optional':
        return <Star className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const handleAction = () => {
    markAsRead(toast.id);
    dismissToast();
    if (toast.actionTarget && onNavigate) {
      onNavigate(toast.actionTarget);
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="relative rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-primary/20">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent border border-border/60">
            {getCategoryIcon(toast.category)}
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {toast.category}
              </span>
              <span className="text-[11px] text-muted-foreground">• Just now</span>
            </div>
            <h4 className="text-sm font-bold text-foreground leading-snug">
              {toast.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {toast.message}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleAction}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {toast.actionLabel || 'View Details'}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  dismissToast();
                  setIsDrawerOpen(true);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                Open Inbox
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={dismissToast}
            className="absolute top-3.5 right-3.5 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

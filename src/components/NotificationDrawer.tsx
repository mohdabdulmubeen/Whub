import React, { useState } from 'react';
import {
  X,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  CreditCard,
  Key,
  Clock,
  AlertCircle,
  AlertTriangle,
  LifeBuoy,
  Star,
  BookmarkCheck,
  Bell,
  Sparkles,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import {
  NOTIFICATION_TEMPLATES,
  NOTIFICATION_CATEGORIES
} from '../services/notificationTemplates';
import { NotificationCategory, NotificationType, NotificationItem } from '../types/notifications';

interface NotificationDrawerProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onNavigate }) => {
  const {
    notifications,
    unreadCount,
    isDrawerOpen,
    setIsDrawerOpen,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    sendNotification
  } = useNotifications();

  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatorType, setSimulatorType] = useState<NotificationType>('booking_confirmed');

  if (!isDrawerOpen) return null;

  const filteredNotifications = notifications.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'booking_confirmed':
        return <Check className="h-4 w-4 text-emerald-500" />;
      case 'booking_reminder':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'booking_updated':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'booking_cancelled':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case 'refund_initiated':
      case 'refund_completed':
        return <CreditCard className="h-4 w-4 text-teal-500" />;
      case 'payment_successful':
        return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case 'payment_failed':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case 'payment_due':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'checkin_available':
      case 'access_details_ready':
        return <Key className="h-4 w-4 text-sky-500" />;
      case 'booking_starts_soon':
      case 'booking_ending_soon':
      case 'checkout_reminder':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'space_unavailable':
      case 'booking_issue':
        return <AlertTriangle className="h-4 w-4 text-rose-500" />;
      case 'host_update':
      case 'support_reply':
        return <LifeBuoy className="h-4 w-4 text-indigo-500" />;
      case 'saved_space_availability':
        return <BookmarkCheck className="h-4 w-4 text-purple-500" />;
      case 'booking_review_request':
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  const handleActionClick = (item: NotificationItem) => {
    markAsRead(item.id);
    if (item.actionTarget && onNavigate) {
      setIsDrawerOpen(false);
      onNavigate(item.actionTarget, item.params);
    }
  };

  const handleSimulate = () => {
    sendNotification(simulatorType);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background border-l border-border/80 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border/70 flex items-center justify-between gap-3 bg-card/50">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-foreground leading-none">
                  Notifications
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent text-xs font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  title="Clear all notifications"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-1"
                aria-label="Close notifications panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Interactive Simulator / Template Tester Tool */}
          <div className="border-b border-border/70 bg-primary/5 px-4 py-2.5">
            <button
              type="button"
              onClick={() => setShowSimulator(!showSimulator)}
              className="w-full flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Notification Tester &amp; Template Simulator
              </span>
              {showSimulator ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showSimulator && (
              <div className="mt-3 pt-3 border-t border-primary/10 space-y-2.5 animate-in fade-in duration-150">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Trigger and preview any of the official notification templates:
                </p>
                <div className="flex gap-2">
                  <select
                    value={simulatorType}
                    onChange={e => setSimulatorType(e.target.value as NotificationType)}
                    className="flex-1 bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <optgroup label="1. Booking Notifications">
                      <option value="booking_confirmed">Booking confirmed</option>
                      <option value="booking_reminder">Booking reminder</option>
                      <option value="booking_updated">Booking updated</option>
                      <option value="booking_cancelled">Booking cancelled</option>
                      <option value="refund_initiated">Refund initiated</option>
                      <option value="refund_completed">Refund completed</option>
                    </optgroup>
                    <optgroup label="2. Payment Notifications">
                      <option value="payment_successful">Payment successful</option>
                      <option value="payment_failed">Payment failed</option>
                      <option value="payment_due">Payment due</option>
                    </optgroup>
                    <optgroup label="3. Arrival and Access Notifications">
                      <option value="checkin_available">Check-in available</option>
                      <option value="access_details_ready">Access details ready</option>
                      <option value="booking_starts_soon">Booking starts soon</option>
                      <option value="booking_ending_soon">Booking ending soon</option>
                      <option value="checkout_reminder">Check-out reminder</option>
                    </optgroup>
                    <optgroup label="4. Changes and Support">
                      <option value="space_unavailable">Space unavailable</option>
                      <option value="booking_issue">Booking issue</option>
                      <option value="host_update">Host or venue update</option>
                      <option value="support_reply">Support reply</option>
                    </optgroup>
                    <optgroup label="5. Optional Notifications">
                      <option value="saved_space_availability">Saved space availability</option>
                      <option value="booking_review_request">Booking review request</option>
                    </optgroup>
                  </select>

                  <button
                    type="button"
                    onClick={handleSimulate}
                    className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    <Send className="h-3 w-3" />
                    Simulate
                  </button>
                </div>

                <div className="p-2 rounded-lg bg-background/80 border border-border/60 text-[11px] text-muted-foreground italic">
                  &ldquo;{NOTIFICATION_TEMPLATES[simulatorType].template}&rdquo;
                </div>
              </div>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="px-4 py-2 border-b border-border/70 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-card/30">
            {NOTIFICATION_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all'
                ? notifications.length
                : notifications.filter(n => n.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted-foreground/15 text-muted-foreground'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="py-16 text-center">
                <div className="h-12 w-12 rounded-2xl bg-muted/60 text-muted-foreground mx-auto flex items-center justify-center mb-3">
                  <Bell className="h-6 w-6 opacity-40" />
                </div>
                <h4 className="font-semibold text-sm text-foreground">No notifications</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  {selectedCategory === 'all'
                    ? 'You have cleared all notifications.'
                    : `No notifications under ${selectedCategory}.`}
                </p>
                <button
                  type="button"
                  onClick={() => sendNotification('booking_confirmed')}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate sample notification
                </button>
              </div>
            ) : (
              filteredNotifications.map(item => (
                <div
                  key={item.id}
                  className={`relative group rounded-2xl border p-4 transition-all duration-200 ${
                    item.read
                      ? 'bg-card/40 border-border/60 hover:border-border hover:bg-card/70'
                      : 'bg-card border-primary/30 ring-1 ring-primary/20 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent border border-border/60 mt-0.5">
                      {getNotificationIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {item.category}
                          </span>
                          {!item.read && (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {formatTimeAgo(item.timestamp)}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {item.message}
                      </p>

                      {/* Footer Actions */}
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/50">
                        {item.actionLabel ? (
                          <button
                            type="button"
                            onClick={() => handleActionClick(item)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                          >
                            <span>{item.actionLabel}</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        ) : <div />}

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          {!item.read && (
                            <button
                              type="button"
                              onClick={() => markAsRead(item.id)}
                              title="Mark as read"
                              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent text-[11px] inline-flex items-center gap-0.5"
                            >
                              <Check className="h-3 w-3" />
                              <span>Read</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeNotification(item.id)}
                            title="Delete"
                            className="p-1 rounded-md text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

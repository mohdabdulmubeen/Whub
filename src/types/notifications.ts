export type NotificationCategory = 'booking' | 'payment' | 'access' | 'support' | 'optional';

export type NotificationType =
  // Booking
  | 'booking_confirmed'
  | 'booking_reminder'
  | 'booking_updated'
  | 'booking_cancelled'
  | 'refund_initiated'
  | 'refund_completed'
  // Payment
  | 'payment_successful'
  | 'payment_failed'
  | 'payment_due'
  // Arrival & Access
  | 'checkin_available'
  | 'access_details_ready'
  | 'booking_starts_soon'
  | 'booking_ending_soon'
  | 'checkout_reminder'
  // Changes & Support
  | 'space_unavailable'
  | 'booking_issue'
  | 'host_update'
  | 'support_reply'
  // Optional
  | 'saved_space_availability'
  | 'booking_review_request';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  spaceName?: string;
  actionLabel?: string;
  actionTarget?: string;
  params?: Record<string, string>;
}

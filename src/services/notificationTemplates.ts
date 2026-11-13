import { NotificationCategory, NotificationType, NotificationItem } from '../types/notifications';

export interface NotificationTemplateDef {
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  template: string;
  defaultActionLabel?: string;
  defaultActionTarget?: string;
  defaultParams: Record<string, string>;
}

export const NOTIFICATION_TEMPLATES: Record<NotificationType, NotificationTemplateDef> = {
  // Booking notifications
  booking_confirmed: {
    type: 'booking_confirmed',
    category: 'booking',
    title: 'Booking confirmed',
    template: 'Your booking at [Space Name] is confirmed for [Date] at [Time]. View your booking details.',
    defaultActionLabel: 'View Booking',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Workspace — Indiranagar Desk A4',
      'Date': 'Today',
      'Time': '10:00 AM'
    }
  },
  booking_reminder: {
    type: 'booking_reminder',
    category: 'booking',
    title: 'Booking reminder',
    template: 'Your booking at [Space Name] starts in [Time Until Start]. Check your arrival and access details.',
    defaultActionLabel: 'Check Access',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Workspace — Indiranagar Desk A4',
      'Time Until Start': '30 minutes'
    }
  },
  booking_updated: {
    type: 'booking_updated',
    category: 'booking',
    title: 'Booking updated',
    template: 'Your booking at [Space Name] has been updated. Review the new details.',
    defaultActionLabel: 'Review Details',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Quiet Pod #2'
    }
  },
  booking_cancelled: {
    type: 'booking_cancelled',
    category: 'booking',
    title: 'Booking cancelled',
    template: 'Your booking at [Space Name] for [Date] has been cancelled.',
    defaultActionLabel: 'Book New Space',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Team Studio 3',
      'Date': 'Tomorrow'
    }
  },
  refund_initiated: {
    type: 'refund_initiated',
    category: 'booking',
    title: 'Refund initiated',
    template: 'Your refund of [Amount] for [Space Name] is on its way. It may take [Processing Time] to appear.',
    defaultActionLabel: 'View Booking',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Amount': '₹540',
      'Space Name': 'Celpin Team Studio 3',
      'Processing Time': '3-5 business days'
    }
  },
  refund_completed: {
    type: 'refund_completed',
    category: 'booking',
    title: 'Refund completed',
    template: 'Your refund of [Amount] has been processed.',
    defaultActionLabel: 'View Booking',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Amount': '₹540'
    }
  },

  // Payment notifications
  payment_successful: {
    type: 'payment_successful',
    category: 'payment',
    title: 'Payment successful',
    template: 'Your payment of [Amount] for [Space Name] was successful.',
    defaultActionLabel: 'Receipt',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Amount': '₹350',
      'Space Name': 'Celpin Window Desk W-12'
    }
  },
  payment_failed: {
    type: 'payment_failed',
    category: 'payment',
    title: 'Payment failed',
    template: 'We couldn’t process your payment for [Space Name]. Please update your payment method to keep your booking.',
    defaultActionLabel: 'Update Payment',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Premium Boardroom'
    }
  },
  payment_due: {
    type: 'payment_due',
    category: 'payment',
    title: 'Payment due',
    template: 'Payment for your booking at [Space Name] is due by [Due Date and Time].',
    defaultActionLabel: 'Pay Now',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Dedicated Desk D-08',
      'Due Date and Time': 'Today at 6:00 PM'
    }
  },

  // Arrival and access notifications
  checkin_available: {
    type: 'checkin_available',
    category: 'access',
    title: 'Check-in available',
    template: 'You can now check in to [Space Name]. Open your booking for directions and access instructions.',
    defaultActionLabel: 'Check In',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Cafe & Cowork Koramangala'
    }
  },
  access_details_ready: {
    type: 'access_details_ready',
    category: 'access',
    title: 'Access details ready',
    template: 'Your access instructions for [Space Name] are ready. View them before you arrive.',
    defaultActionLabel: 'View Access Pass',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Studio Indiranagar'
    }
  },
  booking_starts_soon: {
    type: 'booking_starts_soon',
    category: 'access',
    title: 'Booking starts soon',
    template: 'Your time at [Space Name] starts soon. Need more time? Check whether an extension is available.',
    defaultActionLabel: 'Extend Time',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Focus Booth 4'
    }
  },
  booking_ending_soon: {
    type: 'booking_ending_soon',
    category: 'access',
    title: 'Booking ending soon',
    template: 'Your booking at [Space Name] ends in [Time Until End].',
    defaultActionLabel: 'Extend or Finish',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Focus Booth 4',
      'Time Until End': '15 minutes'
    }
  },
  checkout_reminder: {
    type: 'checkout_reminder',
    category: 'access',
    title: 'Check-out reminder',
    template: 'Your booking has ended. Please check out and leave the space as you found it.',
    defaultActionLabel: 'Confirm Checkout',
    defaultActionTarget: 'booking',
    defaultParams: {}
  },

  // Changes and support
  space_unavailable: {
    type: 'space_unavailable',
    category: 'support',
    title: 'Space unavailable',
    template: '[Space Name] is no longer available for your booking. Choose another space or contact support for help.',
    defaultActionLabel: 'Choose Another Space',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Conference Hall A'
    }
  },
  booking_issue: {
    type: 'booking_issue',
    category: 'support',
    title: 'Booking issue',
    template: 'There’s an issue with your booking at [Space Name]. Open your booking for details and next steps.',
    defaultActionLabel: 'View Details',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Private Suite 1'
    }
  },
  host_update: {
    type: 'host_update',
    category: 'support',
    title: 'Host or venue update',
    template: 'There’s an update from [Space Name] about your upcoming booking. View the details.',
    defaultActionLabel: 'View Update',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Coworking Indiranagar'
    }
  },
  support_reply: {
    type: 'support_reply',
    category: 'support',
    title: 'Support reply',
    template: 'You have a new reply about your booking at [Space Name].',
    defaultActionLabel: 'Read Reply',
    defaultActionTarget: 'home',
    defaultParams: {
      'Space Name': 'Celpin Pod #7'
    }
  },

  // Optional notifications
  saved_space_availability: {
    type: 'saved_space_availability',
    category: 'optional',
    title: 'Saved space availability',
    template: '[Space Name] is available on [Date]. Book it before it’s gone.',
    defaultActionLabel: 'Book Now',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Terrace Executive Suite',
      'Date': 'this Friday'
    }
  },
  booking_review_request: {
    type: 'booking_review_request',
    category: 'optional',
    title: 'Booking review request',
    template: 'How was your experience at [Space Name]? Leave a quick review.',
    defaultActionLabel: 'Leave Review',
    defaultActionTarget: 'booking',
    defaultParams: {
      'Space Name': 'Celpin Quiet Pod #2'
    }
  }
};

/**
 * Replaces [Placeholder] or {placeholder} tokens in the notification template.
 */
export function formatNotificationMessage(template: string, params: Record<string, string>): string {
  let message = template;
  for (const [key, value] of Object.entries(params)) {
    // Replace [Key]
    message = message.split(`[${key}]`).join(value);
    // Replace {key} or {Key}
    message = message.split(`{${key}}`).join(value);
  }
  return message;
}

/**
 * Builds a NotificationItem from a type and optional param overrides.
 */
export function buildNotification(
  type: NotificationType,
  customParams?: Record<string, string>,
  overrides?: Partial<NotificationItem>
): NotificationItem {
  const def = NOTIFICATION_TEMPLATES[type];
  const mergedParams = {
    ...def.defaultParams,
    ...(customParams || {})
  };

  const message = formatNotificationMessage(def.template, mergedParams);

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: def.type,
    category: def.category,
    title: def.title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
    spaceName: mergedParams['Space Name'] || mergedParams['spaceName'],
    actionLabel: def.defaultActionLabel,
    actionTarget: def.defaultActionTarget,
    params: mergedParams,
    ...overrides
  };
}

/**
 * Categories configuration for UI tabs and badges.
 */
export const NOTIFICATION_CATEGORIES: {
  id: NotificationCategory | 'all';
  label: string;
}[] = [
  { id: 'all', label: 'All' },
  { id: 'booking', label: 'Booking' },
  { id: 'payment', label: 'Payment' },
  { id: 'access', label: 'Arrival & Access' },
  { id: 'support', label: 'Support & Changes' },
  { id: 'optional', label: 'Optional' }
];

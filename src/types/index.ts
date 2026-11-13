export type WorkspaceZone = 'quiet' | 'collaboration' | 'window' | 'premium';
export type BookingDurationType = 'hourly' | 'alternate' | 'weekly' | 'monthly' | 'custom';

export interface DateItem {
  date: string;
  dayName: string;
  isWeekend: boolean;
  isHoliday?: boolean;
  holidayName?: string;
}

export interface Seat {
  id: string;
  name: string;
  zone: WorkspaceZone;
  status: 'available' | 'occupied' | 'reserved';
  hourlyRate: number;
  coordinates: { x: number; y: number };
  amenities: string[];
  description: string;
}

export interface ZoneInfo {
  id: WorkspaceZone;
  name: string;
  hourlyRate: number;
  description: string;
  icon: string;
  colorClass: string;
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'tea' | 'snacks' | 'meals' | 'desserts';
  price: number;
  description: string;
  isPopular?: boolean;
  icon: string;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  seatId: string;
  zone: string;
  bookingType: BookingDurationType;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  durationHours: number;
  dates?: string[];
  recurrenceDays?: string[];
  termUnit?: string;
  termCount?: number;
  daysCount?: number;
  preferences: string[];
  seatCost: number;
  foodCost: number;
  discount: number;
  totalCost: number;
  dailyCapApplied: boolean;
  itemizedBreakdown?: any;
  orderItems: { itemId: string; name: string; price: number; quantity: number }[];
  pin: string;
  qrCodeUrl: string;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  cancellationReason?: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PricingQuote {
  bookingType: BookingDurationType;
  zone: string;
  hourlyRate: number;
  dailyRate: number;
  durationHours: number;
  daysCount: number;
  dates: string[];
  dateItems: DateItem[];
  rawSeatCost: number;
  seatCost: number;
  discount: number;
  discountLabel: string;
  dailyCapApplied: boolean;
  foodCost: number;
  taxes: number;
  totalCost: number;
  summaryText: string;
}

export interface AvailabilityResult {
  available: boolean;
  requestedDatesCount: number;
  availableDatesCount: number;
  conflicts: { date: string; bookingRef: string; reason: string }[];
  dateAvailability: Record<string, boolean>;
  dateItems?: DateItem[];
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | string;
  summary: string;
  description?: string;
  requirements?: string[];
  postedDate?: string;
}

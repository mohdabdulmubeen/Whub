export type WorkspaceZone = 'quiet' | 'collaboration' | 'window' | 'premium';

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
  durationHours: number;
  preferences: string[];
  seatCost: number;
  foodCost: number;
  discount: number;
  totalCost: number;
  dailyCapApplied: boolean;
  orderItems: { itemId: string; name: string; price: number; quantity: number }[];
  pin: string;
  qrCodeUrl: string;
  status: 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

export interface UserProfile {
  credits: number;
  hoursBooked: number;
  totalSaved: number;
  freeCoffeesReady: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  lifetimePoints: number;
  nextTierPoints: number;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  icon: string;
}

export interface ActivityLog {
  id: string;
  type: 'earned' | 'redeemed' | 'bonus';
  title: string;
  credits: number;
  description: string;
  date: string;
}

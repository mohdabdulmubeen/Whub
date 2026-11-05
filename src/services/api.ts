import { Seat, ZoneInfo, MenuItem, Booking, UserProfile, RewardItem, ActivityLog } from '../types';

const API_BASE = '/api';

export const api = {
  async getSeats(): Promise<{ zones: Record<string, ZoneInfo>; seats: Seat[]; stats: { total: number; available: number; occupied: number; reserved: number } }> {
    try {
      const res = await fetch(`${API_BASE}/seats`);
      if (!res.ok) throw new Error('Failed to fetch seats');
      return await res.json();
    } catch {
      // Fallback local data if backend server is not running
      return {
        zones: {
          quiet: { id: 'quiet', name: 'Quiet Zone', hourlyRate: 99, description: 'Silent, focused work with noise-dampening panels and ergonomic seating.', icon: 'headphones', colorClass: 'chart-2', features: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'] },
          collaboration: { id: 'collaboration', name: 'Collaboration Table', hourlyRate: 129, description: 'Open shared table ideal for team brainstorming and pair work.', icon: 'users', colorClass: 'chart-4', features: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'] },
          window: { id: 'window', name: 'Window Seat', hourlyRate: 149, description: 'Bright natural light with a view — perfect for creative flow.', icon: 'sun', colorClass: 'chart-3', features: ['Natural light', 'City view', 'Power socket', 'Cozy corner'] },
          premium: { id: 'premium', name: 'Premium Desk', hourlyRate: 199, description: 'Private desk with adjustable standing option and premium amenities.', icon: 'crown', colorClass: 'chart-1', features: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'] }
        },
        seats: [
          { id: 'Q1', name: 'Q1', zone: 'quiet', status: 'available', hourlyRate: 99, coordinates: { x: 15, y: 20 }, amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'], description: 'Corner quiet desk with optimal acoustic dampening.' },
          { id: 'Q2', name: 'Q2', zone: 'quiet', status: 'occupied', hourlyRate: 99, coordinates: { x: 15, y: 40 }, amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'], description: 'Central quiet desk with high partition screens.' },
          { id: 'Q3', name: 'Q3', zone: 'quiet', status: 'available', hourlyRate: 99, coordinates: { x: 15, y: 60 }, amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'], description: 'Quiet desk positioned near library bookshelves.' },
          { id: 'Q4', name: 'Q4', zone: 'quiet', status: 'available', hourlyRate: 99, coordinates: { x: 15, y: 80 }, amenities: ['Noise-dampening', 'Ergonomic chair', 'Power socket', 'Reading lamp'], description: 'Quiet desk with extra wide surface area.' },
          { id: 'C1', name: 'C1', zone: 'collaboration', status: 'available', hourlyRate: 129, coordinates: { x: 42, y: 25 }, amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'], description: 'North-facing collaboration seat with whiteboard view.' },
          { id: 'C2', name: 'C2', zone: 'collaboration', status: 'available', hourlyRate: 129, coordinates: { x: 52, y: 25 }, amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'], description: 'Collaboration bench seat beside digital screen.' },
          { id: 'C3', name: 'C3', zone: 'collaboration', status: 'occupied', hourlyRate: 129, coordinates: { x: 42, y: 42 }, amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'], description: 'South-facing shared desk for pair work.' },
          { id: 'C4', name: 'C4', zone: 'collaboration', status: 'available', hourlyRate: 129, coordinates: { x: 52, y: 42 }, amenities: ['Shared table', 'Whiteboard access', 'Power sockets', 'Group-friendly'], description: 'Collaboration table end seat.' },
          { id: 'W1', name: 'W1', zone: 'window', status: 'available', hourlyRate: 149, coordinates: { x: 80, y: 18 }, amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'], description: 'Top window bay seat overlooking boulevard.' },
          { id: 'W2', name: 'W2', zone: 'window', status: 'reserved', hourlyRate: 149, coordinates: { x: 80, y: 38 }, amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'], description: 'Panoramic window seat for sketching.' },
          { id: 'W3', name: 'W3', zone: 'window', status: 'available', hourlyRate: 149, coordinates: { x: 80, y: 58 }, amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'], description: 'Sunlit desk with cushioned armrest.' },
          { id: 'W4', name: 'W4', zone: 'window', status: 'available', hourlyRate: 149, coordinates: { x: 80, y: 78 }, amenities: ['Natural light', 'City view', 'Power socket', 'Cozy corner'], description: 'Lower window lounge desk.' },
          { id: 'P1', name: 'P1', zone: 'premium', status: 'available', hourlyRate: 199, coordinates: { x: 38, y: 72 }, amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'], description: 'Electric motorized standing desk with Herman Miller chair.' },
          { id: 'P2', name: 'P2', zone: 'premium', status: 'occupied', hourlyRate: 199, coordinates: { x: 50, y: 72 }, amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'], description: 'Executive motorized desk with external display.' },
          { id: 'P3', name: 'P3', zone: 'premium', status: 'available', hourlyRate: 199, coordinates: { x: 62, y: 72 }, amenities: ['Standing desk', 'Privacy screen', 'Dual monitor mount', 'Premium chair'], description: 'Spacious ergonomic standing desk.' }
        ],
        stats: { total: 15, available: 11, occupied: 3, reserved: 1 }
      };
    }
  },

  async getMenu(category = 'all'): Promise<{ items: MenuItem[]; popular: MenuItem[]; categories: string[] }> {
    try {
      const res = await fetch(`${API_BASE}/cafe/menu?category=${category}`);
      if (!res.ok) throw new Error('Failed to fetch menu');
      return await res.json();
    } catch {
      const all: MenuItem[] = [
        { id: 'cappuccino', name: 'Cappuccino', category: 'coffee', price: 120, description: 'Espresso with steamed milk and froth', isPopular: true, icon: 'coffee' },
        { id: 'cold-brew', name: 'Cold Brew', category: 'coffee', price: 150, description: '24-hour steeped, smooth and bold', isPopular: true, icon: 'cup-soda' },
        { id: 'flat-white', name: 'Flat White', category: 'coffee', price: 130, description: 'Double ristretto with microfoam', icon: 'coffee' },
        { id: 'matcha-latte', name: 'Matcha Latte', category: 'tea', price: 160, description: 'Ceremonial grade matcha with oat milk', icon: 'leaf' },
        { id: 'masala-chai', name: 'Masala Chai', category: 'tea', price: 90, description: 'Spiced Indian tea with milk', icon: 'coffee' },
        { id: 'avocado-toast', name: 'Avocado Toast', category: 'snacks', price: 180, description: 'Smashed avocado, chili flakes, sourdough', isPopular: true, icon: 'sandwich' },
        { id: 'blueberry-muffin', name: 'Blueberry Muffin', category: 'snacks', price: 90, description: 'Fresh-baked with wild blueberries', icon: 'cookie' },
        { id: 'energy-bar', name: 'Energy Bar', category: 'snacks', price: 70, description: 'Oats, dates, almonds — no added sugar', icon: 'candy' },
        { id: 'quinoa-bowl', name: 'Quinoa Buddha Bowl', category: 'meals', price: 280, description: 'Quinoa, roasted veggies, tahini dressing', isPopular: true, icon: 'salad' },
        { id: 'chicken-wrap', name: 'Grilled Chicken Wrap', category: 'meals', price: 240, description: 'Chicken, hummus, greens in a whole-wheat wrap', icon: 'sandwich' },
        { id: 'lava-cake', name: 'Chocolate Lava Cake', category: 'desserts', price: 160, description: 'Warm molten center with vanilla ice cream', icon: 'cake' },
        { id: 'tiramisu', name: 'Tiramisu', category: 'desserts', price: 180, description: 'Classic Italian coffee-flavored dessert', icon: 'ice-cream' }
      ];
      return {
        items: category === 'all' ? all : all.filter(i => i.category === category),
        popular: all.filter(i => i.isPopular),
        categories: ['coffee', 'tea', 'snacks', 'meals', 'desserts']
      };
    }
  },

  async createBooking(data: any): Promise<{ booking: Booking }> {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create booking');
      return await res.json();
    } catch {
      const ref = `CEL-${Math.floor(100000 + Math.random() * 900000)}`;
      const pin = `${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        booking: {
          id: `bkg_${Date.now()}`,
          bookingRef: ref,
          seatId: data.seatId,
          zone: data.zone,
          durationHours: data.duration,
          preferences: data.preferences || [],
          seatCost: data.seatCost || 120,
          foodCost: data.foodCost || 0,
          discount: data.discount || 0,
          totalCost: data.totalCost || 120,
          dailyCapApplied: (data.seatCost || 0) >= 399,
          orderItems: data.orderItems || [],
          pin,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=CELPIN-PASS:${ref}:${data.seatId}:${pin}`,
          status: 'confirmed',
          customerName: data.customerName || 'Guest Member',
          customerEmail: data.customerEmail || 'member@celpin.cafe',
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  async getRewards(): Promise<{ profile: UserProfile; rewards: RewardItem[]; tiers: any[]; activity: ActivityLog[] }> {
    try {
      const res = await fetch(`${API_BASE}/rewards`);
      if (!res.ok) throw new Error('Failed to fetch rewards');
      return await res.json();
    } catch {
      return {
        profile: {
          credits: 320,
          hoursBooked: 47,
          totalSaved: 1200,
          freeCoffeesReady: 2,
          currentTier: 'Gold',
          lifetimePoints: 820,
          nextTierPoints: 1000
        },
        rewards: [
          { id: 'free-hour', name: 'Dedicated Focus Session', description: 'Redeem for an extended workspace session', creditCost: 150, icon: 'clock' },
          { id: 'free-cappuccino', name: 'Free Cappuccino', description: 'A fresh cappuccino, on the house', creditCost: 50, icon: 'coffee' },
          { id: 'discount-100', name: 'Priority Pass Upgrade', description: 'Instant upgrade to executive cabin', creditCost: 200, icon: 'gift' },
          { id: 'free-premium-hour', name: 'Executive Suite Access', description: 'Access to our premium ergonomic suite', creditCost: 250, icon: 'crown' }
        ],
        tiers: [
          { name: 'Bronze', pointsRequired: 0, icon: 'star', perks: ['1 credit per booking session', 'Access to all zones'] },
          { name: 'Silver', pointsRequired: 500, icon: 'zap', perks: ['1.5 credits per session', 'Complimentary café upgrades', 'Priority seat notifications'] },
          { name: 'Gold', pointsRequired: 1000, icon: 'crown', perks: ['2 credits per session', 'Priority café perks', 'Complimentary beverage every 10 visits', 'Early access to premium pods'] },
          { name: 'Platinum', pointsRequired: 2500, icon: 'award', perks: ['3 credits per session', 'Priority access across all zones', 'Guaranteed seat reservation', 'Unlimited quiet pod reservations'] }
        ],
        activity: [
          { id: 'act-1', type: 'earned', title: 'Earned credits', credits: 40, description: '3h at Window Seat W3', date: 'Aug 20' },
          { id: 'act-2', type: 'redeemed', title: 'Redeemed reward', credits: -50, description: 'Free Cappuccino', date: 'Aug 18' },
          { id: 'act-3', type: 'earned', title: 'Earned credits', credits: 60, description: '4h at Premium Desk P1', date: 'Aug 15' },
          { id: 'act-4', type: 'bonus', title: 'Bonus credits', credits: 30, description: 'Gold tier bonus', date: 'Aug 12' },
          { id: 'act-5', type: 'earned', title: 'Earned credits', credits: 24, description: '2h at Quiet Zone Q1', date: 'Aug 10' }
        ]
      };
    }
  },

  async redeemReward(rewardId: string): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE}/rewards/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardId })
      });
      return await res.json();
    } catch {
      return { message: 'Reward redeemed successfully!' };
    }
  },

  async getBookings(): Promise<{ bookings: any[] }> {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      if (!res.ok) throw new Error('Failed to fetch bookings');
      return await res.json();
    } catch {
      return { bookings: [] };
    }
  },

  async getApplications(): Promise<{ applications: any[] }> {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      if (!res.ok) throw new Error('Failed to fetch applications');
      return await res.json();
    } catch {
      return { applications: [] };
    }
  },

  async checkInBooking(id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/checkin`, { method: 'POST' });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async updateSeatStatus(seatId: string, status: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/seats/${seatId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  async sendChatMessage(message: string): Promise<{ reply: string }> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!res.ok) throw new Error('Chat failed');
      return await res.json();
    } catch {
      return {
        reply: "Celpin blends flexible co-working with artisanal café comfort! You can choose your preferred zone from the interactive floor map, request desk amenities, and check in instantly with a quick QR scan."
      };
    }
  }
};

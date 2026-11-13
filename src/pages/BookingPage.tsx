import React, { useState, useEffect, useMemo } from 'react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Users,
  Sun,
  Crown,
  ShieldCheck,
  CreditCard,
  Wallet,
  CheckCircle2,
  Lock,
  Clock,
  Repeat,
  CalendarRange,
  CalendarDays,
  Calendar,
  AlertTriangle,
  Info,
  Sparkles,
  Tag,
  ListFilter,
  Eye
} from 'lucide-react';
import { api } from '../services/api';
import {
  Seat,
  MenuItem,
  Booking,
  WorkspaceZone,
  BookingDurationType,
  PricingQuote,
  AvailabilityResult,
  DateItem
} from '../types';
import { LocationSelectorBar, LocationSelection, getCafesForCity, CafeOption } from '../components/LocationSelectorBar';
import { BookingManagementModal } from '../components/BookingManagementModal';
import { CafeInteriorPreviewModal } from '../components/CafeInteriorPreviewModal';
import { useI18n } from '../i18n/I18nContext';
import { useNotifications } from '../context/NotificationContext';
import { SignInRequiredModal } from '../components/SignInRequiredModal';
import { DateRangePicker } from '../components/DateRangePicker';
import { DateRangeCalendar } from '../components/DateRangeCalendar';
import {
  formatDisplayDate,
  formatRangeSummary,
  getDaysDifference,
  addDays,
  getTodayStr
} from '../utils/dateUtils';
import { getCurrentUser, getPendingBooking, clearPendingBooking, savePendingBooking, AuthUser } from '../services/authService';
export type { LocationSelection };

interface BookingPageProps {
  onNavigate: (page: string) => void;
  initialSeatId?: string;
  initialZone?: WorkspaceZone;
  preselectedCart?: Record<string, number>;
  initialLocation?: LocationSelection;
  initialCustomerName?: string;
  initialCustomerEmail?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  onNavigate,
  initialSeatId,
  initialZone = 'quiet',
  preselectedCart,
  initialLocation,
  initialCustomerName,
  initialCustomerEmail
}) => {
  const { t } = useI18n();
  const { sendNotification } = useNotifications();

  // Modal for managing user bookings
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 4K Café Interior Preview Modal
  const [previewModalCafe, setPreviewModalCafe] = useState<CafeOption | null>(null);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [location, setLocation] = useState<LocationSelection>(
    initialLocation || {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      date: todayStr,
      cafe: 'Heritage Café',
      cafeDesk: 'Heritage Café'
    }
  );

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Workspace Selections
  const [selectedZone, setSelectedZone] = useState<WorkspaceZone>(initialZone);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Flexible Booking Duration Type
  const [bookingType, setBookingType] = useState<BookingDurationType>('hourly');

  // Hourly controls
  const [duration, setDuration] = useState<number>(2);
  const [startTime, setStartTime] = useState<string>('09:00');

  // Custom Range controls
  const [customStartDate, setCustomStartDate] = useState<string>(location.date || todayStr);
  const [customEndDate, setCustomEndDate] = useState<string>(
    location.endDate || addDays(location.date || todayStr, 2)
  );

  // Weekly controls
  const [weeklyStartDate, setWeeklyStartDate] = useState<string>(location.date || todayStr);
  const [weeklyEndDate, setWeeklyEndDate] = useState<string>(
    location.endDate || addDays(location.date || todayStr, 6)
  );
  const [weeklyTermCount, setWeeklyTermCount] = useState<number>(1);

  // Monthly controls
  const [monthlyStartDate, setMonthlyStartDate] = useState<string>(location.date || todayStr);
  const [monthlyEndDate, setMonthlyEndDate] = useState<string>(
    location.endDate || addDays(location.date || todayStr, 29)
  );
  const [monthlyTermCount, setMonthlyTermCount] = useState<number>(1);

  // Server Quote & Availability States
  const [serverQuote, setServerQuote] = useState<PricingQuote | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [isVerifyingSchedule, setIsVerifyingSchedule] = useState(false);

  // Work Preferences & Cafe Cart
  const [preferences, setPreferences] = useState<string[]>(['power socket']);
  const [cart, setCart] = useState<Record<string, number>>(preselectedCart || {});

  // Payment & Customer Info
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
  const [customerName, setCustomerName] = useState(() => {
    if (initialCustomerName) return initialCustomerName;
    try {
      const stored = localStorage.getItem('celpin_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name) return u.name;
      }
    } catch {}
    return 'Rahul Verma';
  });
  const [customerEmail, setCustomerEmail] = useState(() => {
    if (initialCustomerEmail) return initialCustomerEmail;
    try {
      const stored = localStorage.getItem('celpin_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.email) return u.email;
      }
    } catch {}
    return 'rahul.verma@example.com';
  });

  const [bookingResult, setBookingResult] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Sync date when LocationSelectorBar changes date
  useEffect(() => {
    if (location.date) {
      setWeeklyStartDate(location.date);
      setMonthlyStartDate(location.date);
      setCustomStartDate(location.date);
      if (location.endDate) {
        setCustomEndDate(location.endDate);
        setWeeklyEndDate(location.endDate);
        setMonthlyEndDate(location.endDate);
      } else {
        setWeeklyEndDate(addDays(location.date, weeklyTermCount * 7 - 1));
        setMonthlyEndDate(addDays(location.date, monthlyTermCount * 30 - 1));
        setCustomEndDate(addDays(location.date, 2));
      }
    }
  }, [location.date, location.endDate]);

  // Check for restored pending booking & authenticated user
  useEffect(() => {
    const pending = getPendingBooking();
    if (pending) {
      if (pending.step) setStep(pending.step as 1 | 2 | 3);
      if (pending.zone) setSelectedZone(pending.zone as WorkspaceZone);
      if (pending.bookingType) setBookingType(pending.bookingType as BookingDurationType);
      if (pending.duration) setDuration(pending.duration);
      if (pending.startTime) setStartTime(pending.startTime);
      if (pending.cart) setCart(pending.cart);
      if (pending.preferences) setPreferences(pending.preferences);
      if (pending.paymentMethod) setPaymentMethod(pending.paymentMethod as "card" | "upi");
      if (pending.location) setLocation(pending.location);
    }

    const u = getCurrentUser();
    if (u) {
      setCustomerName(u.name);
      setCustomerEmail(u.email);
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    api.getSeats().then(data => {
      setSeats(data.seats);
      if (initialSeatId) {
        const found = data.seats.find(s => s.id === initialSeatId);
        if (found && found.status === 'available') {
          setSelectedSeat(found);
          setSelectedZone(found.zone);
          return;
        }
      }
      const defaultSeat =
        data.seats.find(s => s.zone === initialZone && s.status === 'available') ||
        data.seats.find(s => s.status === 'available');
      if (defaultSeat) {
        setSelectedSeat(defaultSeat);
        setSelectedZone(defaultSeat.zone);
      }
    });
    api.getMenu().then(data => setMenuItems(data.items));
  }, [initialSeatId, initialZone]);

  // Construct current schedule parameters for backend quote & availability
  const currentScheduleParams = useMemo(() => {
    let startDate = location.date || todayStr;
    let endDate: string | undefined = undefined;
    let termCount = 1;

    if (bookingType === 'hourly') {
      startDate = location.date || todayStr;
      endDate = startDate;
    } else if (bookingType === 'weekly') {
      startDate = weeklyStartDate;
      endDate = weeklyEndDate;
      termCount = weeklyTermCount;
    } else if (bookingType === 'monthly') {
      startDate = monthlyStartDate;
      endDate = monthlyEndDate;
      termCount = monthlyTermCount;
    } else if (bookingType === 'custom') {
      startDate = customStartDate;
      endDate = customEndDate;
      termCount = Math.max(1, getDaysDifference(customStartDate, customEndDate));
    }

    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find(i => i.id === id);
      return {
        price: item?.price || 0,
        quantity: qty
      };
    });

    return {
      seatId: selectedSeat?.id,
      zone: selectedSeat?.zone || selectedZone,
      bookingType,
      startDate,
      endDate,
      termCount,
      startTime,
      duration,
      orderItems
    };
  }, [
    selectedSeat?.id,
    selectedSeat?.zone,
    selectedZone,
    bookingType,
    location.date,
    todayStr,
    weeklyStartDate,
    weeklyEndDate,
    weeklyTermCount,
    monthlyStartDate,
    monthlyEndDate,
    monthlyTermCount,
    customStartDate,
    customEndDate,
    startTime,
    duration,
    cart,
    menuItems
  ]);

  // Find next available alternative seat in same zone if current seat has conflict
  const alternativeSeat = useMemo(() => {
    if (!selectedSeat) return null;
    return (
      seats.find(s => s.zone === selectedSeat.zone && s.id !== selectedSeat.id && s.status === 'available') ||
      seats.find(s => s.status === 'available' && s.id !== selectedSeat.id) ||
      null
    );
  }, [seats, selectedSeat]);

  // Query server-side quote and live workspace availability whenever schedule or seat changes
  useEffect(() => {
    let isCancelled = false;
    setIsVerifyingSchedule(true);
    setSubmissionError(null);

    api
      .calculateQuote(currentScheduleParams)
      .then(res => {
        if (!isCancelled) {
          setServerQuote(res.quote);
          setAvailability(res.availability || null);
        }
      })
      .catch(err => {
        console.warn('Quote calculation fallback:', err);
      })
      .finally(() => {
        if (!isCancelled) setIsVerifyingSchedule(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [currentScheduleParams]);

  const availablePrefTags = [
    'near power socket',
    'quiet focus',
    'natural light',
    'good for calls',
    'dual screen setup',
    'whiteboard access',
    'comfortable seating',
    'desk lamp'
  ];

  const togglePref = (tag: string) => {
    setPreferences(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const updateCart = (itemId: string, delta: number) => {
    setCart(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Zone rates
  const ZONE_RATES: Record<WorkspaceZone, { hourly: number; daily: number }> = {
    quiet: { hourly: 99, daily: 399 },
    collaboration: { hourly: 129, daily: 499 },
    window: { hourly: 149, daily: 599 },
    premium: { hourly: 199, daily: 799 }
  };

  const activeZone: WorkspaceZone = selectedSeat?.zone || selectedZone;
  const zoneRate = ZONE_RATES[activeZone] || { hourly: 99, daily: 399 };

  const handleZoneSelect = (zoneId: WorkspaceZone) => {
    setSelectedZone(zoneId);
    const seatInZone = seats.find(s => s.zone === zoneId && s.status === 'available');
    if (seatInZone) {
      setSelectedSeat(seatInZone);
    }
  };

  // Fallback calculations if server quote is pending
  const foodCost = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = menuItems.find(i => i.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  }, [cart, menuItems]);

  // Unified, deterministic pricing engine guaranteeing instant reactivity across all fields
  const computedPricing = useMemo(() => {
    let rawSeatCost = 0;
    let seatCost = 0;
    let discount = 0;
    let discountLabel = '';
    let scheduleUnitsLabel = '';
    let basePlanLabel = '';

    if (bookingType === 'hourly') {
      const hourlyRate = zoneRate.hourly;
      rawSeatCost = hourlyRate * duration;
      const dailyCap = zoneRate.daily;
      if (rawSeatCost > dailyCap) {
        discount = rawSeatCost - dailyCap;
        seatCost = dailyCap;
        discountLabel = `Session cap discount`;
      } else {
        discount = 0;
        seatCost = rawSeatCost;
        discountLabel = '';
      }
      basePlanLabel = `Hourly pass (₹${hourlyRate}/hr)`;
      scheduleUnitsLabel = `${duration} hour${duration > 1 ? 's' : ''} (${startTime})`;
    } else if (bookingType === 'weekly') {
      const dailyRate = zoneRate.daily;
      const daysCount = weeklyTermCount * 7;
      rawSeatCost = daysCount * dailyRate;
      discount = Math.round(rawSeatCost * 0.15); // 15% membership discount
      seatCost = rawSeatCost - discount;
      discountLabel = `15% weekly membership savings`;
      basePlanLabel = `Weekly pass (₹${dailyRate * 7}/wk)`;
      scheduleUnitsLabel = `${weeklyTermCount} week${weeklyTermCount > 1 ? 's' : ''}`;
    } else if (bookingType === 'monthly') {
      const dailyRate = zoneRate.daily;
      const daysCount = monthlyTermCount * 30;
      rawSeatCost = daysCount * dailyRate;
      discount = Math.round(rawSeatCost * 0.25); // 25% premier loyalty discount
      seatCost = rawSeatCost - discount;
      discountLabel = `25% monthly dedicated savings`;
      basePlanLabel = `Monthly pass (₹${dailyRate * 30}/mo)`;
      scheduleUnitsLabel = `${monthlyTermCount} month${monthlyTermCount > 1 ? 's' : ''}`;
    } else if (bookingType === 'custom') {
      const dailyRate = zoneRate.daily;
      const daysCount = Math.max(1, getDaysDifference(customStartDate, customEndDate));
      rawSeatCost = daysCount * dailyRate;
      if (daysCount >= 30) {
        discount = Math.round(rawSeatCost * 0.25);
        discountLabel = '25% extended stay savings';
      } else if (daysCount >= 7) {
        discount = Math.round(rawSeatCost * 0.15);
        discountLabel = '15% multi-day savings';
      } else {
        discount = 0;
        discountLabel = '';
      }
      seatCost = rawSeatCost - discount;
      basePlanLabel = `Custom pass (${daysCount} day${daysCount > 1 ? 's' : ''})`;
      scheduleUnitsLabel = `${formatDisplayDate(customStartDate, { includeDayOfWeek: false, includeYear: false })} – ${formatDisplayDate(customEndDate, { includeDayOfWeek: false, includeYear: false })}`;
    }

    // If serverQuote matches current bookingType and duration, reflect server-verified quote
    if (serverQuote && serverQuote.bookingType === bookingType) {
      if (
        (bookingType === 'hourly' && serverQuote.durationHours === duration) ||
        (bookingType === 'weekly' && Math.round(serverQuote.daysCount / 7) === weeklyTermCount) ||
        (bookingType === 'monthly' && Math.round(serverQuote.daysCount / 30) === monthlyTermCount)
      ) {
        rawSeatCost = serverQuote.rawSeatCost;
        seatCost = serverQuote.seatCost;
        discount = serverQuote.discount;
        if (serverQuote.discountLabel) {
          discountLabel = serverQuote.discountLabel;
        }
      }
    }

    const totalCost = Math.max(0, seatCost + foodCost);

    return {
      basePlanLabel,
      scheduleUnitsLabel,
      rawSeatCost,
      seatCost,
      discount,
      discountLabel,
      foodCost,
      totalCost
    };
  }, [
    bookingType,
    zoneRate.hourly,
    zoneRate.daily,
    duration,
    startTime,
    weeklyTermCount,
    monthlyTermCount,
    customStartDate,
    customEndDate,
    serverQuote,
    foodCost
  ]);

  const displaySeatCost = computedPricing.seatCost;
  const displayRawCost = computedPricing.rawSeatCost;
  const displayDiscount = computedPricing.discount;
  const displayDiscountLabel = computedPricing.discountLabel;
  const displayGrandTotal = computedPricing.totalCost;

  // Confirm and Generate Pass with Mandatory Sign-In Requirement
  const handleConfirmBooking = async () => {
    if (!selectedSeat) return;

    // Check if user is currently signed in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      // Preserve all entered booking details before prompting sign-in
      savePendingBooking({
        seatId: selectedSeat.id,
        zone: selectedZone,
        bookingType,
        startDate: currentScheduleParams.startDate,
        endDate: currentScheduleParams.endDate,
        startTime,
        duration,
        termCount: currentScheduleParams.termCount,
        preferences,
        cart,
        location,
        step: 3,
        paymentMethod
      });
      setIsAuthModalOpen(true);
      return;
    }

    // Signed-in user continues directly to confirmation
    executeConfirmedBooking(currentUser);
  };

  const executeConfirmedBooking = async (user: AuthUser) => {
    if (!selectedSeat) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find(i => i.id === id);
      return {
        itemId: id,
        name: item?.name || id,
        price: item?.price || 0,
        quantity: qty
      };
    });

    const spaceName = `${location.cafe || 'Celpin Coworking'} — Seat ${selectedSeat.id} (${selectedZone.toUpperCase()})`;

    try {
      const res = await api.createBooking({
        seatId: selectedSeat.id,
        zone: selectedZone,
        bookingType,
        startDate: currentScheduleParams.startDate,
        endDate: currentScheduleParams.endDate,
        startTime,
        duration,
        termCount: currentScheduleParams.termCount,
        preferences,
        seatCost: displaySeatCost,
        foodCost,
        discount: displayDiscount,
        totalCost: displayGrandTotal,
        orderItems,
        customerName: user.name,
        customerEmail: user.email
      });

      setBookingResult(res.booking);
      clearPendingBooking();

      // Trigger Booking, Payment, and Access notifications
      sendNotification('booking_confirmed', {
        'Space Name': spaceName,
        'Date': currentScheduleParams.startDate || location.date || 'Today',
        'Time': startTime
      });
      sendNotification('payment_successful', {
        'Space Name': spaceName,
        'Amount': `₹${displayGrandTotal}`
      });
      sendNotification('access_details_ready', {
        'Space Name': spaceName
      });
    } catch (err: any) {
      if (err.message && err.message.toLowerCase().includes("authentication required")) {
        setIsAuthModalOpen(true);
      }
      setSubmissionError(err.message || 'Failed to complete booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = (authenticatedUser: AuthUser) => {
    setIsAuthModalOpen(false);
    setCustomerName(authenticatedUser.name);
    setCustomerEmail(authenticatedUser.email);
    // Proceed directly with confirmation after sign-in
    executeConfirmedBooking(authenticatedUser);
  };

  const handleNavigateToRegister = () => {
    if (selectedSeat) {
      savePendingBooking({
        seatId: selectedSeat.id,
        zone: selectedZone,
        bookingType,
        startDate: currentScheduleParams.startDate,
        endDate: currentScheduleParams.endDate,
        startTime,
        duration,
        termCount: currentScheduleParams.termCount,
        preferences,
        cart,
        location,
        step: 3,
        paymentMethod
      });
    }
    onNavigate('register');
  };

  const zonesList = [
    {
      id: 'quiet' as const,
      name: 'Quiet Zone',
      badge: 'Focused Pod',
      rating: '4.7',
      hourlyRate: 99,
      dailyRate: 399,
      desc: 'Silent, focused work with comfortable seating and book-friendly desk.',
      icon: <Headphones className="h-5 w-5" />
    },
    {
      id: 'collaboration' as const,
      name: 'Collaboration Table',
      badge: 'Team Synergy',
      rating: '4.8',
      hourlyRate: 129,
      dailyRate: 499,
      desc: 'Open shared table with desk lamp, ideal for team brainstorming.',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'window' as const,
      name: 'Window Seat',
      badge: 'Natural Light',
      rating: '4.9',
      hourlyRate: 149,
      dailyRate: 599,
      desc: 'Bright natural light and soft seating — creative flow.',
      icon: <Sun className="h-5 w-5" />
    },
    {
      id: 'premium' as const,
      name: 'Premium Desk',
      badge: 'Executive Suite',
      rating: '5.0',
      hourlyRate: 199,
      dailyRate: 799,
      desc: 'Private workspace with WiFi access, power socket, adjustable light, and comfortable seating.',
      icon: <Crown className="h-5 w-5" />
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Top Header & Manage Bookings Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            {t('booking.title', 'Book your workspace')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('booking.subtitle', 'Pick a seat, select flexible hourly or multi-day durations, and generate your digital pass.')}
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsManageModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <ListFilter className="w-4 h-4 text-primary" />
            Manage My Bookings
          </button>
        </div>
      </div>

      {/* Progress Bar 3 Steps */}
      <div className="mb-10">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Step 1 */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => !bookingResult && setStep(1)}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                step >= 1 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
              }`}
            >
              1
            </div>
            <span
              className={`hidden sm:block text-sm font-medium ${
                step >= 1 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('booking.step1', 'Workspace')}
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 2 */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => !bookingResult && selectedSeat && setStep(2)}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                step >= 2 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
              }`}
            >
              2
            </div>
            <span
              className={`hidden sm:block text-sm font-medium ${
                step >= 2 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('booking.step2', 'Duration & schedule')}
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                step >= 3 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
              }`}
            >
              3
            </div>
            <span
              className={`hidden sm:block text-sm font-medium ${
                step >= 3 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t('booking.step3', 'Digital pass')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Step Content */}
        <div className="lg:col-span-2">
          {/* STEP 1: Select Workspace */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <LocationSelectorBar value={location} onChange={sel => setLocation(sel)} />

              {/* 4K Interior Preview Modal in Booking Page */}
              <CafeInteriorPreviewModal
                cafe={previewModalCafe}
                isOpen={!!previewModalCafe}
                onClose={() => setPreviewModalCafe(null)}
                onSelectCafe={(cafeName) => {
                  setLocation(prev => ({ ...prev, cafe: cafeName, cafeDesk: cafeName }));
                  setPreviewModalCafe(null);
                }}
              />

              <div>
                <h2 className="text-xl font-semibold mb-1">{t('booking.selectWorkspace', 'Select your workspace')}</h2>
                <p className="text-sm text-muted-foreground">
                  Pick a workspace zone and reserve your seat at {location.cafe || location.cafeDesk || 'the selected café'}.
                </p>
              </div>

              <div className="space-y-4">
                {zonesList.map(z => {
                  const zoneSeats = seats.filter(s => s.zone === z.id);
                  const availableInZone = zoneSeats.filter(s => s.status === 'available').length;
                  const isZoneActive = selectedZone === z.id;

                  return (
                    <div
                      key={z.id}
                      onClick={() => handleZoneSelect(z.id)}
                      className={`rounded-xl border p-5 transition-all cursor-pointer ${
                        isZoneActive
                          ? 'border-primary ring-2 ring-primary/20 bg-card shadow-md'
                          : 'border-border bg-card hover:border-border/80 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                            {z.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">{z.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{z.desc}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {z.badge}
                          </span>
                          <span className="font-display font-extrabold text-base text-foreground">
                            ₹{z.hourlyRate} <span className="text-xs font-normal text-muted-foreground">/ hr</span>
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Day pass: ₹{z.dailyRate}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                            {availableInZone} available
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {zoneSeats.map(seat => {
                            const isSelected = selectedSeat?.id === seat.id;
                            const isAvailable = seat.status === 'available';

                            return (
                              <button
                                key={seat.id}
                                disabled={!isAvailable}
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedSeat(seat);
                                  setSelectedZone(seat.zone);
                                }}
                                className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-sm font-medium transition-all ${
                                  isSelected
                                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                    : isAvailable
                                    ? 'border-border hover:border-primary/50 hover:bg-accent text-foreground'
                                    : 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed opacity-50'
                                }`}
                              >
                                <span className="font-bold">{seat.name}</span>
                                <span className="text-[11px] opacity-80 capitalize">{seat.status}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Duration, Schedule & Preferences */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Select booking duration &amp; schedule</h2>
                <p className="text-sm text-muted-foreground">
                  Choose between hourly sessions, weekly membership passes, or monthly dedicated executive passes.
                </p>
              </div>

              {/* DURATION TYPE SELECTOR (4 TABS) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    id: 'hourly' as const,
                    label: 'Hourly',
                    sub: '1–8 hours flexible',
                    badge: 'Hourly',
                    icon: <Clock className="w-4 h-4" />
                  },
                  {
                    id: 'custom' as const,
                    label: 'Custom Range',
                    sub: 'Pick any dates',
                    badge: 'Flexible',
                    icon: <Calendar className="w-4 h-4" />
                  },
                  {
                    id: 'weekly' as const,
                    label: 'Weekly',
                    sub: 'Weekly pass',
                    badge: 'Save 15%',
                    icon: <CalendarRange className="w-4 h-4" />
                  },
                  {
                    id: 'monthly' as const,
                    label: 'Monthly',
                    sub: 'Dedicated monthly',
                    badge: 'Save 25%',
                    icon: <CalendarDays className="w-4 h-4" />
                  }
                ].map(item => {
                  const isSelected = bookingType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBookingType(item.id)}
                      className={`relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {item.icon}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-foreground">{item.label}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* DURATION CONFIGURATION PANELS */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
                {/* 1. HOURLY CONFIG */}
                {bookingType === 'hourly' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">Hourly session details</h3>
                        <p className="text-xs text-muted-foreground">Select session date, start time, and hours</p>
                      </div>
                      <span className="text-xl font-bold font-display text-primary">
                        {duration} Hour{duration > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                          Booking Date
                        </label>
                        <DateRangePicker
                          mode="single"
                          startDate={location.date || todayStr}
                          minDate={todayStr}
                          onChange={range => {
                            setLocation(prev => ({ ...prev, date: range.startDate, endDate: range.startDate }));
                          }}
                          buttonClassName="py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                          Start Time
                        </label>
                        <select
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary/20"
                        >
                          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                            <option key={t} value={t}>
                              {t} ({parseInt(t) >= 12 ? (parseInt(t) === 12 ? '12:00 PM' : `${parseInt(t) - 12}:00 PM`) : `${t} AM`})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Hours Block
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {[1, 2, 3, 4, 5, 6, 8].map(hrs => (
                          <button
                            key={hrs}
                            type="button"
                            onClick={() => setDuration(hrs)}
                            className={`h-11 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                              duration === hrs
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'border border-border bg-background hover:bg-muted text-foreground'
                            }`}
                          >
                            {hrs}h
                          </button>
                        ))}
                      </div>
                    </div>

                    {duration * zoneRate.hourly > zoneRate.daily && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>
                          <strong>Daily cap protected!</strong> Raw session cost of ₹{duration * zoneRate.hourly} is capped at maximum ₹{zoneRate.daily}.
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CUSTOM RANGE CONFIG */}
                {bookingType === 'custom' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">Custom date-range pass</h3>
                        <p className="text-xs text-muted-foreground">Select your exact check-in and check-out dates on the calendar</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {getDaysDifference(customStartDate, customEndDate)} Day{getDaysDifference(customStartDate, customEndDate) > 1 ? 's' : ''} Selected
                        </span>
                        {getDaysDifference(customStartDate, customEndDate) >= 7 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            {getDaysDifference(customStartDate, customEndDate) >= 30 ? '25% off' : '15% off'}
                          </span>
                        )}
                      </div>
                    </div>

                    <DateRangeCalendar
                      startDate={customStartDate}
                      endDate={customEndDate}
                      minDate={todayStr}
                      mode="range"
                      showPresets={true}
                      inline={true}
                      onChange={range => {
                        setCustomStartDate(range.startDate);
                        setCustomEndDate(range.endDate);
                      }}
                      className="border border-border/80"
                    />

                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        Active range: <strong>{formatRangeSummary(customStartDate, customEndDate)}</strong>. Billed at flexible daily rate ₹{zoneRate.daily}/day with progressive discounts.
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. WEEKLY CONFIG */}
                {bookingType === 'weekly' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">Weekly coworking membership pass</h3>
                        <p className="text-xs text-muted-foreground">Full weekly all-inclusive access</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                        15% weekly pass discount
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                          Active Date Range
                        </label>
                        <DateRangePicker
                          startDate={weeklyStartDate}
                          endDate={weeklyEndDate}
                          minDate={todayStr}
                          mode="range"
                          onChange={range => {
                            setWeeklyStartDate(range.startDate);
                            setWeeklyEndDate(range.endDate);
                            const weeks = Math.max(1, Math.round(range.daysCount / 7));
                            setWeeklyTermCount(weeks);
                          }}
                          buttonClassName="py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                          Booking Term (Weeks)
                        </label>
                        <select
                          value={weeklyTermCount}
                          onChange={e => {
                            const count = Number(e.target.value);
                            setWeeklyTermCount(count);
                            setWeeklyEndDate(addDays(weeklyStartDate, count * 7 - 1));
                          }}
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary/20"
                        >
                          {[1, 2, 3, 4, 8].map(w => (
                            <option key={w} value={w}>
                              {w} week{w > 1 ? 's' : ''} ({w * 7} days)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        Active dates: <strong>{formatRangeSummary(weeklyStartDate, weeklyEndDate)}</strong> with 15% membership discount applied.
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. MONTHLY CONFIG */}
                {bookingType === 'monthly' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div>
                        <h3 className="font-bold text-sm text-foreground">Monthly dedicated executive pass</h3>
                        <p className="text-xs text-muted-foreground">Dedicated monthly desk pass with full perks</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        25% premier loyalty discount
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                          Active Date Range
                        </label>
                        <DateRangePicker
                          startDate={monthlyStartDate}
                          endDate={monthlyEndDate}
                          minDate={todayStr}
                          mode="range"
                          onChange={range => {
                            setMonthlyStartDate(range.startDate);
                            setMonthlyEndDate(range.endDate);
                            const months = Math.max(1, Math.round(range.daysCount / 30));
                            setMonthlyTermCount(months);
                          }}
                          buttonClassName="py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                          Booking Term (Months)
                        </label>
                        <select
                          value={monthlyTermCount}
                          onChange={e => {
                            const count = Number(e.target.value);
                            setMonthlyTermCount(count);
                            setMonthlyEndDate(addDays(monthlyStartDate, count * 30 - 1));
                          }}
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary/20"
                        >
                          {[1, 2, 3, 6].map(m => (
                            <option key={m} value={m}>
                              {m} month{m > 1 ? 's' : ''} ({m * 30} days)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>
                        Active dates: <strong>{formatRangeSummary(monthlyStartDate, monthlyEndDate)}</strong> with 25% dedicated member discount.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Real-time Availability Warning */}
              {availability && !availability.available && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Seat {selectedSeat?.name} is reserved at this time</p>
                      <p className="mt-0.5 opacity-90">{availability.conflicts?.[0]?.reason || 'Another member has already reserved this slot.'}</p>
                    </div>
                  </div>
                  {alternativeSeat && (
                    <button
                      type="button"
                      onClick={() => setSelectedSeat(alternativeSeat)}
                      className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-all shrink-0 cursor-pointer"
                    >
                      Switch to {alternativeSeat.name} (Free)
                    </button>
                  )}
                </div>
              )}

              {/* Work Preferences Tags */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="font-semibold text-sm mb-1">Work preferences</h3>
                <p className="text-xs text-muted-foreground mb-4">Select all amenities needed for your session.</p>

                <div className="flex flex-wrap gap-2">
                  {availablePrefTags.map(tag => {
                    const active = preferences.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => togglePref(tag)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'border border-border bg-background text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {active && '✓ '} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment or QR Check-in Display */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {bookingResult ? (
                /* Booking Success / QR Pass */
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Booking confirmed!</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your {bookingResult.bookingType} workspace pass is reserved. Show this pass at the entrance.
                  </p>

                  {/* Pass Box with Minimalistic Light Peach Background */}
                  <div className="mt-8 max-w-sm mx-auto p-6 rounded-3xl border border-[#F6D3C2] bg-gradient-to-b from-[#FFF5EE] via-[#FFF1E8] to-[#FFEAE0] dark:from-[#2B1B14] dark:via-[#261812] dark:to-[#1F130E] dark:border-[#523326] shadow-xl shadow-orange-950/5 ring-1 ring-[#F4BFA8]/60 dark:ring-[#754432]/40 relative overflow-hidden">
                    {/* Minimal decorative accent */}
                    <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-orange-400/10 blur-xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-28 h-28 rounded-full bg-orange-400/10 blur-xl pointer-events-none" />

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FFE6D9] text-[#B85324] dark:bg-[#3D251A] dark:text-[#FFA37A] border border-[#F5C7B2]/70 dark:border-[#5F3827] mb-3">
                      Digital turnstile pass
                    </div>

                    <div className="flex justify-center my-3.5">
                      <div className="p-2.5 rounded-2xl bg-white shadow-sm border border-[#F2C9B6]/60">
                        <img
                          src={bookingResult.qrCodeUrl}
                          alt="Booking QR Code"
                          className="h-40 w-40 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Booking Reference</p>
                      <p className="font-mono text-xl font-black text-[#D35400] dark:text-[#FF8A50] tracking-wide">{bookingResult.bookingRef}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F1CBB9]/80 dark:border-[#4B2F23] text-left text-xs">
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-bold text-sm text-foreground">{location.city}</p>
                        <p className="text-[11px] text-[#D35400] dark:text-[#FFA37A] font-semibold">{location.cafe || location.cafeDesk}</p>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Duration Plan:</span>
                        <p className="font-bold text-sm text-foreground capitalize">{bookingResult.bookingType}</p>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Seat:</span>
                        <p className="font-bold text-sm text-foreground">
                          {bookingResult.seatId} ({bookingResult.zone})
                        </p>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Total Paid:</span>
                        <p className="font-bold text-sm text-foreground">₹{bookingResult.totalCost}</p>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Turnstile PIN:</span>
                        <p className="font-mono font-black text-base text-foreground tracking-wider">{bookingResult.pin}</p>
                      </div>

                      <div>
                        <span className="text-muted-foreground">Access Status:</span>
                        <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          Active &amp; Ready
                        </p>
                      </div>
                    </div>

                    {bookingResult.dates && bookingResult.dates.length > 1 && (
                      <div className="mt-3.5 pt-3 border-t border-[#F1CBB9]/80 dark:border-[#4B2F23] text-left text-xs">
                        <span className="text-muted-foreground block mb-1">
                          Booked Dates ({bookingResult.dates.length}):
                        </span>
                        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                          {bookingResult.dates.map(d => (
                            <span key={d} className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-black/30 border border-[#F1CBB9]/60 dark:border-[#4B2F23] text-[10px] font-mono">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center justify-center text-sm font-medium border border-border bg-background hover:bg-muted h-10 px-5 rounded-xl cursor-pointer"
                    >
                      Back to Home
                    </button>
                    <button
                      onClick={() => setIsManageModalOpen(true)}
                      className="inline-flex items-center justify-center text-sm font-medium border border-border bg-background hover:bg-muted h-10 px-5 rounded-xl cursor-pointer"
                    >
                      View in My Bookings
                    </button>
                    <button
                      onClick={() => {
                        setBookingResult(null);
                        setStep(1);
                      }}
                      className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-xl shadow-xs cursor-pointer"
                    >
                      Book Another Workspace
                    </button>
                  </div>
                </div>
              ) : (
                /* Payment form */
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Pass delivery &amp; confirmation</h2>
                    <p className="text-sm text-muted-foreground">
                      Confirm member details and generate your encrypted entry pass.
                    </p>
                  </div>

                  {/* Pricing Overview Banner */}
                  <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-primary tracking-wider">
                        {bookingType} Coworking Pass
                      </span>
                      <p className="font-bold text-sm text-foreground mt-0.5">
                        {selectedSeat?.name} ({selectedSeat?.zone}) • {computedPricing.scheduleUnitsLabel}
                      </p>
                      <p className="text-xs text-muted-foreground">{computedPricing.basePlanLabel}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-xs text-muted-foreground block">Payable Total</span>
                      <span className="font-display font-black text-2xl text-primary">₹{displayGrandTotal}</span>
                    </div>
                  </div>

                  {submissionError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300 text-xs space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                        <div>
                          <p className="font-semibold text-sm">Booking Reservation Notice</p>
                          <p className="mt-0.5 leading-relaxed">{submissionError}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-red-500/15">
                        {alternativeSeat && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSeat(alternativeSeat);
                              setSubmissionError(null);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
                          >
                            Switch to Seat {alternativeSeat.name} ({alternativeSeat.zone})
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSubmissionError(null);
                            setStep(2);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted text-xs font-medium cursor-pointer"
                        >
                          Change Time or Date
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmissionError(null);
                            setStep(1);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground hover:bg-muted text-xs font-medium cursor-pointer"
                        >
                          Pick Different Seat
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Highlighted Chosen Date Range Review Card */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-900 dark:text-amber-200 shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                          Selected Booking Dates
                        </span>
                        <p className="font-bold text-sm text-foreground">
                          {formatRangeSummary(currentScheduleParams.startDate, currentScheduleParams.endDate || currentScheduleParams.startDate)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Check-in: {formatDisplayDate(currentScheduleParams.startDate)} ({startTime}) • Pass valid until {formatDisplayDate(currentScheduleParams.endDate || currentScheduleParams.startDate)} (11:59 PM)
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="self-start sm:self-auto px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold text-primary transition-colors cursor-pointer"
                    >
                      Change Dates
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold">Mobile Pass &amp; WhatsApp</p>
                          <p className="text-xs text-muted-foreground">Instant QR sent to your phone</p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-semibold">Email Pass &amp; Calendar</p>
                          <p className="text-xs text-muted-foreground">Direct pass &amp; calendar invite</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                        Member Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                        Email for Pass &amp; Entry PIN
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Explicit Cancellation Policy Notice */}
                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Cancellation &amp; Modification Terms</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      • <strong>100% Credit Refund:</strong> If cancelled 24+ hours prior to the session start.
                      <br />
                      • <strong>Same-Day Cancellations:</strong> 80% refund (20% short-notice processing fee applies).
                      <br />
                      • <strong>Rescheduling:</strong> Free date and time modifications subject to seat availability.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Itemized Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card shadow-sm sticky top-24 p-6 space-y-4">
            <h3 className="font-semibold tracking-tight text-lg">{t('booking.summary', 'Booking summary')}</h3>

            {/* Selected Café in Booking Summary */}
            <div className="flex justify-between items-start pb-2.5 border-b border-border/60 text-sm">
              <span className="text-muted-foreground">Selected Café</span>
              <div className="text-right">
                <p className="font-semibold text-foreground text-sm">
                  {location.cafe || location.cafeDesk || 'Heritage Café'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {location.city}, {location.state}
                </p>
              </div>
            </div>

            {selectedSeat ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Date Range</span>
                  <div className="text-right">
                    <p className="font-semibold text-foreground text-xs">
                      {formatRangeSummary(currentScheduleParams.startDate, currentScheduleParams.endDate || currentScheduleParams.startDate)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[10px] text-primary hover:underline font-medium cursor-pointer"
                    >
                      Change dates
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Workspace</span>
                  <span className="font-bold text-foreground">
                    {selectedSeat.name} ({selectedSeat.zone})
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <label htmlFor="summary-duration-plan" className="text-muted-foreground font-medium text-xs">
                    Duration Plan
                  </label>
                  <select
                    id="summary-duration-plan"
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value as BookingDurationType)}
                    className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2.5 py-1 text-xs font-bold text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                  >
                    <option value="hourly" className="bg-card text-foreground">Hourly</option>
                    <option value="custom" className="bg-card text-foreground">Custom Range</option>
                    <option value="weekly" className="bg-card text-foreground">Weekly</option>
                    <option value="monthly" className="bg-card text-foreground">Monthly</option>
                  </select>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Base Plan</span>
                  <span className="font-semibold text-foreground text-xs">
                    {computedPricing.basePlanLabel}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <label htmlFor="summary-duration-units" className="text-muted-foreground font-medium text-xs">
                    {bookingType === 'hourly' ? 'Session Hours' : bookingType === 'custom' ? 'Days Selected' : bookingType === 'weekly' ? 'Weekly Term' : 'Monthly Term'}
                  </label>
                  {bookingType === 'hourly' ? (
                    <select
                      id="summary-duration-units"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2 py-0.5 text-xs font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 8].map(hrs => (
                        <option key={hrs} value={hrs} className="bg-card text-foreground">
                          {hrs} Hour{hrs > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  ) : bookingType === 'custom' ? (
                    <span className="text-xs font-bold text-primary">
                      {getDaysDifference(customStartDate, customEndDate)} Days
                    </span>
                  ) : bookingType === 'weekly' ? (
                    <select
                      id="summary-duration-units"
                      value={weeklyTermCount}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setWeeklyTermCount(count);
                        setWeeklyEndDate(addDays(weeklyStartDate, count * 7 - 1));
                      }}
                      className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2 py-0.5 text-xs font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                    >
                      {[1, 2, 3, 4, 8].map(w => (
                        <option key={w} value={w} className="bg-card text-foreground">
                          {w} week{w > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      id="summary-duration-units"
                      value={monthlyTermCount}
                      onChange={(e) => {
                        const count = Number(e.target.value);
                        setMonthlyTermCount(count);
                        setMonthlyEndDate(addDays(monthlyStartDate, count * 30 - 1));
                      }}
                      className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2 py-0.5 text-xs font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                    >
                      {[1, 2, 3, 6].map(m => (
                        <option key={m} value={m} className="bg-card text-foreground">
                          {m} month{m > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Itemized Gross Cost */}
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Gross Workspace Cost</span>
                  <span className="font-medium text-foreground">
                    ₹{displayRawCost}
                  </span>
                </div>

                {/* Applicable Discounts */}
                {displayDiscount > 0 && (
                  <div className="flex justify-between items-start pb-2 border-b border-border/60 text-emerald-600 dark:text-emerald-400">
                    <span className="text-xs">
                      {displayDiscountLabel || 'Plan Discount'}
                    </span>
                    <span className="font-semibold text-xs shrink-0">-₹{displayDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Seat Amount</span>
                  <span className="font-semibold text-foreground">₹{displaySeatCost}</span>
                </div>

                {/* Pre-ordered items */}
                {foodCost > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Café Pre-Orders</span>
                    <span className="font-medium text-foreground">₹{foodCost}</span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base">Total Amount</span>
                  <span className="font-display text-2xl font-black text-primary">
                    ₹{displayGrandTotal}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-2 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-border/60 text-sm">
                  <span className="text-muted-foreground">Active Zone</span>
                  <span className="font-semibold text-foreground">
                    {zonesList.find(z => z.id === selectedZone)?.name || selectedZone}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60 text-sm">
                  <label htmlFor="unselected-duration-plan" className="text-muted-foreground font-medium text-xs">
                    Duration Plan
                  </label>
                  <select
                    id="unselected-duration-plan"
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value as BookingDurationType)}
                    className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2.5 py-1 text-xs font-bold text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                  >
                    <option value="hourly" className="bg-card text-foreground">Hourly</option>
                    <option value="custom" className="bg-card text-foreground">Custom Range</option>
                    <option value="weekly" className="bg-card text-foreground">Weekly</option>
                    <option value="monthly" className="bg-card text-foreground">Monthly</option>
                  </select>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60 text-sm">
                  <span className="text-muted-foreground">Base Plan</span>
                  <span className="font-bold text-foreground text-xs">
                    {computedPricing.basePlanLabel}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60 text-sm">
                  <span className="text-muted-foreground">Estimated Total</span>
                  <span className="font-display font-black text-lg text-primary">
                    ₹{displayGrandTotal}
                  </span>
                </div>
                <p className="text-xs text-center text-muted-foreground italic">Click any available seat tile to confirm</p>
              </div>
            )}

            {/* Stepper Buttons */}
            {!bookingResult && (
              <div className="pt-2 space-y-2">
                {step < 3 ? (
                  <button
                    disabled={!selectedSeat || (step === 2 && availability !== null && !availability.available)}
                    onClick={() => setStep((step + 1) as any)}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-1.5 shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    {step === 2 && availability !== null && !availability.available
                      ? 'Seat Unavailable — Change Time or Seat'
                      : `Continue to ${step === 1 ? 'Schedule' : 'Pass Confirmation'}`}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    disabled={Boolean(isSubmitting || !selectedSeat)}
                    onClick={handleConfirmBooking}
                    className="w-full inline-flex items-center justify-center font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-2 shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Generating...' : t('booking.confirmBtn', 'Confirm & Generate Access Pass')}
                  </button>
                )}

                {step > 1 && !bookingResult && (
                  <button
                    onClick={() => setStep((step - 1) as any)}
                    className="w-full inline-flex items-center justify-center text-xs text-muted-foreground hover:text-foreground h-8 gap-1 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Previous Step
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOOKING MANAGEMENT MODAL */}
      <BookingManagementModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        userEmail={customerEmail}
        onNavigateToBooking={() => {
          setBookingResult(null);
          setStep(1);
        }}
      />
      {/* Sign-In Required Modal before booking confirmation */}
      <SignInRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        bookingSummary={{
          seatName: selectedSeat?.name,
          zoneName: selectedZone.toUpperCase(),
          durationText: `${duration} hrs (${bookingType})`,
          totalAmount: displayGrandTotal,
          bookingType: bookingType.toUpperCase(),
          dateText: formatRangeSummary(currentScheduleParams.startDate, currentScheduleParams.endDate || currentScheduleParams.startDate)
        }}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </div>
  );
};

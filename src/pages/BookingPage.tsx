import React, { useState, useEffect } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { Seat, MenuItem, Booking, WorkspaceZone } from '../types';
import { LocationSelectorBar, LocationSelection } from '../components/LocationSelectorBar';
import { useI18n } from '../i18n/I18nContext';
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
  const [location, setLocation] = useState<LocationSelection>(
    initialLocation || {
      country: 'India',
      state: 'Telangana',
      city: 'Warangal',
      date: new Date().toISOString().split('T')[0],
      cafe: 'Celpin Heritage Café',
      cafeDesk: 'Celpin Heritage Café'
    }
  );
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Selections
  const [selectedZone, setSelectedZone] = useState<WorkspaceZone>(initialZone);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [duration, setDuration] = useState<number>(2);
  const [preferences, setPreferences] = useState<string[]>(['power socket']);
  const [cart, setCart] = useState<Record<string, number>>(preselectedCart || {});
  
  // Payment info
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

  useEffect(() => {
    if (initialCustomerName) setCustomerName(initialCustomerName);
    if (initialCustomerEmail) setCustomerEmail(initialCustomerEmail);
  }, [initialCustomerName, initialCustomerEmail]);

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
      const defaultSeat = data.seats.find(s => s.zone === initialZone && s.status === 'available') || data.seats.find(s => s.status === 'available');
      if (defaultSeat) {
        setSelectedSeat(defaultSeat);
        setSelectedZone(defaultSeat.zone);
      }
    });
    api.getMenu().then(data => setMenuItems(data.items));
  }, [initialSeatId, initialZone]);

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
    setPreferences(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
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

  // Zone hourly rates mapping
  const ZONE_RATES: Record<WorkspaceZone, number> = {
    quiet: 99,
    collaboration: 129,
    window: 149,
    premium: 199
  };

  // Pricing calculations: guarantees booking summary hourly rate strictly matches the zone rate
  const activeZone: WorkspaceZone = selectedSeat?.zone || selectedZone;
  const hourlyRate = ZONE_RATES[activeZone] || 99;
  const rawSeatCost = hourlyRate * duration;
  const seatCost = rawSeatCost;

  const handleZoneSelect = (zoneId: WorkspaceZone) => {
    setSelectedZone(zoneId);
    const seatInZone = seats.find(s => s.zone === zoneId && s.status === 'available');
    if (seatInZone) {
      setSelectedSeat(seatInZone);
    }
  };

  const foodCost = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = menuItems.find(i => i.id === id);
    return total + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = seatCost + foodCost;

  const handleConfirmBooking = async () => {
    if (!selectedSeat) return;
    setIsSubmitting(true);

    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const item = menuItems.find(i => i.id === id);
      return {
        itemId: id,
        name: item?.name || id,
        price: item?.price || 0,
        quantity: qty
      };
    });

    try {
      const res = await api.createBooking({
        seatId: selectedSeat.id,
        zone: selectedZone,
        duration,
        preferences,
        seatCost,
        foodCost,
        discount: 0,
        totalCost: grandTotal,
        orderItems,
        customerName,
        customerEmail
      });
      setBookingResult(res.booking);
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const zonesList = [
    {
      id: 'quiet' as const,
      name: 'Quiet Zone',
      badge: 'Focused Pod',
      rating: '4.7',
      hourlyRate: 99,
      desc: 'Silent, focused work with comfortable seating and book-friendly desk.',
      icon: <Headphones className="h-5 w-5" />
    },
    {
      id: 'collaboration' as const,
      name: 'Collaboration Table',
      badge: 'Team Synergy',
      rating: '4.8',
      hourlyRate: 129,
      desc: 'Open shared table with desk lamp, ideal for team brainstorming.',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'window' as const,
      name: 'Window Seat',
      badge: 'Natural Light',
      rating: '4.9',
      hourlyRate: 149,
      desc: 'Bright natural light and soft seating — creative flow.',
      icon: <Sun className="h-5 w-5" />
    },
    {
      id: 'premium' as const,
      name: 'Premium Desk',
      badge: 'Executive Suite',
      rating: '5.0',
      hourlyRate: 199,
      desc: 'Private workspace with WiFi access, power socket, adjustable light, and comfortable seating.',
      icon: <Crown className="h-5 w-5" />
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          {t('booking.title', 'Book Your Workspace')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('booking.subtitle', 'Pick a seat, set your time, and generate your digital access pass.')}
        </p>
      </div>

      {/* Progress Bar 3 Steps */}
      <div className="mb-10">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Step 1 */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => !bookingResult && setStep(1)}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 1 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('booking.step1', 'Workspace')}
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => !bookingResult && selectedSeat && setStep(2)}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 2 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('booking.step2', 'Duration')}
            </span>
          </div>
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-border'}`}></div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              step >= 3 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
            <span className={`hidden sm:block text-sm font-medium ${step >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {t('booking.step3', 'Digital Pass')}
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
              {/* Location & Booking Date Dropdown Controls */}
              <LocationSelectorBar
                value={location}
                onChange={(sel) => setLocation(sel)}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-card border border-border shadow-xs">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-primary">Selected Café</span>
                  <h3 className="text-base font-bold text-foreground">{location.cafe || location.cafeDesk || 'Celpin Heritage Café'}</h3>
                  <p className="text-xs text-muted-foreground">{location.city}, {location.state} • {location.date}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold self-start sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Real-Time Desks Available
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {t('booking.selectWorkspace', 'Select your workspace')}
                </h2>
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
                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {z.badge}
                          </span>
                          <span className="font-display font-extrabold text-base text-foreground">
                            ₹{z.hourlyRate} <span className="text-xs font-normal text-muted-foreground">/ hr</span>
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
                                onClick={(e) => {
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
                                <span className="text-[11px] opacity-80 capitalize">
                                  {seat.status}
                                </span>
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

          {/* STEP 2: Duration & Preferences */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Duration & Preferences</h2>
                <p className="text-sm text-muted-foreground">Select how long you plan to stay and any setup preferences.</p>
              </div>

              {/* Duration Selector */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-sm">Booking Hours</span>
                  <span className="text-2xl font-bold font-display text-primary">{duration} Hour{duration > 1 ? 's' : ''}</span>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6].map(hrs => (
                    <button
                      key={hrs}
                      onClick={() => setDuration(hrs)}
                      className={`h-12 rounded-xl font-bold text-sm transition-all ${
                        duration === hrs
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'border border-border bg-background hover:bg-accent text-foreground'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>

                {duration >= 4 && (
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-success text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Extended Focus Pass active! Full-day uninterrupted access granted for your session.
                  </div>
                )}
              </div>

              {/* Work Preferences Tags */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <h3 className="font-semibold text-sm mb-2">Work Preferences</h3>
                <p className="text-xs text-muted-foreground mb-4">Select all tags that fit your work session.</p>

                <div className="flex flex-wrap gap-2">
                  {availablePrefTags.map(tag => {
                    const active = preferences.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => togglePref(tag)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/15 text-success mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="text-sm text-muted-foreground mt-1">Your seat is reserved. Show this pass at the entrance.</p>

                  {/* Pass Box */}
                  <div className="mt-8 max-w-sm mx-auto p-6 rounded-2xl border border-border bg-card shadow-lg ring-1 ring-primary/20">
                    <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2">Digital Check-In Pass</p>
                    <div className="flex justify-center my-4">
                      <img
                        src={bookingResult.qrCodeUrl}
                        alt="Booking QR Code"
                        className="h-44 w-44 rounded-xl border border-border p-2 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Booking Reference</p>
                      <p className="font-mono text-lg font-bold text-primary">{bookingResult.bookingRef}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border text-left text-xs">
                      <div>
                        <span className="text-muted-foreground">City &amp; Café:</span>
                        <p className="font-bold text-sm text-foreground">{location.city}</p>
                        {(location.cafe || location.cafeDesk) && (
                          <p className="text-[11px] text-primary font-medium mt-0.5 leading-snug">{location.cafe || location.cafeDesk}</p>
                        )}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Booking Date:</span>
                        <p className="font-bold text-sm text-foreground">{location.date}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Seat:</span>
                        <p className="font-bold text-sm text-foreground">{bookingResult.seatId} ({bookingResult.zone})</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration &amp; Total:</span>
                        <p className="font-bold text-sm text-foreground">{bookingResult.durationHours} Hours • ₹{bookingResult.totalCost || grandTotal}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entry PIN:</span>
                        <p className="font-mono font-bold text-sm text-foreground">{bookingResult.pin}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Access Status:</span>
                        <p className="font-bold text-sm text-success">Confirmed &amp; Active</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center justify-center text-sm font-medium border border-border bg-background hover:bg-accent h-10 px-5 rounded-xl cursor-pointer"
                    >
                      Back to Home
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
                <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Access Pass Delivery</h2>
                    <p className="text-sm text-muted-foreground">Select your pass delivery preference and confirm your reservation details.</p>
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
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Your Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">Email for Pass &amp; Entry PIN</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/40 border border-border flex items-center gap-3 text-xs text-muted-foreground">
                    <ShieldCheck className="h-5 w-5 text-success shrink-0" />
                    <span>Instant encrypted verification. You will earn +25 loyalty credits with this reservation!</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card shadow-sm sticky top-24 p-6 space-y-5">
            <h3 className="font-semibold tracking-tight text-lg">
              {t('booking.summary', 'Booking Summary')}
            </h3>

            {selectedSeat ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">{t('booking.location', 'City')}</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    {location.city}
                    {step > 1 && (
                      <button
                        onClick={() => setStep(1)}
                        className="text-[11px] text-primary hover:underline font-normal cursor-pointer"
                      >
                        (Edit)
                      </button>
                    )}
                  </span>
                </div>
                {(location.cafe || location.cafeDesk) && (
                  <div className="flex justify-between items-start pb-2 border-b border-border/60">
                    <span className="text-muted-foreground shrink-0">Selected Café</span>
                    <span className="font-semibold text-foreground text-right text-xs max-w-[190px] leading-snug">
                      {location.cafe || location.cafeDesk}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">{t('booking.date', 'Date')}</span>
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    {location.date}
                    {step > 1 && (
                      <button
                        onClick={() => setStep(1)}
                        className="text-[11px] text-primary hover:underline font-normal cursor-pointer"
                      >
                        (Edit)
                      </button>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">{t('booking.seat', 'Seat')}</span>
                  <span className="font-bold text-foreground">{selectedSeat.name} ({selectedSeat.zone})</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Hourly Rate</span>
                  <span className="font-semibold text-foreground">₹{hourlyRate} / hr</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <label htmlFor="summary-duration-select" className="text-muted-foreground font-medium">
                    {t('booking.duration', 'Duration')}
                  </label>
                  <select
                    id="summary-duration-select"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2.5 py-1 text-sm font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map(hrs => (
                      <option key={hrs} value={hrs} className="bg-card text-foreground">
                        {hrs} Hour{hrs > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Seat Amount</span>
                  <span className="font-semibold text-foreground">₹{seatCost}</span>
                </div>

                {Object.keys(cart).length > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Café Pre-Orders</span>
                    <span className="font-medium text-foreground">₹{foodCost}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base">Total Amount</span>
                  <span className="font-display text-2xl font-black text-primary">₹{grandTotal}</span>
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
                  <span className="text-muted-foreground">Hourly Rate</span>
                  <span className="font-bold text-foreground">₹{ZONE_RATES[selectedZone]} / hr</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/60 text-sm">
                  <label htmlFor="unselected-duration" className="text-muted-foreground font-medium">
                    Duration
                  </label>
                  <select
                    id="unselected-duration"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="bg-muted/70 hover:bg-muted border border-border rounded-lg px-2.5 py-1 text-sm font-bold text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map(hrs => (
                      <option key={hrs} value={hrs} className="bg-card text-foreground">
                        {hrs} Hour{hrs > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-border/60">
                  <span className="font-bold text-base">Estimated Total</span>
                  <span className="font-display text-2xl font-black text-primary">₹{ZONE_RATES[selectedZone] * duration}</span>
                </div>
                <p className="text-xs text-center text-muted-foreground italic">Click any available seat tile to confirm</p>
              </div>
            )}

            {!bookingResult && (
              <div className="pt-2 space-y-2">
                {step < 3 ? (
                  <button
                    disabled={!selectedSeat}
                    onClick={() => setStep((step + 1) as any)}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-1.5 shadow-sm disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    Continue to {step === 1 ? 'Duration' : 'Access Pass'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    disabled={isSubmitting || !selectedSeat}
                    onClick={handleConfirmBooking}
                    className="w-full inline-flex items-center justify-center font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl gap-2 shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Generating...' : t('booking.confirmBtn', 'Confirm & Generate Access Pass')}
                  </button>
                )}

                {step > 1 && !bookingResult && (
                  <button
                    onClick={() => setStep((step - 1) as any)}
                    className="w-full inline-flex items-center justify-center text-xs text-muted-foreground hover:text-foreground h-8 gap-1 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Previous Step
                  </button>
                )}
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

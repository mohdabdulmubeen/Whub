import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Repeat,
  CalendarRange,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  QrCode,
  ArrowRight,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { Booking, BookingDurationType } from '../types';
import { DateRangePicker } from './DateRangePicker';
import { getTodayStr } from '../utils/dateUtils';

interface BookingManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBooking?: () => void;
  userEmail?: string;
}

export const BookingManagementModal: React.FC<BookingManagementModalProps> = ({
  isOpen,
  onClose,
  onNavigateToBooking,
  userEmail
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancellationTarget, setCancellationTarget] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [cancellationResult, setCancellationResult] = useState<{ message: string; refundTerms?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'checked-in' | 'cancelled'>('all');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getBookings();
      setBookings(data.bookings || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancelBooking = async () => {
    if (!cancellationTarget) return;
    setIsProcessing(true);
    try {
      const res = await api.cancelBooking(cancellationTarget.id, cancelReason);
      setCancellationResult({
        message: res.message || 'Booking cancelled successfully',
        refundTerms: res.refundTerms || '100% credit refund eligible'
      });
      // Refresh list
      await fetchBookings();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRescheduleBooking = async () => {
    if (!rescheduleTarget || !newStartDate) return;
    setIsProcessing(true);
    setRescheduleError(null);
    try {
      await api.modifyBooking(rescheduleTarget.id, {
        startDate: newStartDate,
        endDate: newEndDate || newStartDate,
        startTime: newStartTime
      });
      setRescheduleTarget(null);
      await fetchBookings();
    } catch (err: any) {
      setRescheduleError(err.message || 'Unable to reschedule booking for the chosen date/time');
    } finally {
      setIsProcessing(false);
    }
  };

  const filtered = bookings.filter(b => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  const getDurationTypeBadge = (type: BookingDurationType = 'hourly') => {
    switch (type) {
      case 'alternate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Repeat className="w-3 h-3" /> Alternate Days
          </span>
        );
      case 'weekly':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <CalendarRange className="w-3 h-3" /> Weekly Pass
          </span>
        );
      case 'monthly':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <CalendarDays className="w-3 h-3" /> Monthly Pass
          </span>
        );
      case 'hourly':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Clock className="w-3 h-3" /> Hourly Pass
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'checked-in':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <ShieldCheck className="w-3 h-3" /> Checked In
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 border border-red-500/20">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Workspace bookings &amp; passes</h2>
              <p className="text-xs text-muted-foreground">View passes, check real-time availability, modify schedules, or cancel reservations.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-border/70 bg-card text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            {(['all', 'confirmed', 'checked-in', 'cancelled'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                  statusFilter === f
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1 rounded-md hover:bg-muted"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <span className="text-muted-foreground">Total: {filtered.length}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="py-16 text-center text-muted-foreground">
              <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
              <p className="text-sm">Loading your bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="inline-flex p-4 rounded-full bg-muted text-muted-foreground mb-2">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No bookings found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                You don't have any reservations matching this filter. Explore our ergonomic quiet pods, collaboration tables, and premium desks.
              </p>
              {onNavigateToBooking && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToBooking();
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow hover:bg-primary/90 cursor-pointer"
                >
                  Book a Workspace Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(booking => {
                const datesList: string[] = booking.dates || [];
                const recurrenceDays: string[] = booking.recurrenceDays || [];
                const isCancelled = booking.status === 'cancelled';
                const isCheckedIn = booking.status === 'checked-in';

                return (
                  <div
                    key={booking.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isCancelled
                        ? 'border-border/60 bg-muted/20 opacity-75'
                        : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sm text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
                          {booking.bookingRef}
                        </span>
                        {getDurationTypeBadge(booking.bookingType)}
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="text-right flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs text-muted-foreground">Total:</span>
                        <span className="font-display font-black text-base text-foreground">
                          ₹{booking.totalCost}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs">
                      <div>
                        <span className="text-muted-foreground block mb-0.5">Seat &amp; Zone:</span>
                        <span className="font-bold text-foreground">
                          Seat {booking.seatId} ({booking.zone})
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-0.5">Schedule Span:</span>
                        <span className="font-semibold text-foreground">
                          {booking.startDate || 'Current Session'}
                          {booking.endDate && booking.endDate !== booking.startDate ? ` → ${booking.endDate}` : ''}
                        </span>
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-0.5">Duration &amp; Days:</span>
                        <span className="font-semibold text-foreground">
                          {booking.bookingType === 'hourly'
                            ? `${booking.durationHours} Hours (${booking.startTime || '09:00'})`
                            : `${datesList.length || booking.daysCount || 1} Days`}
                        </span>
                        {recurrenceDays.length > 0 && (
                          <span className="text-[10px] text-muted-foreground block mt-0.5">
                            ({recurrenceDays.join(', ')})
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-muted-foreground block mb-0.5">Access Pass PIN:</span>
                        <span className="font-mono font-bold text-primary text-sm">
                          {booking.pin}
                        </span>
                      </div>
                    </div>

                    {/* Multi-Date Chips Preview */}
                    {datesList.length > 1 && (
                      <div className="pt-2 pb-1 border-t border-border/40">
                        <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
                          Reserved Dates ({datesList.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                          {datesList.map(d => (
                            <span
                              key={d}
                              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted text-muted-foreground border border-border/60"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cancellation Note if Cancelled */}
                    {isCancelled && booking.cancellationReason && (
                      <div className="mt-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Cancelled: {booking.cancellationReason}</span>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-1 border-t border-border/60">
                      <div className="text-[11px] text-muted-foreground">
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Digital Pass / QR code viewer */}
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-medium cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-primary" />
                          View QR Pass
                        </button>

                        {!isCancelled && !isCheckedIn && (
                          <>
                            {/* Reschedule button */}
                            <button
                              onClick={() => {
                                setRescheduleTarget(booking);
                                setNewStartDate(booking.startDate || new Date().toISOString().split('T')[0]);
                                setNewStartTime(booking.startTime || '09:00');
                                setNewEndDate(booking.endDate || booking.startDate || new Date().toISOString().split('T')[0]);
                                setRescheduleError(null);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-medium cursor-pointer"
                            >
                              Reschedule
                            </button>

                            {/* Cancel button */}
                            <button
                              onClick={() => {
                                setCancellationTarget(booking);
                                setCancellationResult(null);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Policy Notice */}
        <div className="px-6 py-3 border-t border-border bg-muted/30 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              <strong>Cancellation Policy:</strong> 100% credit refund up to 24h before session; 80% refund for same-day cancellations.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-background border border-border text-foreground hover:bg-muted font-medium cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* VIEW PASS MODAL */}
        {selectedBooking && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-[#FFF5EE] via-[#FFF1E8] to-[#FFEAE0] dark:from-[#2B1B14] dark:via-[#261812] dark:to-[#1F130E] border border-[#F6D3C2] dark:border-[#523326] ring-1 ring-[#F4BFA8]/60 dark:ring-[#754432]/40 rounded-3xl shadow-2xl p-6 text-center space-y-4 overflow-hidden">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex p-3 rounded-full bg-[#FFE6D9] text-[#B85324] dark:bg-[#3D251A] dark:text-[#FFA37A]">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Digital turnstile pass</h3>
                <p className="text-xs text-muted-foreground">Scan at optical scanner or enter 4-digit PIN</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-[#F2C9B6]/60 bg-white flex justify-center shadow-xs">
                <img
                  src={selectedBooking.qrCodeUrl}
                  alt="QR Code"
                  className="w-44 h-44 rounded-lg"
                />
              </div>

              <div className="bg-white/70 dark:bg-black/30 border border-[#F1CBB9]/70 dark:border-[#4B2F23] p-3 rounded-2xl space-y-1">
                <span className="text-[11px] text-muted-foreground uppercase font-semibold">Entry PIN code</span>
                <p className="font-mono text-2xl font-black text-[#D35400] dark:text-[#FF8A50] tracking-widest">{selectedBooking.pin}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left text-xs pt-2 border-t border-[#F1CBB9]/80 dark:border-[#4B2F23]">
                <div>
                  <span className="text-muted-foreground">Seat:</span>
                  <p className="font-bold">{selectedBooking.seatId} ({selectedBooking.zone})</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Reference:</span>
                  <p className="font-mono font-bold text-primary">{selectedBooking.bookingRef}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Schedule:</span>
                  <p className="font-semibold">{selectedBooking.startDate || 'Today'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-bold text-emerald-600 capitalize">{selectedBooking.status}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow hover:bg-primary/90 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* CANCEL MODAL */}
        {cancellationTarget && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">Cancel booking?</h3>
                  <p className="text-xs text-muted-foreground">Reference: {cancellationTarget.bookingRef}</p>
                </div>
              </div>

              {cancellationResult ? (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs space-y-1">
                    <p className="font-bold text-sm">✓ {cancellationResult.message}</p>
                    <p>{cancellationResult.refundTerms}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCancellationTarget(null);
                      setCancellationResult(null);
                    }}
                    className="w-full py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs space-y-1">
                    <p className="font-semibold">Cancellation Policy &amp; Terms:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li>24+ hours before start time: <strong>100% full credit refund</strong> to your Celpin account.</li>
                      <li>Under 24 hours: <strong>80% refund</strong> (20% short-notice processing fee applies).</li>
                      <li>Reserved desk will immediately be released for other members.</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Reason for cancellation</label>
                    <select
                      value={cancelReason}
                      onChange={e => setCancelReason(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Change of plans">Change of plans / Schedule conflict</option>
                      <option value="Prefer different zone">Want to book a different zone</option>
                      <option value="Travel delay">Travel or meeting delay</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setCancellationTarget(null)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted cursor-pointer"
                    >
                      Keep Booking
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? 'Cancelling...' : 'Confirm Cancellation'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* RESCHEDULE MODAL */}
        {rescheduleTarget && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">Reschedule booking</h3>
                    <p className="text-xs text-muted-foreground">{rescheduleTarget.bookingRef} • Seat {rescheduleTarget.seatId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setRescheduleTarget(null)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {rescheduleError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{rescheduleError}</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1.5">
                    {rescheduleTarget.bookingType === 'hourly' ? 'Select New Date' : 'Select New Date Range'}
                  </label>
                  <DateRangePicker
                    mode={rescheduleTarget.bookingType === 'hourly' ? 'single' : 'range'}
                    startDate={newStartDate || getTodayStr()}
                    endDate={newEndDate || newStartDate || getTodayStr()}
                    minDate={getTodayStr()}
                    onChange={range => {
                      setNewStartDate(range.startDate);
                      setNewEndDate(range.endDate);
                    }}
                    buttonClassName="w-full text-xs"
                    align="center"
                  />
                </div>

                {rescheduleTarget.bookingType === 'hourly' && (
                  <div>
                    <label className="block font-semibold text-muted-foreground mb-1">Start Time</label>
                    <select
                      value={newStartTime}
                      onChange={e => setNewStartTime(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs text-foreground"
                    >
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground">
                  Our system will verify workspace availability for Seat {rescheduleTarget.seatId} on the new date. If conflicts exist, you will be notified.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setRescheduleTarget(null)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRescheduleBooking}
                  disabled={isProcessing || !newStartDate}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? 'Verifying & Saving...' : 'Save New Schedule'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  Armchair, 
  CalendarCheck, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  ExternalLink,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { Seat } from '../types';

interface AdminPageProps {
  onNavigate?: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'seats' | 'applications' | 'database'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, sRes, aRes] = await Promise.all([
        api.getBookings(),
        api.getSeats(),
        api.getApplications()
      ]);
      setBookings(bRes.bookings || []);
      setSeats(sRes.seats || []);
      setApplications(aRes.applications || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async (id: string, ref: string) => {
    try {
      await api.checkInBooking(id);
      setStatusMessage(`Checked in booking ${ref} successfully`);
      setTimeout(() => setStatusMessage(null), 3000);
      fetchData();
    } catch (e) {
      alert('Failed to check in');
    }
  };

  const handleCancel = async (id: string, ref: string) => {
    if (!confirm(`Are you sure you want to cancel booking ${ref}?`)) return;
    try {
      await api.cancelBooking(id, 'Admin cancellation');
      setStatusMessage(`Cancelled booking ${ref} successfully`);
      setTimeout(() => setStatusMessage(null), 3000);
      fetchData();
    } catch (e: any) {
      alert(e.message || 'Failed to cancel booking');
    }
  };

  const handleUpdateSeatStatus = async (seatId: string, newStatus: 'available' | 'occupied' | 'reserved') => {
    try {
      await api.updateSeatStatus(seatId, newStatus);
      setStatusMessage(`Seat ${seatId} updated to ${newStatus}`);
      setTimeout(() => setStatusMessage(null), 3000);
      fetchData();
    } catch (e) {
      alert('Failed to update seat status');
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.bookingRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.seatId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeats = seats.filter(s =>
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableSeatsCount = seats.filter(s => s.status === 'available').length;
  const occupiedSeatsCount = seats.filter(s => s.status === 'occupied').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Celpin Operations & Admin Portal
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time control center for coworking reservations, seat telemetry, and database records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href="http://localhost:5555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Database className="w-4 h-4" />
            <span>Open Prisma Studio</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
          </a>
        </div>
      </div>

      {/* Notification banner */}
      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Bookings</span>
            <CalendarCheck className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">{bookings.length}</div>
          <span className="text-xs text-muted-foreground mt-1 inline-block">Active & completed</span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Seats Available</span>
            <Armchair className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">{availableSeatsCount} / {seats.length}</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 inline-block">Ready to book</span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Occupied Desks</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">{occupiedSeatsCount}</div>
          <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 inline-block">Currently in use</span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Ecosystem Apps</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">{applications.length}</div>
          <span className="text-xs text-purple-600 dark:text-purple-400 mt-1 inline-block">Cohort submissions</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Bookings & Check-ins ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('seats')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'seats'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Seat Controls ({seats.length})
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Cohort Applications ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
              activeTab === 'database'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            Prisma Studio
          </button>
        </div>

        {activeTab !== 'database' && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl border border-border bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Ref & Customer</th>
                    <th className="px-6 py-4">Seat & Zone</th>
                    <th className="px-6 py-4">Duration & Cost</th>
                    <th className="px-6 py-4">PIN / Pass</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No bookings found matching query.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-foreground flex items-center gap-2">
                            <span>{b.bookingRef}</span>
                            {b.bookingType && (
                              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                                {b.bookingType}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{b.customerName} ({b.customerEmail})</div>
                          {b.startDate && (
                            <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                              {b.startDate}{b.endDate && b.endDate !== b.startDate ? ` → ${b.endDate}` : ''}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary uppercase">
                            Seat {b.seatId}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2 capitalize">{b.zone}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">₹{b.totalCost}</div>
                          <div className="text-xs text-muted-foreground">
                            {b.bookingType === 'alternate'
                              ? `${b.dates?.length || b.daysCount || 1} Alt Days`
                              : b.bookingType === 'weekly'
                              ? `${b.termCount || 1} Wk (${b.dates?.length || 7}d)`
                              : b.bookingType === 'monthly'
                              ? `${b.termCount || 1} Mo (${b.dates?.length || 30}d)`
                              : `${b.durationHours || 2} hr(s)`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs px-2 py-1 rounded bg-muted font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400">
                            {b.pin}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            b.status === 'checked-in'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : b.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              b.status === 'checked-in' ? 'bg-emerald-500' : b.status === 'cancelled' ? 'bg-red-500' : 'bg-amber-500'
                            }`} />
                            {b.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {b.status !== 'checked-in' && b.status !== 'cancelled' && (
                              <>
                                <button
                                  onClick={() => handleCheckIn(b.id, b.bookingRef)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Check In</span>
                                </button>
                                <button
                                  onClick={() => handleCancel(b.id, b.bookingRef)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {b.status === 'checked-in' && (
                              <span className="text-xs text-muted-foreground font-medium">Verified Active</span>
                            )}
                            {b.status === 'cancelled' && (
                              <span className="text-xs text-red-500 font-medium">Cancelled</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEATS */}
      {activeTab === 'seats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSeats.map(seat => (
            <div 
              key={seat.id} 
              className={`p-4 rounded-2xl border transition-all ${
                seat.status === 'available'
                  ? 'bg-card border-border hover:border-emerald-500/40'
                  : seat.status === 'occupied'
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : 'bg-muted/40 border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-lg text-foreground">Desk {seat.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                  seat.status === 'available'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : seat.status === 'occupied'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {seat.status}
                </span>
              </div>

              <div className="text-xs text-muted-foreground capitalize mb-3">
                {seat.zone} zone • ₹{seat.hourlyRate}/hr
              </div>

              <div className="flex items-center gap-1.5 pt-3 border-t border-border/60">
                <button
                  onClick={() => handleUpdateSeatStatus(seat.id, 'available')}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    seat.status === 'available' 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => handleUpdateSeatStatus(seat.id, 'occupied')}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    seat.status === 'occupied' 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Occupied
                </button>
                <button
                  onClick={() => handleUpdateSeatStatus(seat.id, 'reserved')}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    seat.status === 'reserved' 
                      ? 'bg-slate-700 text-white border-slate-700' 
                      : 'border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Reserved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Role & Domain</th>
                    <th className="px-6 py-4">Startup / College</th>
                    <th className="px-6 py-4">Pitch / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        No applications received yet.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app: any) => (
                      <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-foreground">{app.fullName || app.name}</div>
                          <div className="text-xs text-muted-foreground">{app.email} • {app.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary capitalize">
                            {app.role || 'Startup'}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">{app.domain || 'Tech'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-foreground">{app.startupName || app.institution || '—'}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-xs text-muted-foreground truncate">{app.pitch || app.message || app.bio || 'No details provided'}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE STUDIO */}
      {activeTab === 'database' && (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-500" />
                Prisma Studio Database Inspector
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Prisma Studio is running locally on port 5555. You can open it directly in a dedicated tab or view it below.
              </p>
            </div>
            <a
              href="http://localhost:5555"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="rounded-xl border border-border overflow-hidden h-[600px] bg-slate-900">
            <iframe
              src="http://localhost:5555"
              title="Prisma Studio"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

    </div>
  );
};

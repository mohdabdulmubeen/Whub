import React, { useState, useEffect } from 'react';
import {
  Coffee,
  DoorOpen,
  Headphones,
  Users,
  Sun,
  Crown,
  CheckCircle2,
  XCircle,
  Clock,
  Wifi,
  ArrowRight,
  Info,
  Star
} from 'lucide-react';
import { api } from '../services/api';
import { Seat, ZoneInfo } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface FloorMapPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const FloorMapPage: React.FC<FloorMapPageProps> = ({ onNavigate }) => {
  const { t } = useI18n();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [, setZones] = useState<Record<string, ZoneInfo>>({});
  const [stats, setStats] = useState({ total: 15, available: 11, occupied: 3, reserved: 1 });
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    api.getSeats().then(data => {
      setSeats(data.seats);
      setZones(data.zones);
      setStats(data.stats);
    });
  }, []);

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'occupied') {
      return 'border-destructive/40 bg-destructive/10 text-destructive/50 cursor-not-allowed';
    }
    if (seat.status === 'reserved') {
      return 'border-warning/40 bg-warning/10 text-warning/70 cursor-not-allowed';
    }
    // Available colors by zone
    switch (seat.zone) {
      case 'quiet':
        return 'border-chart-2/50 bg-chart-2/15 text-chart-2 hover:scale-110 cursor-pointer';
      case 'collaboration':
        return 'border-chart-4/50 bg-chart-4/15 text-chart-4 hover:scale-110 cursor-pointer';
      case 'window':
        return 'border-chart-3/50 bg-chart-3/15 text-chart-3 hover:scale-110 cursor-pointer';
      case 'premium':
        return 'border-chart-1/50 bg-chart-1/15 text-chart-1 hover:scale-110 cursor-pointer';
      default:
        return 'border-primary/50 bg-primary/15 text-primary hover:scale-110 cursor-pointer';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
          {t('floormap.badge')}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{t('floormap.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('floormap.subtitle')}</p>
      </div>

      {/* Live Badge Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl bg-card border border-border shadow-xs" role="region" aria-label="Floor occupancy status">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success"></span>
          </span>
          <span className="text-sm font-medium">{t('floormap.live')}</span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-success/80" aria-hidden="true"></span> {t('floormap.available')} ({stats.available})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/60" aria-hidden="true"></span> {t('floormap.occupied')} ({stats.occupied})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-warning/70" aria-hidden="true"></span> {t('floormap.reserved')} ({stats.reserved})
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visual Map Layout */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Map Canvas */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-accent/30 via-muted/20 to-card rounded-t-xl overflow-hidden p-4" role="region" aria-label="Interactive seat map">
              <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

              {/* Entrance Marker at Bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" aria-hidden="true">
                <DoorOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t('floormap.entrance')}</span>
              </div>

              {/* Café Counter Marker at Top */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shadow-xs pointer-events-none" aria-hidden="true">
                <span className="text-xs text-primary font-semibold flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5" /> {t('floormap.counter')}
                </span>
              </div>

              {/* Zone Labels */}
              <div style={{ left: '15%', top: '8%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-2 uppercase tracking-wide whitespace-nowrap pointer-events-none" aria-hidden="true">
                {t('zones.quiet')}
              </div>
              <div style={{ left: '47%', top: '12%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-4 uppercase tracking-wide whitespace-nowrap pointer-events-none" aria-hidden="true">
                {t('zones.collab')}
              </div>
              <div style={{ left: '80%', top: '8%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-3 uppercase tracking-wide whitespace-nowrap pointer-events-none" aria-hidden="true">
                {t('zones.window')}
              </div>
              <div style={{ left: '50%', top: '62%' }} className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold text-chart-1 uppercase tracking-wide whitespace-nowrap pointer-events-none" aria-hidden="true">
                {t('zones.premium')}
              </div>

              {/* Render All Seats */}
              {seats.map(seat => {
                const isSelected = selectedSeat?.id === seat.id;
                return (
                  <button
                    key={seat.id}
                    disabled={seat.status !== 'available'}
                    onClick={() => setSelectedSeat(seat)}
                    aria-label={`Seat ${seat.name}, ${seat.zone} zone, ${seat.status}`}
                    aria-pressed={isSelected}
                    style={{ left: `${seat.coordinates.x}%`, top: `${seat.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 text-xs font-bold transition-all shadow-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${getSeatColor(
                      seat
                    )} ${isSelected ? 'ring-4 ring-primary ring-offset-2 scale-110 z-20' : ''}`}
                  >
                    {seat.name}
                    {seat.status === 'available' && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success border-2 border-card" aria-hidden="true"></span>
                    )}
                    {seat.status === 'occupied' && (
                      <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5" aria-hidden="true" />
                    )}
                    {seat.status === 'reserved' && (
                      <Clock className="h-3.5 w-3.5 text-warning mt-0.5" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Zone Legend Footer */}
            <div className="p-4 border-t border-border bg-card/60">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-2/15 text-chart-2" aria-hidden="true">
                    <Headphones className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground font-semibold">Quiet (4.7 ★): <span className="text-primary font-bold">₹99/hr</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-4/15 text-chart-4" aria-hidden="true">
                    <Users className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground font-semibold">Collab (4.8 ★): <span className="text-primary font-bold">₹129/hr</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-3/15 text-chart-3" aria-hidden="true">
                    <Sun className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground font-semibold">Window (4.9 ★): <span className="text-primary font-bold">₹149/hr</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-chart-1/15 text-chart-1" aria-hidden="true">
                    <Crown className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground font-semibold">Premium (5.0 ★): <span className="text-primary font-bold">₹199/hr</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seat Inspector Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card shadow-sm sticky top-24 p-6" role="region" aria-label="Seat Details">
            <h3 className="font-semibold tracking-tight text-lg">{t('floormap.seatDetails')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('floormap.tapPrompt')}</p>

            {selectedSeat ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-accent/40 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold font-display text-primary">{selectedSeat.name}</span>
                    <p className="text-xs text-muted-foreground font-medium uppercase mt-0.5">{selectedSeat.zone} Zone</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-extrabold text-xl text-foreground block">
                      ₹{selectedSeat.zone === 'quiet' ? 99 : selectedSeat.zone === 'collaboration' ? 129 : selectedSeat.zone === 'window' ? 149 : 199} <span className="text-xs font-normal text-muted-foreground">/ hr</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 mt-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {selectedSeat.zone === 'quiet' ? '4.7 ★' : selectedSeat.zone === 'collaboration' ? '4.8 ★' : selectedSeat.zone === 'window' ? '4.9 ★' : '5.0 ★'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">{t('floormap.description')}</h4>
                  <p className="text-sm text-card-foreground leading-relaxed">{selectedSeat.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">{t('floormap.amenities')}</h4>
                  <ul className="space-y-1.5" role="list">
                    {selectedSeat.amenities.map((am, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
                        {am}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('booking', { selectedSeatId: selectedSeat.id, selectedZone: selectedSeat.zone })}
                    className="w-full inline-flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] h-11 rounded-xl gap-2 shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t('floormap.bookSeat')} {selectedSeat.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4 text-muted-foreground">
                  <Info className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('floormap.emptyPrompt')}
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi className="h-4 w-4 text-success" aria-hidden="true" />
              <span>{t('floormap.wifiNotice')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

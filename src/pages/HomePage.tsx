import React from 'react';
import {
  ArrowRight,
  MapPin,
  Wifi,
  Zap,
  Coffee,
  QrCode,
  Star,
  Headphones,
  Users,
  Sun,
  Crown,
  CheckCircle2,
  Clock,
  Award,
  Quote
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden" aria-label="Hero section">
        <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-xs">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                </span>
                11 {t('hero.statSeats', 'Seats Available')}
              </div>

              {/* Heading */}
              <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                {t('hero.titleLine1', "India’s Go-To")} <br />
                <span className="text-primary">{t('hero.titleLine2', 'Workspace Platform')}</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                {t('hero.subtitle', 'Book premium coworking spaces, hot desks & meeting rooms in minutes. Work from anywhere.')}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('booking')}
                  className="inline-flex items-center justify-center font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 text-base h-12 px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span>{t('hero.ctaBook', 'Book Your Seat')}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Features inline */}
              <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Wifi className="h-4 w-4 text-success" />
                  Fast Wi-Fi
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-success" />
                  Power at every seat
                </div>
                <div className="flex items-center gap-1.5">
                  <Coffee className="h-4 w-4 text-success" />
                  Coffee to your desk
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
                <img
                  src="https://images.pexels.com/photos/4339913/pexels-photo-4339913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Professionals working in a modern café co-working space"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute -bottom-5 -left-5 hidden sm:block">
                <div className="rounded-xl border bg-card text-card-foreground w-56 shadow-xl border-border/70 backdrop-blur-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">QR Check-In</p>
                      <p className="text-xs text-muted-foreground">Scan & sit in 5 sec</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-5 -right-5 hidden sm:block">
                <div className="rounded-xl border bg-card text-card-foreground w-52 shadow-xl border-border/70 backdrop-blur-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">4.8 / 5.0</p>
                      <p className="text-xs text-muted-foreground">2,400+ bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">12</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statSeats', 'Seats Available')}</p>
              <p className="text-xs text-muted-foreground/70">/15 live</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">4</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statZones', 'Unique Zones')}</p>
              <p className="text-xs text-muted-foreground/70">tailored spaces</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">100%</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statFlex', 'Flexible Access')}</p>
              <p className="text-xs text-muted-foreground/70">on-demand entry</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statRating', 'Avg. Rating')}</p>
              <p className="text-xs text-muted-foreground/70">/5.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Types Section */}
      <section className="py-16 lg:py-24 bg-card/30 border-y border-border" aria-labelledby="workspace-types-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Workspace Types
            </div>
            <h2 id="workspace-types-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {t('zones.title', 'Choose your perfect spot')}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {t('zones.subtitle', 'Four distinct zones designed for different work styles. All include power, Wi-Fi, and table service.')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Quiet Zone */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Headphones className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    4.7
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.quiet', 'Quiet Zone')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.quietDesc', 'Silent, focused work with comfortable seating and a book-friendly desk.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Focused Work Space
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {['Comfortable seating', 'Book-friendly desk', 'Power socket', 'Reading lamp'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collaboration Table */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    4.8
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.collab', 'Collaboration Table')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.collabDesc', 'Open shared table ideal for team brainstorming and pair work.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Team Synergy Space
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {['Shared table', 'Desk lamp', 'Power sockets', 'Group-friendly'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Window Seat */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sun className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    4.9
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.window', 'Window Seat')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.windowDesc', 'Bright natural light and soft seating — perfect for creative flow.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Natural Light Space
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {['Natural light', 'Soft seating', 'Power socket', 'Cozy corner'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Desk */}
            <div className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Crown className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    5.0
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.premium', 'Premium Desk')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.premiumDesc', 'Private workspace with WiFi access, power socket, adjustable light, and comfortable seating.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-border/40">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Executive Suite Desk
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {['WiFi access', 'Power socket', 'Adjustable light', 'Comfortable seating'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Celpin Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Why Celpin
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to work, nothing you don't</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">On-Demand Desks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reserve premium workspace on your own terms. Instant dynamic QR entry and no membership lock-in.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">QR Digital Check-In</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Book online, get a QR code. Scan at the entrance, your seat is ready. Zero friction, zero wait.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Rate Your Visit</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Help us improve with quick post-visit ratings on Wi-Fi, seating, noise, food, and overall comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section — International Standard Workflow */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-card/50 via-card/20 to-background border-y border-border relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4 animate-pulse">
              {t('steps.badge', 'Global Co-Working Standard')}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {t('steps.title', 'How Celpin Works')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('steps.subtitle', 'Engineered according to international flexible workspace standards. Zero front-desk waiting, automated IoT desk provisioning, and desk-delivered artisanal refreshments.')}
            </p>
          </div>

          {/* 4 International Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 01 */}
            <div className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-xs p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    01
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Interactive Plan
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2 text-primary">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {t('steps.step1.title', '01 — Choose')}
                  </h3>
                </div>

                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                  {t('steps.step1.sub', 'Your seat, your choice')}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('steps.step1.desc', 'Browse our real-time 2D floor plan. Select your preferred environment across Quiet Focus Pods, Team Collaboration Tables, Sunlit Window Bays, or Ergonomic Executive Desks.')}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Live availability telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Filter by power, view & noise level</span>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-xs p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    02
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Flexible Duration
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2 text-primary">
                  <Clock className="h-5 w-5 shrink-0" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {t('steps.step2.title', '02 — Book')}
                  </h3>
                </div>

                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                  {t('steps.step2.sub', 'Book 1–6 hours')}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('steps.step2.desc', 'Schedule flexible workspace blocks from 1 to 6+ hours with instant confirmation. Optionally pre-order artisanal barista coffee and gourmet snacks for direct desk delivery.')}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Flexible on-demand reservations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>On-demand café desk pre-orders</span>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-xs p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    03
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Instant Pass
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2 text-primary">
                  <QrCode className="h-5 w-5 shrink-0" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {t('steps.step3.title', '03 — Pass')}
                  </h3>
                </div>

                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                  {t('steps.step3.sub', 'Instant pass. QR ready.')}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('steps.step3.desc', 'Generate your verified access pass in one tap. Your encrypted dynamic QR pass and 4-digit backup turnstile PIN are instantly generated and sent to your phone and email.')}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Scannable contactless QR pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Offline 4-digit PIN verification</span>
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur-xs p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    04
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    IoT Activated
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2 text-primary">
                  <Coffee className="h-5 w-5 shrink-0" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {t('steps.step4.title', '04 — Work')}
                  </h3>
                </div>

                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
                  {t('steps.step4.sub', 'Scan in & get to work')}
                </h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t('steps.step4.desc', 'Hold your QR pass to the optical turnstile for instant under-5-second entry. Your seat power socket activates automatically, 300 Mbps fiber Wi-Fi is ready, and your coffee is served.')}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Automated desk socket energizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                  <span>Zero-delay barista desk delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Banner */}
          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Experience the Flow — Book a Seat</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2.5 text-xs text-muted-foreground">
              No subscription or security deposit required • Cancel up to 30 mins prior
            </p>
          </div>
        </div>
      </section>

      {/* Seamless Workspace Access Card */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card text-card-foreground shadow-lg overflow-hidden border-0 ring-2 ring-primary/20">
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-10">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-primary text-primary-foreground mb-4">
                  Frictionless Access
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight mb-4">On-demand seating. Zero wait. No memberships.</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Enjoy unrestricted workspace access designed for modern professionals, freelancers, and agile teams. Pick your favorite zone, check in via digital QR pass, and start producing with high-speed fiber Wi-Fi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Instant digital reservation &amp; optical QR entry</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>High-speed 300+ Mbps fiber Wi-Fi &amp; power at every desk</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>No deposit, no lock-in, complete work flexibility</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span>Complimentary loyalty credits with every visit</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => onNavigate('booking')}
                    className="inline-flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl px-8 gap-2 shadow-sm cursor-pointer"
                  >
                    Reserve a Desk <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative min-h-[300px] bg-gradient-to-br from-primary/10 via-accent/30 to-card flex items-center justify-center p-8 border-t md:border-t-0 md:border-l border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Access Pass</p>
                  <p className="font-display text-4xl sm:text-5xl font-extrabold text-primary">All-Inclusive</p>
                  <p className="text-sm text-muted-foreground mt-2">unlimited flexibility, any zone</p>
                  <div className="mt-6 flex justify-center gap-6">
                    <div>
                      <p className="text-base font-bold text-foreground">Quiet Pods</p>
                      <p className="text-xs text-muted-foreground">Deep Focus</p>
                    </div>
                    <div className="w-px bg-border"></div>
                    <div>
                      <p className="text-base font-bold text-foreground">Team Desks</p>
                      <p className="text-xs text-muted-foreground">Collaborative</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Loved by Members
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">What our regulars say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “Celpin changed how I work. I book a window seat, order a cappuccino, and I’m productive within minutes. The QR check-in is brilliant.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">PS</div>
                  <div>
                    <p className="text-sm font-semibold">Priya Sharma</p>
                    <p className="text-xs text-muted-foreground">Freelance Designer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “The collaboration tables are fantastic for small team sprints. High-speed Wi-Fi, zero fuss with billing, and great snacks on demand.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">RK</div>
                  <div>
                    <p className="text-sm font-semibold">Rahul Kapoor</p>
                    <p className="text-xs text-muted-foreground">Tech Lead</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                  “The seamless on-demand access makes it an absolute no-brainer for long workdays. Quiet zone is genuinely quiet, and the cold brew is perfection.”
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">AM</div>
                  <div>
                    <p className="text-sm font-semibold">Ananya Mehta</p>
                    <p className="text-xs text-muted-foreground">Content Strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

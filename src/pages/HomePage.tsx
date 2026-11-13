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
  Quote,
  Building2
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenListSpace?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenListSpace }) => {
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
                11 {t('hero.statSeats', 'seats available')}
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
                  <span>{t('hero.ctaBook', 'Book your seat')}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenListSpace}
                  className="inline-flex items-center justify-center font-medium transition-all bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border/80 rounded-xl gap-2 text-base h-12 px-5 shadow-xs hover:shadow-sm active:translate-y-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>List your space</span>
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
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statSeats', 'Seats available')}</p>
              <p className="text-xs text-muted-foreground/70">/15 live</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">4</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statZones', 'Unique zones')}</p>
              <p className="text-xs text-muted-foreground/70">tailored spaces</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">100%</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statFlex', 'Flexible access')}</p>
              <p className="text-xs text-muted-foreground/70">on-demand entry</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <p className="text-3xl font-bold font-display text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">{t('hero.statRating', 'Avg. rating')}</p>
              <p className="text-xs text-muted-foreground/70">/5.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Types Section */}
      <section className="py-16 lg:py-24 bg-[#f4f3ee] dark:bg-slate-900/60 border-y border-[#e5e3db] dark:border-slate-800/80" aria-labelledby="workspace-types-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
              Workspace types
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
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Headphones className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.quiet', 'Quiet Zone')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.quietDesc', 'Silent, focused work with comfortable seating and a book-friendly desk.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Focused workspace
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
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.collab', 'Collaboration Table')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.collabDesc', 'Open shared table ideal for team brainstorming and pair work.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Team synergy space
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
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sun className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.window', 'Window Seat')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.windowDesc', 'Bright natural light and soft seating — perfect for creative flow.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Natural light space
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
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="p-6">
                <div className="mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Crown className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{t('zones.premium', 'Premium Desk')}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {t('zones.premiumDesc', 'Private workspace with WiFi access, power socket, adjustable light, and comfortable seating.')}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                <div className="my-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    Executive suite desk
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
      <section className="py-16 lg:py-24 bg-[#eef2f6] dark:bg-[#0e1622] border-b border-[#dfe5ee] dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-foreground mb-3 shadow-2xs">
              Why Celpin
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Everything you need to work, nothing you don't
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">On-demand desks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reserve premium workspace on your own terms. Instant dynamic QR entry and no membership lock-in.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">QR digital check-in</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Book online, get a QR code. Scan at the entrance, your seat is ready. Zero friction, zero wait.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Rate your visit</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Help us improve with quick post-visit ratings on Wi-Fi, seating, noise, food, and overall comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section — International Standard Workflow */}
      <section className="py-20 lg:py-28 bg-[#fdf4ec] dark:bg-[#18110b] border-y border-[#f5dfcf] dark:border-amber-950/50 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-amber-900/50 bg-white dark:bg-slate-900 px-3.5 py-1 text-xs font-semibold text-primary mb-4 shadow-2xs">
              {t('steps.badge', 'Global coworking standard')}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {t('steps.title', 'How Celpin works')}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('steps.subtitle', 'Engineered according to international flexible workspace standards. Zero front-desk waiting, automated IoT desk provisioning, and desk-delivered artisanal refreshments.')}
            </p>
          </div>

          {/* 4 International Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 01 */}
            <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    01
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Interactive plan
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

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-muted-foreground">
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
            <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    02
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Flexible duration
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

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-muted-foreground">
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
            <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    03
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Instant pass
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

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-muted-foreground">
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
            <div className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black font-display text-base shadow-md group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg transition-transform duration-300">
                    04
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    IoT activated
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

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-muted-foreground">
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
              <span>Experience the flow — book a seat</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2.5 text-xs text-muted-foreground">
              No subscription or security deposit required • Cancel up to 30 mins prior
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-slate-50/60 dark:bg-slate-950/60 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-border bg-secondary/80 text-secondary-foreground mb-3 shadow-2xs">
              Loved by members
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              What our regulars say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Priya Sharma',
                designation: 'Software Architect',
                company: 'EMIY',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
                realisticLogo: (
                  <svg viewBox="0 0 40 40" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="emiy-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4F46E5" />
                        <stop offset="1" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
                      stroke="url(#emiy-grad)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      fill="#4F46E5"
                      fillOpacity="0.12"
                    />
                    <path
                      d="M20 12L28 17V26L20 30L12 26V17L20 12Z"
                      fill="url(#emiy-grad)"
                    />
                    <circle cx="20" cy="21" r="3" fill="#FFFFFF" />
                  </svg>
                ),
                quote:
                  '“Celpin has transformed how our architecture team operates during hybrid sprints. We reserve quiet acoustic pods for deep cloud infrastructure reviews, then migrate to collaboration tables for pair programming. The optical Wi-Fi and instant QR check-in are flawless.”'
              },
              {
                name: 'Rahul Kapoor',
                designation: 'Chairman & Co-founder',
                company: 'BEON',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
                realisticLogo: (
                  <svg viewBox="0 0 40 40" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="beon-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#059669" />
                        <stop offset="1" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="6"
                      y="6"
                      width="28"
                      height="28"
                      rx="8"
                      stroke="url(#beon-grad)"
                      strokeWidth="2.5"
                      fill="#059669"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M14 13H21C23.2 13 25 14.8 25 17C25 18.6 24 19.9 22.6 20.6C24.4 21.2 26 22.8 26 25C26 27.2 24.2 29 22 29H14V13Z"
                      stroke="url(#beon-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 21H21.5"
                      stroke="url(#beon-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                quote:
                  '“The flexibility here is unmatched in India. Zero long-term leases, immediate turnkey desk provisioning, and top-tier hospitality for client meetings. BEON’s leadership conducts high-stakes planning sessions here with absolute peace of mind.”'
              },
              {
                name: 'Ananya Mehta',
                designation: 'Director & Founder',
                company: 'ECL',
                avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=400&q=80',
                realisticLogo: (
                  <svg viewBox="0 0 40 40" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ecl-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="20"
                      cy="20"
                      r="14"
                      stroke="url(#ecl-grad)"
                      strokeWidth="2.5"
                      fill="#8B5CF6"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M26 14C24.5 12.8 22.4 12 20 12C15.6 12 12 15.6 12 20C12 24.4 15.6 28 20 28C22.4 28 24.5 27.2 26 26"
                      stroke="url(#ecl-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="20" r="3.5" fill="url(#ecl-grad)" />
                  </svg>
                ),
                quote:
                  '“Finding sunlit, aesthetically inspiring workspaces with zero acoustic noise distractions used to be impossible. At Celpin, the panoramic window seats, ergonomic furniture, and desk-delivered artisan coffee keep our entire design team in uninterrupted creative flow.”'
              }
            ].map((tItem, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden min-h-[440px]"
              >
                <div className="p-7 sm:p-8 flex-1 flex flex-col">
                  {/* Top Bar: Left Rating & Top-Right Company Brand Logo (No watermark / box) */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>

                    {/* Top-Right Company Logo with Company Name */}
                    <div className="flex items-center gap-2 shrink-0 select-none">
                      <div className="flex items-center justify-center shrink-0">
                        {tItem.realisticLogo}
                      </div>
                      <span className="text-sm font-display font-black tracking-wider uppercase text-foreground/90">
                        {tItem.company}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground">
                    {tItem.quote}
                  </p>
                </div>

                {/* Minimalist Background Colour for Name and Photo Section Only */}
                <div className="bg-slate-50/90 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80 px-7 py-5 sm:px-8 sm:py-5 flex items-center gap-4 mt-auto">
                  <img
                    src={tItem.avatar}
                    alt={tItem.name}
                    className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl object-cover border border-slate-200/90 dark:border-slate-700 shadow-xs shrink-0"
                  />
                  <div className="min-w-0 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
                      {tItem.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-normal">
                      {tItem.designation}, {tItem.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

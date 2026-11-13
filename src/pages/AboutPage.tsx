import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Wifi,
  Coffee,
  ShieldCheck,
  Zap,
  Users,
  Compass,
  Building2,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Layers,
  MapPin
} from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: string, params?: any) => void;
  onOpenListSpace?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenListSpace
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>India’s Go-To Workspace</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Redefining where and how modern teams work.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Celpin brings the perfect synthesis of boutique café hospitality, ergonomic comfort, and enterprise-grade tech infrastructure to professionals and growing teams across India.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section: Why Choose Celpin? */}
      <section className="py-16 sm:py-24 bg-card/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>Why choose Celpin?</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Effortless productivity, designed around how you actually work.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you are deep in focused solo work or brainstorming with your team, Celpin brings ease, comfort, and hospitality to your workday. As India’s go-to workspace, we combine thoughtfully designed environments with total flexibility—so you can show up, plug in, and get right into your flow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Spaces for every work style
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reserve ergonomic desks, collaboration zones, and private meeting pods in minutes. Pick the exact setting that matches your energy and tasks for the day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" />
                <span>Instant on-demand reservation</span>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Frictionless amenities
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enjoy high-speed optical Wi-Fi and café-style table service delivered directly to your desk. Stay fueled with fresh barista brews without losing your momentum.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-primary">
                <Coffee className="h-4 w-4" />
                <span>Desk-delivered refreshments</span>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Complete freedom
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Work with zero lock-in. Choose hourly desks, day passes, or flexible recurring packages—without long leases, security deposits, or hidden maintenance costs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-primary">
                <Clock className="h-4 w-4" />
                <span>Zero lock-in or commitments</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('booking')}
              className="inline-flex items-center justify-center font-bold transition-all bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2.5 text-base h-12 px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>Book a Workspace</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Story & Vision */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground mb-4">
                <Compass className="h-3.5 w-3.5 text-primary" />
                <span>Our story</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Born to bridge the gap between noisy cafés and rigid offices.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                We observed millions of creators, remote software engineers, and founders struggling with an everyday dilemma: traditional corporate leases are cumbersome and expensive, while neighborhood coffee shops lack power sockets, quiet acoustic zones, and reliable connectivity.
              </p>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Celpin was created to offer the best of both worlds—an effortless ecosystem of neighborhood spaces designed for focus, paired with frictionless access passes and warm hospitality.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-card">
                  <p className="font-display text-2xl font-black text-primary">100%</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">Flexible passes with zero lock-in</p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <p className="font-display text-2xl font-black text-primary">&lt; 5 sec</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">Turnstile QR scan & desk access</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-border">
                <img
                  src="https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="Modern coworking community working comfortably at Celpin"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-xl border border-border bg-card/95 backdrop-blur-md p-4 shadow-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Hospitality-Driven</p>
                    <p className="text-[11px] text-muted-foreground">Every seat curated for peak flow state.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Ready to elevate your workday?
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            Experience India’s go-to workspace today. Choose your seat, scan in, and enjoy work with zero friction.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('booking')}
              className="inline-flex items-center justify-center font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 text-sm h-11 px-6 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Book a Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            {onOpenListSpace && (
              <button
                type="button"
                onClick={onOpenListSpace}
                className="inline-flex items-center justify-center font-medium bg-card hover:bg-accent text-foreground border border-border/80 rounded-xl gap-2 text-sm h-11 px-5 shadow-xs transition-all cursor-pointer"
              >
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Partner with Celpin</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

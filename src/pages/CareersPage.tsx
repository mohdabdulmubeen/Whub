import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Mail,
  ArrowRight,
  Clock,
  Compass,
  CheckCircle2,
  X,
  Send,
  Bell,
  Search,
  Filter,
  Users,
  Heart,
  ShieldCheck,
  Zap,
  Coffee,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { JobListing } from '../types';

interface CareersPageProps {
  onNavigate?: (page: string, params?: any) => void;
  initialOpenings?: JobListing[];
}

export const CareersPage: React.FC<CareersPageProps> = ({
  onNavigate,
  initialOpenings = []
}) => {
  // Configurable openings list (defaults to 0 openings / empty state)
  const [openings, setOpenings] = useState<JobListing[]>(initialOpenings);

  // Filter & Search states (ready for when openings exist)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Interest Modal state
  const [isInterestModalOpen, setIsInterestModalOpen] = useState<boolean>(false);
  const [prefilledRole, setPrefilledRole] = useState<string>('');
  const [interestFormData, setInterestFormData] = useState({
    name: '',
    email: '',
    area: 'Engineering',
    portfolio: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Email Notification / Alert state
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertSubmitted, setAlertSubmitted] = useState<boolean>(false);

  // Detail Modal for a specific job
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // FAQ Accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);


  const handleOpenInterestModal = (roleTitle: string = '') => {
    setPrefilledRole(roleTitle);
    setIsSubmitted(false);
    setIsInterestModalOpen(true);
  };

  const handleCloseInterestModal = () => {
    setIsInterestModalOpen(false);
    setPrefilledRole('');
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestFormData.name || !interestFormData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;
    setAlertSubmitted(true);
  };

  // Departments list for filtering
  const departments = ['All', ...Array.from(new Set(openings.map(j => j.department)))];

  const filteredOpenings = openings.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesQuery =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  const faqs = [
    {
      q: 'How frequently do new roles become available?',
      a: 'We evaluate our team needs on an ongoing basis as we expand our facilities and tech platform. Check back regularly or register for email updates below to be the first to know.'
    },
    {
      q: 'Do you consider general or speculative applications?',
      a: 'Absolutely. Many of our best team additions started through an open introduction. If you believe your skills align with our mission, please submit your details through the form on this page.'
    },
    {
      q: 'What is your stance on remote and flexible work?',
      a: 'We support flexible, hybrid, and remote workflows where appropriate, alongside on-site operational roles. We value outcomes, thoughtful communication, and deep focus above rigid face-time.'
    },
    {
      q: 'What can I expect from the conversation process?',
      a: 'We respect your time. Our typical flow consists of an initial informal chat, a practical discussion or work review relevant to your discipline, and conversations with future teammates.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-card/40 to-background py-16 sm:py-24">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur-sm shadow-xs mb-6">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Careers & Opportunities</span>
          </div>

          {/* Page Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Build meaningful spaces &amp; tools with us
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            We are dedicated to shaping better ways for people to work, collaborate, and connect. Discover our culture and how you can be part of our future.
          </p>

          {/* Quick status pill */}
          <div className="mt-8 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium bg-muted text-muted-foreground border border-border">
              <span className={`h-2 w-2 rounded-full ${openings.length > 0 ? 'bg-success animate-pulse' : 'bg-amber-500'}`} />
              {openings.length > 0 ? `${openings.length} active openings` : 'Currently no active openings'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        {openings.length === 0 ? (
          /* ====================================================================
             INTENTIONAL, POLISHED EMPTY STATE
             ==================================================================== */
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 sm:p-12 text-center backdrop-blur-sm shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
              <Compass className="h-8 w-8" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              No open positions right now
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We aren’t actively recruiting for specific openings at this time. However, our team is always eager to connect with thoughtful, curious people who are passionate about craftsmanship, technology, and hospitality.
            </p>

            {/* Empty State Action Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto text-left">
              {/* Option 1: General Application */}
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-background/80 p-6 shadow-xs hover:border-primary/50 transition-colors">
                <div>
                  <div className="flex items-center gap-2.5 text-primary font-semibold text-sm mb-2">
                    <Mail className="h-4 w-4" />
                    <span>General application</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-base">Introduce yourself</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Tell us what you do best, what you love to build, and how you’d like to collaborate with us.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => handleOpenInterestModal()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition cursor-pointer"
                  >
                    <span>Submit general interest</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Option 2: Get Notified */}
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-background/80 p-6 shadow-xs hover:border-primary/50 transition-colors">
                <div>
                  <div className="flex items-center gap-2.5 text-primary font-semibold text-sm mb-2">
                    <Bell className="h-4 w-4" />
                    <span>Future openings</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-base">Stay in the loop</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Leave your email to receive an early notification as soon as new positions open up.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  {alertSubmitted ? (
                    <div className="flex items-center gap-2 text-sm text-success font-medium py-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>You're on the list! We'll keep you updated.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleAlertSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        className="flex-1 min-w-0 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Email address for future job alerts"
                      />
                      <button
                        type="submit"
                        className="rounded-xl border border-border bg-card hover:bg-accent px-3 py-2 text-sm font-medium text-foreground transition cursor-pointer"
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Back to Workspace CTA */}
            {onNavigate && (
              <div className="mt-10 pt-8 border-t border-border/60">
                <p className="text-sm text-muted-foreground">
                  In the meantime, feel free to explore our spaces.{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('booking')}
                    className="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Book a workspace &rarr;
                  </button>
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ====================================================================
             ACTIVE OPENINGS LISTINGS (Scalable structure for when roles are live)
             ==================================================================== */
          <div className="space-y-8">
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-6 border-b border-border">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by role, keyword, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Search job openings"
                />
              </div>

              {/* Department Pills */}
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter by department">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Cards Grid */}
            {filteredOpenings.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-border p-8">
                <p className="text-muted-foreground text-sm">
                  No roles match your search filters.{' '}
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDept('All');
                    }}
                    className="text-primary font-semibold hover:underline cursor-pointer"
                  >
                    Clear filters
                  </button>
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOpenings.map((job) => (
                  <article
                    key={job.id}
                    className="group rounded-2xl border border-border bg-card/60 p-6 transition-all hover:border-primary/50 hover:shadow-md backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                          {job.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => setSelectedJob(job)}
                          className="rounded-xl border border-border bg-card hover:bg-accent px-4 py-2 text-sm font-medium text-foreground transition cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenInterestModal(job.title)}
                          className="rounded-xl bg-primary hover:bg-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Culture & Values Section (Valuable in both empty and populated states) */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-primary">
              Our principles
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
              What we value &amp; how we work
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              Even as roles open and close, our core values guide how we collaborate, treat each other, and serve our community.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-base">Agency &amp; ownership</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We believe in small, autonomous teams empowered to make decisions and solve real problems without needless bureaucracy.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-base">Hospitality &amp; care</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Every detail matters—from digital interactions to physical desk ergonomics, our focus is on genuine human comfort.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-base">Craftsmanship</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We take immense pride in durable systems, clean user interfaces, and thoughtful architecture built to last.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Coffee className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground text-base">Sustainable pace</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                High-quality creative thinking requires rest and space. We promote healthy working rhythms and long-term stamina.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-20 pt-16 border-t border-border max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Common questions about career opportunities, speculative applications, and our culture.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-medium text-foreground hover:bg-accent/50 transition cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          GENERAL INTEREST / OPEN APPLICATION MODAL
          ==================================================================== */}
      {isInterestModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="interest-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseInterestModal}
              className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Thank you for reaching out
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  We have received your details. While we don’t have immediate openings, our team reviews incoming introductions regularly and will reach out if a matching opportunity emerges.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCloseInterestModal}
                    className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {prefilledRole ? `Applying for ${prefilledRole}` : 'Open Introduction'}
                  </span>
                  <h3 id="interest-modal-title" className="mt-1 font-display text-2xl font-bold text-foreground">
                    Connect With Our Team
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Share a little about yourself and what you enjoy working on.
                  </p>
                </div>

                <form onSubmit={handleInterestSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={interestFormData.name}
                      onChange={(e) => setInterestFormData({ ...interestFormData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={interestFormData.email}
                      onChange={(e) => setInterestFormData({ ...interestFormData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Primary Discipline / Area of Interest
                    </label>
                    <select
                      value={interestFormData.area}
                      onChange={(e) => setInterestFormData({ ...interestFormData, area: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Engineering">Engineering &amp; Technology</option>
                      <option value="Design">Product &amp; Visual Design</option>
                      <option value="Operations">Hospitality &amp; Operations</option>
                      <option value="Community">Community &amp; Events</option>
                      <option value="General">General / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Portfolio, LinkedIn, or Website (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={interestFormData.portfolio}
                      onChange={(e) => setInterestFormData({ ...interestFormData, portfolio: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Brief Note or Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the problems you like solving or what draws you to our work..."
                      value={interestFormData.message}
                      onChange={(e) => setInterestFormData({ ...interestFormData, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseInterestModal}
                      className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Submit Interest</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          JOB DETAILS MODAL (When viewing active openings)
          ==================================================================== */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {selectedJob.department}
              </span>
              <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {selectedJob.location}
              </span>
              <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {selectedJob.type}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-foreground">
              {selectedJob.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{selectedJob.description || selectedJob.summary}</p>

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">Key Highlights</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedJob.title;
                  setSelectedJob(null);
                  handleOpenInterestModal(title);
                }}
                className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition cursor-pointer"
              >
                Apply for this Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;

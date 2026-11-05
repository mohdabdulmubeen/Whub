import React from 'react';
import {
  Target,
  Lightbulb,
  Rocket,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ProposalPage: React.FC = () => {
  const sections = [
    { id: 'executive', title: 'Executive Summary' },
    { id: 'problem', title: 'Problem Statement' },
    { id: 'solution', title: 'Solution' },
    { id: 'audience', title: 'Target Audience' },
    { id: 'journey', title: 'Core User Journey' },
    { id: 'features', title: 'MVP Features' },
    { id: 'tech', title: 'Technology Stack' },
    { id: 'monetization', title: 'Monetization Strategy' }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Title */}
      <div className="mb-10">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground mb-3">
          Product Management · MVP Proposal
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Celpin — Smart Co-Working Café
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          A web application that combines the café experience with the functionality of a co-working space. Book a workspace by the hour, pre-order coffee to your seat, and check in with a QR code.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
            Version 1.0
          </span>
          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
            MVP
          </span>
          <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
            Aug 2026
          </span>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="rounded-xl border border-border bg-card/60 p-4 mb-10 shadow-xs">
        <div className="flex flex-wrap gap-2">
          {sections.map(sec => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* 1. Executive Summary */}
      <section id="executive" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">1. Executive Summary</h2>
        </div>
        <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
          <p>
            Celpin is a web application that enables customers to book a workspace by the hour within a café environment, combining the comfort and ambiance of a café with the functionality of a co-working space. The MVP targets freelancers, remote workers, students, and professionals who need a flexible, productive workspace for 1–6 hours without the commitment of a traditional co-working membership.
          </p>
          <p>
            The core value proposition is simple: <strong>reserve flexible workspace on demand, work where you're comfortable, and have great coffee delivered to your seat.</strong> With real-time seat availability, four distinct workspace zones, instant digital access passes, integrated café pre-orders, QR-based check-in, and a loyalty rewards system, Celpin delivers a 10/10 experience that merges productivity with café comfort.
          </p>
        </div>
      </section>

      {/* 2. Problem Statement */}
      <section id="problem" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">2. Problem Statement</h2>
        </div>
        <ul className="space-y-3 mt-4">
          {[
            'Traditional co-working spaces require rigid monthly commitments and upfront deposits — impractical for someone who just needs a desk for a few hours.',
            'Regular cafés have unpredictable seating, no guarantee of power sockets, inconsistent Wi-Fi, and implicit pressure to keep ordering food.',
            'There is no way to know in advance whether a café has available seats, leading to wasted trips and frustration.',
            'Freelancers and students lack a professional yet affordable environment for focused work, video calls, or small team meetings.',
            'No existing platform seamlessly combines workspace booking with food and beverage ordering for direct desk delivery.'
          ].map((prob, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/15 text-destructive text-xs font-bold shrink-0 mt-0.5">!</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{prob}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Solution */}
      <section id="solution" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Rocket className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">3. Solution</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">See live availability</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive 2D floor map shows which seats are free in real-time.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Choose your zone</p>
            <p className="text-xs text-muted-foreground mt-1">Quiet Zone, Collaboration Table, Window Seat, or Premium Desk.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">On-demand access</p>
            <p className="text-xs text-muted-foreground mt-1">Flexible 1–6 hour sessions with instant digital confirmation.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Pre-order to your seat</p>
            <p className="text-xs text-muted-foreground mt-1">Coffee and food delivered upon check-in without waiting in lines.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Check in with QR</p>
            <p className="text-xs text-muted-foreground mt-1">Zero staff friction — scan your digital QR code at entry and sit.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Earn rewards</p>
            <p className="text-xs text-muted-foreground mt-1">Credits on every booking, redeemable for free hours and free coffee.</p>
          </div>
        </div>
      </section>

      {/* 4. Target Audience */}
      <section id="audience" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">4. Target Audience</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Freelancers</p>
            <p className="text-xs text-muted-foreground mt-1">Designers, writers, developers needing a professional workspace between client meetings.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Remote Workers</p>
            <p className="text-xs text-muted-foreground mt-1">Work-from-home pros who need a refreshing change of environment and guaranteed power.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Students</p>
            <p className="text-xs text-muted-foreground mt-1">University students studying for exams or collaborating on team assignments.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="font-semibold text-sm text-foreground">Entrepreneurs & Small Teams</p>
            <p className="text-xs text-muted-foreground mt-1">Founders hosting small team sprints without office lease overhead.</p>
          </div>
        </div>
      </section>

      {/* 5. Core User Journey */}
      <section id="journey" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ArrowRight className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">5. Core User Journey</h2>
        </div>
        <div className="space-y-4 text-sm">
          {[
            { step: '01', title: 'Discover', desc: 'User lands on Celpin, explores zone features, and checks the live floor map.' },
            { step: '02', title: 'Select Workspace', desc: 'Selects Quiet Zone, Collaboration Table, Window Seat, or Premium Desk.' },
            { step: '03', title: 'Choose Duration', desc: 'Chooses 1–6 hours with flexible on-demand allocation.' },
            { step: '04', title: 'Add Café Pre-Orders', desc: 'Adds cappuccino, cold brew, or meals to be delivered upon arrival.' },
            { step: '05', title: 'Pass Generation', desc: 'Instant pass creation with encrypted dynamic QR and backup turnstile PIN.' },
            { step: '06', title: 'Work', desc: 'Scans QR pass at entrance scanner; desk unlocks and barista begins order.' },
            { step: '07', title: 'Rate & Earn', desc: 'Submits 5-star rating on Wi-Fi and comfort, earning bonus loyalty credits.' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-3 rounded-xl bg-card border border-border">
              <span className="font-display font-bold text-primary text-base shrink-0">{item.step}</span>
              <div>
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Technology Stack */}
      <section id="tech" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">6. Technology Stack</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-semibold text-primary uppercase">Frontend</p>
            <p className="font-medium mt-1">React 18 + TypeScript + Vite + Tailwind CSS</p>
            <p className="text-xs text-muted-foreground mt-1">Fast, responsive UI with custom design tokens and dark mode.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-semibold text-primary uppercase">Backend</p>
            <p className="font-medium mt-1">Node.js + Express.js REST API</p>
            <p className="text-xs text-muted-foreground mt-1">Modular endpoints for seats, bookings, café menu, rewards, and AI chat.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-semibold text-primary uppercase">Icons & Design</p>
            <p className="font-medium mt-1">Lucide React & Plus Jakarta Sans</p>
            <p className="text-xs text-muted-foreground mt-1">Modern iconography and typography matching the original Celpin identity.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs font-semibold text-primary uppercase">AI Concierge</p>
            <p className="font-medium mt-1">Contextual Chatbot Assistant</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive widget answering questions on amenities, zones, menu, and passes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

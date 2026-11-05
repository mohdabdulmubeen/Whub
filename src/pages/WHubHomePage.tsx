import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Users, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Mail, 
  Instagram,
  Compass,
  Zap,
  Building2
} from 'lucide-react';
import { WHubLogo } from '../components/WHubLogo';
import { SummitGallery } from '../components/SummitGallery';
import { ReelCard } from '../components/ReelCard';
import { ProgramsSection } from '../components/ProgramsSection';
import { StartupDirectory } from '../components/StartupDirectory';

interface WHubHomePageProps {
  onOpenApply: (role?: 'startup' | 'mentor' | 'student') => void;
}

export const WHubHomePage: React.FC<WHubHomePageProps> = ({ onOpenApply }) => {
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState('');

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpEmail) {
      setRsvpSuccess(true);
      setTimeout(() => setRsvpSuccess(false), 4000);
      setRsvpEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section id="top" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#fbfaf6] dark:bg-slate-950 text-slate-900 dark:text-white">
        {/* Background radial gradient halos */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-300/60 dark:border-orange-800/60 shadow-sm">
                <Sparkles size={13} className="text-orange-500" />
                <span>The Startup & Innovation Catalyst of Warangal</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-display font-black tracking-tight leading-[1.08]">
                From Ideas to Impact. <br />
                <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 bg-clip-text text-transparent">
                  Build What's Next in Warangal.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Inspired by the scale and institutional power of <strong>T-Hub</strong>, <strong>W-Hub</strong> unites founders, mentors, venture investors, and research scholars from <strong>NIT Warangal</strong> and premier institutions to turn bold ideas into category-defining companies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenApply('startup')}
                  className="px-7 py-4 rounded-2xl font-display font-extrabold text-base bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:brightness-110 shadow-xl shadow-orange-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  <Rocket size={18} />
                  Apply for Incubation
                </button>

                <a
                  href="#reels"
                  className="px-6 py-4 rounded-2xl font-display font-bold text-base bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-orange-500 shadow-md transition flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Play size={13} fill="currentColor" />
                  </div>
                  Watch Summit Reel
                </a>
              </div>

              {/* Institutional Endorsement Bar */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>NIT Warangal & College Enabler</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Warangal Open Mic Series</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  <span>Pre-Seed & Angel Syndicate</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual with Official 3D Emblem */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 via-amber-400/20 to-blue-600/30 rounded-full blur-2xl group-hover:blur-3xl transition duration-500" />

                {/* Floating Card Badge Container */}
                <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center">
                  
                  {/* The Official W-Hub circular emblem */}
                  <div className="relative p-2 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-700 shadow-xl mb-4">
                    <img
                      src="/images/w-hub-logo.jpg"
                      alt="W-Hub Warangal Official Crest"
                      className="w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover shadow-inner ring-4 ring-amber-300/80"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm">
                      Official Ecosystem Portal
                    </span>
                    <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white pt-1">
                      W-Hub Warangal
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Startups & Innovation Ecosystem
                    </p>
                  </div>

                  {/* Direct Contact Pill */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 w-full flex items-center justify-between text-xs">
                    <a
                      href="mailto:contact.w.hub@gmail.com"
                      className="text-slate-600 dark:text-slate-300 hover:text-orange-500 font-semibold flex items-center gap-1.5"
                    >
                      <Mail size={14} className="text-orange-500" />
                      contact.w.hub@gmail.com
                    </a>
                    <a
                      href="https://www.instagram.com/whubwgl/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <Instagram size={14} />
                      @Whubwgl
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Live Metrics Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <strong className="block font-display text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400">
                45+
              </strong>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
                Startups in Pipeline
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <strong className="block font-display text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                250+
              </strong>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
                Summit 2026 Delegates
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <strong className="block font-display text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                1,200+
              </strong>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
                Students & Innovators
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <strong className="block font-display text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">
                ₹1.8 Cr+
              </strong>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 block">
                Grants & Capital Value
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ECOSYSTEM PILLARS: WHY WARANGAL & W-HUB */}
      <section id="ecosystem" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 mb-3">
              <Compass size={13} />
              The Warangal Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Building from Warangal Matters
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Warangal is rapidly transforming from a historic heritage capital into Telangana’s primary tier-2 innovation engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Premier Academic Crucible
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Home to the prestigious <strong>NIT Warangal</strong>, Kakatiya University, and dozens of tech institutes delivering world-class STEM graduates and research labs every year.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Hyper-Efficient Runway
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Enjoy 60% lower operating and burn costs than tier-1 metros, letting founders stay laser-focused on iterative product development and customer retention.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Grassroots Operator Network
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Active monthly Open Mics, founder fireside circles, and direct syndicate reviews providing hands-on validation from founders who’ve scaled businesses.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FLAGSHIP PROGRAMS (T-Hub Style) */}
      <ProgramsSection onOpenApply={onOpenApply} />

      {/* 4. REAL SUMMIT 2026 GALLERY */}
      <SummitGallery />

      {/* 5. INSTAGRAM REELS & SOCIAL MOVEMENT */}
      <ReelCard />

      {/* 6. STARTUPS DIRECTORY */}
      <StartupDirectory onOpenApply={() => onOpenApply('startup')} />

      {/* 7. UPCOMING EVENTS & OPEN MIC */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Event Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300/60">
                <Calendar size={13} />
                Next Grassroots Gathering
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                Warangal Open Mic #2: Pitch & Connect
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Got a prototype or early idea? Pitch directly to fellow founders, angel enablers, and student developers. No slides required — just 3 minutes of raw founder vision.
              </p>

              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center">
                    <Calendar size={16} />
                  </div>
                  <span><strong>Date:</strong> Next Saturday, 5:00 PM – 7:30 PM IST</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span><strong>Venue:</strong> W-Hub Co-Working Hall, Hanamkonda (Near NITW)</span>
                </div>
              </div>
            </div>

            {/* Quick RSVP Box */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  Reserve Your Spot
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Seating is capped to maintain intimate founder feedback. Confirm your attendance below:
                </p>

                {rsvpSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 size={18} />
                    RSVP Confirmed! See you at Warangal Open Mic #2.
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/30 transition"
                    >
                      Confirm Free RSVP
                    </button>
                  </form>
                )}

                <div className="mt-4 text-center">
                  <span className="text-[11px] text-slate-400">
                    Or message us directly at <a href="mailto:contact.w.hub@gmail.com" className="text-orange-500 hover:underline">contact.w.hub@gmail.com</a>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. BOTTOM HERO CTA BANNER */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Rocket size={24} className="text-amber-200" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
            Have an Ambitious Idea? Let’s Build it in Warangal.
          </h2>

          <p className="text-orange-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are a student team testing a prototype, a full-time founder seeking seed capital, or an industry mentor wanting to give back — W-Hub is your launchpad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenApply('startup')}
              className="px-8 py-4 rounded-2xl font-display font-extrabold text-base bg-white text-orange-600 hover:bg-orange-50 shadow-2xl transition transform hover:-translate-y-0.5"
            >
              Apply as a Startup
            </button>
            <button
              onClick={() => onOpenApply('mentor')}
              className="px-8 py-4 rounded-2xl font-display font-extrabold text-base bg-orange-950/40 text-white border border-white/30 hover:bg-orange-950/60 shadow-lg transition"
            >
              Join as Mentor / Investor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WHubHomePage;


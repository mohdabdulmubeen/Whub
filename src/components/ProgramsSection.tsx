import React from 'react';
import { Lightbulb, TrendingUp, Landmark, Building2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ProgramsSectionProps {
  onOpenApply: (role?: 'startup' | 'mentor' | 'student') => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenApply }) => {
  const programs = [
    {
      id: 'w-incubate',
      badge: 'Incubation & Scaling',
      title: 'W-Edge Founder Program',
      subtitle: 'Inspired by T-Hub Lab32',
      description: 'A structured 16-week cohort for early-stage tech founders across Warangal to validate product-market fit, refine unit economics, and prepare for institutional capital.',
      metrics: 'Mentorship • Cloud Credits • Legal & Compliance',
      icon: TrendingUp,
      color: 'from-orange-500 to-amber-600',
      actionRole: 'startup' as const
    },
    {
      id: 'w-campus',
      badge: 'Academic Innovation',
      title: 'W-Campus Catalyst',
      subtitle: 'In partnership with NIT Warangal & Universities',
      description: 'Democratizing entrepreneurship among 20,000+ students in Warangal. Translating classroom engineering, AI, and patent-worthy hardware into real venture spinouts.',
      metrics: 'Hackathons • Student Grants • Lab Access',
      icon: Landmark,
      color: 'from-blue-600 to-indigo-700',
      actionRole: 'student' as const
    },
    {
      id: 'w-angel',
      badge: 'Capital Connect',
      title: 'W-Angel Syndicate',
      subtitle: 'Bridging Warangal to Global VCs',
      description: 'Direct demo days and closed-door pitch sessions connecting Warangal founders with prominent angel syndicates, alumni venture funds, and Hyderabad-Bengaluru VCs.',
      metrics: '₹15L – ₹1 Cr Ticket Size • Deal Curation',
      icon: Zap,
      color: 'from-emerald-500 to-teal-700',
      actionRole: 'mentor' as const
    },
    {
      id: 'w-space',
      badge: 'Co-Working & Hub',
      title: 'W-Hub Innovation Campus',
      subtitle: 'State-of-the-art Infrastructure in Warangal',
      description: 'High-speed gigabit Wi-Fi, collaborative hot desks, podcast recording room, event auditorium, and conference spaces built for innovators who work with urgency.',
      metrics: '24/7 Access • Meeting Rooms • Community Lounge',
      icon: Building2,
      color: 'from-purple-600 to-pink-600',
      actionRole: 'startup' as const
    }
  ];

  return (
    <section id="programs" className="py-20 relative bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 mb-3">
            <Lightbulb size={13} />
            Institutional Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            How W-Hub Enables Every Stage of Growth
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Adopting proven accelerator models from India’s top innovation hubs to create high-velocity support pipelines right here in Warangal.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="group relative rounded-3xl p-8 bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-orange-500/40 dark:hover:border-orange-500/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={26} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1">
                    {prog.title}
                  </h3>
                  <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-4">
                    {prog.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>{prog.metrics}</span>
                  </div>

                  <button
                    onClick={() => onOpenApply(prog.actionRole)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition"
                  >
                    Apply Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;


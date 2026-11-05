import React, { useState } from 'react';
import { Rocket, ExternalLink, Instagram, Award, Filter, Sparkles } from 'lucide-react';

interface Startup {
  id: string;
  name: string;
  category: string;
  stage: string;
  tagline: string;
  founder: string;
  origin: string;
  highlight: string;
  instagram?: string;
}

const startupsList: Startup[] = [
  {
    id: '1',
    name: 'AgriSens AI',
    category: 'AgriTech',
    stage: 'Pilot Stage',
    tagline: 'IoT soil health probes and AI pest warning systems for Telangana turmeric & cotton farmers.',
    founder: 'Srinivas Goud & Team',
    origin: 'NIT Warangal Incubation',
    highlight: '120+ Farms Deployed',
    instagram: '@agrisens_ai'
  },
  {
    id: '2',
    name: 'Kakatiya MedVision',
    category: 'HealthTech',
    stage: 'Seed Stage',
    tagline: 'Portable retinal screening AI device empowering tier-2 & rural diagnostic clinics.',
    founder: 'Dr. Divya Reddy',
    origin: 'Kakatiya Medical College / W-Hub',
    highlight: '₹25L Innovation Grant',
    instagram: '@medvision_warangal'
  },
  {
    id: '3',
    name: 'OorjaGrid',
    category: 'CleanTech',
    stage: 'MVP Stage',
    tagline: 'Decentralized smart solar-swapping battery pods for 2-wheelers and auto-rickshaws.',
    founder: 'Venkatesh Rao',
    origin: 'SR University Innovation',
    highlight: '8 Hubs in Tri-City'
  },
  {
    id: '4',
    name: 'Nirvaan DroneTech',
    category: 'Hardware',
    stage: 'Prototype',
    tagline: 'Autonomous agricultural spray and crop inspection drones with thermal imaging.',
    founder: 'Rohit K. & Abhishek P.',
    origin: 'NIT Warangal Alum',
    highlight: 'DGCA Compliant Design',
    instagram: '@nirvaandrones'
  },
  {
    id: '5',
    name: 'VidyaBridge Telugu',
    category: 'EdTech',
    stage: 'Scaling',
    tagline: 'Vernacular tech skills and coding mentorship platform for students across Telangana.',
    founder: 'Pooja Vangala',
    origin: 'Kakatiya University',
    highlight: '15,000+ Enrolled'
  },
  {
    id: '6',
    name: 'GraminPay Micro',
    category: 'AI & SaaS',
    stage: 'Idea Stage',
    tagline: 'Voice-assisted vernacular UPI soundbox and daily khata book for Kirana merchants.',
    founder: 'Sai Charan Teja',
    origin: 'Warangal Open Mic Finalist',
    highlight: 'Summit 2026 Top Pitch'
  }
];

const categories = ['All', 'AgriTech', 'HealthTech', 'CleanTech', 'Hardware', 'EdTech', 'AI & SaaS'];

interface StartupDirectoryProps {
  onOpenApply: () => void;
}

export const StartupDirectory: React.FC<StartupDirectoryProps> = ({ onOpenApply }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredStartups = activeCategory === 'All'
    ? startupsList
    : startupsList.filter((s) => s.category === activeCategory);

  return (
    <section id="startups" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 mb-3">
              <Rocket size={13} />
              Warangal Innovators
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Startups Building from Warangal
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Discover ventures engineered in Warangal solving deep problems in agriculture, healthcare, hardware, clean energy, and education.
            </p>
          </div>

          <button
            onClick={onOpenApply}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-bold text-sm bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/25 transition whitespace-nowrap"
          >
            <Sparkles size={16} />
            Showcase Your Startup
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
            <Filter size={13} />
            Sector:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
                    {startup.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {startup.stage}
                  </span>
                </div>

                <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white mb-2">
                  {startup.name}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {startup.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Founder</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{startup.founder}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Incubated At</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{startup.origin}</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <Award size={13} />
                    {startup.highlight}
                  </div>

                  {startup.instagram && (
                    <a
                      href={`https://instagram.com/${startup.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <Instagram size={13} />
                      {startup.instagram}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StartupDirectory;


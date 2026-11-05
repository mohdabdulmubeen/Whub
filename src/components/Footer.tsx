import React from 'react';
import { WHubLogo } from './WHubLogo';
import { Mail, Instagram, MapPin, Heart, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenApply: (role?: 'startup' | 'mentor' | 'student') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <WHubLogo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              Warangal’s premier startup & innovation ecosystem. Catalyzing high-growth tech ventures, student founders, and mentor networks inspired by global incubator benchmarks.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/40 border border-orange-800/50 text-orange-400 text-xs font-semibold">
                <Sparkles size={13} />
                Ideas Today · Innovation Tomorrow
              </div>
            </div>
          </div>

          {/* Col 2: Official Contact & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact.w.hub@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition"
                >
                  <Mail size={16} className="text-orange-500" />
                  <span>contact.w.hub@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/whubwgl/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-pink-400 transition"
                >
                  <Instagram size={16} className="text-pink-500" />
                  <span>@Whubwgl on Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/reel/DcRG-5qzRU1/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300"
                >
                  <span>Featured Summit Reel</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-400 pt-1">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Warangal Innovation Zone, Telangana (near NIT Warangal & Hanamkonda)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Portals */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onOpenApply('startup')}
                  className="hover:text-orange-400 transition text-left"
                >
                  W-Edge Founder Cohort
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenApply('student')}
                  className="hover:text-orange-400 transition text-left"
                >
                  W-Campus Student Catalyst
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenApply('mentor')}
                  className="hover:text-orange-400 transition text-left"
                >
                  W-Angel Investor Syndicate
                </button>
              </li>
              <li>
                <a href="#summit" className="hover:text-orange-400 transition">
                  Warangal Open Mic
                </a>
              </li>
              <li>
                <a href="#summit" className="hover:text-orange-400 transition">
                  Summit 2026 Archives
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Apply & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Join the Ecosystem
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you building an innovative startup in Warangal or an investor looking for early tier-2 dealflow?
            </p>
            <div className="pt-1">
              <button
                onClick={() => onOpenApply('startup')}
                className="w-full py-2.5 px-4 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-110 text-white shadow-lg shadow-orange-600/20 transition flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                Submit Your Venture
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} W-Hub (Warangal Startups & Innovation Ecosystem). All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>for the ambitious founders of Warangal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

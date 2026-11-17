import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

const GooglePlayLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M3.25 1.5C3.1 1.7 3 2 3 2.4v19.2c0 .4.1.7.25.9L13.5 12 3.25 1.5z"
      fill="#00D3FF"
    />
    <path
      d="M17.3 8.2L13.5 12 3.25 1.5C3.6 1.2 4.1 1 4.7 1.3l12.6 6.9z"
      fill="#00F076"
    />
    <path
      d="M17.3 15.8L4.7 22.7c-.6.3-1.1.1-1.45-.2L13.5 12l3.8 3.8z"
      fill="#FF3A44"
    />
    <path
      d="M21.2 10.3l-3.9-2.1-3.8 3.8 3.8 3.8 3.9-2.1c1.1-.6 1.1-2.8 0-3.4z"
      fill="#FFE000"
    />
  </svg>
);

const AppleLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.02 2.78 1.03.08 2.09-.57 2.71-1.32z" />
  </svg>
);

export const CelpinFooter: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-border">
      {/* Single Line: Keep in touch & Download Celpin App */}
      <div className="bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            {/* Keep in touch */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-foreground">Keep in touch</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:support@celpin.cafe"
                  aria-label="Email"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Download Celpin App */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-foreground">Download Celpin App</span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#google-play"
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-800 text-white transition-all shadow-sm group"
                  aria-label="Get it on Google Play"
                >
                  <GooglePlayLogo className="h-5 w-5 shrink-0" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] font-semibold tracking-wider uppercase text-neutral-300">GET IT ON</span>
                    <span className="text-[12px] font-bold text-white tracking-tight mt-0.5">Google Play</span>
                  </div>
                </a>
                <a
                  href="#app-store"
                  className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-800 text-white transition-all shadow-sm group"
                  aria-label="Download on the App Store"
                >
                  <AppleLogo className="h-5 w-5 shrink-0 text-slate-200" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] font-medium tracking-tight text-neutral-300">Download on the</span>
                    <span className="text-[12px] font-bold text-white tracking-tight mt-0.5">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Section (Celpin Brand, Explore, Company): Minimalist Dark Grey Background */}
      <div className="bg-[#15171c] text-slate-200 border-t border-[#23262d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-3.5 mb-4 py-1 text-left cursor-pointer focus:outline-none group"
              >
                <img
                  src="/images/celpin-emblem.png"
                  alt="Celpin Coworking Space Logo"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover shadow-sm ring-1 ring-white/10 group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col justify-center py-0.5">
                  <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white leading-none mb-1.5">Celpin</span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Coworking Space</span>
                </div>
              </button>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Book premium coworking spaces, hot desks &amp; meeting rooms in minutes. Work from anywhere.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Explore</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => onNavigate('booking')} className="hover:text-white transition-colors cursor-pointer">
                    Book a seat
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('register')} className="hover:text-white transition-colors cursor-pointer">
                    Member registration
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('careers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Careers
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom line: Copyright */}
          <div className="mt-10 pt-6 border-t border-[#23262d] flex items-center justify-center">
            <p className="text-xs text-slate-400 text-center">© 2026 Celpin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CelpinFooter: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3.5 mb-6 py-1 text-left cursor-pointer focus:outline-none group"
            >
              <img
                src="/images/celpin-emblem.png"
                alt="Celpin Coworking Space Logo"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover shadow-sm ring-1 ring-border/50 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col justify-center py-0.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-none mb-1.5">Celpin</span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Coworking Space</span>
              </div>
            </button>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Book premium coworking spaces, hot desks &amp; meeting rooms in minutes. Work from anywhere.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => onNavigate('register', { redirectTo: 'booking' })} className="hover:text-foreground transition-colors cursor-pointer">
                  Book a Seat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-foreground transition-colors cursor-pointer">
                  Member Registration
                </button>
              </li>
              <li><span className="cursor-default">Pricing</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-default">About Us</span></li>
              <li><span className="cursor-default">Careers</span></li>
              <li><span className="cursor-default">Contact</span></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@celpin.cafe"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 Celpin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

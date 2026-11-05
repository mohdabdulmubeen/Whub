import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useI18n } from '../i18n/I18nContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
}

export const CelpinNavbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { id: 'home', labelKey: 'nav.home', defaultLabel: 'Home' },
    { id: 'booking', labelKey: 'nav.bookSeat', defaultLabel: 'Book a Seat' },
  ];

  return (
    <header role="banner" className="fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-background/85 backdrop-blur-md border-b border-border/70">
      <nav aria-label="Main Navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 sm:h-20 items-center justify-between py-2">
          {/* Official Celpin Logo (Top) */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Celpin Coworking Space — Home"
            className="flex items-center gap-3.5 py-1 group text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden rounded-xl"
          >
            <img
              src="/images/celpin-official-logo.png"
              alt="Celpin Logo"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col justify-center py-0.5">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-none mb-1.5">Celpin</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Coworking Space</span>
            </div>
          </button>

          {/* Desktop Nav (Only Home & Book a Seat) */}
          <div className="hidden md:flex items-center gap-2" role="menubar">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              const label = t(link.labelKey, link.defaultLabel);
              return (
                <button
                  key={link.id}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden ${
                    isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Actions: Clean & Minimal (Theme Toggle, Member Sign In, Book a Seat) */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Member Sign In Button */}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-muted-foreground hover:text-foreground border border-border/80 bg-card/60 hover:bg-accent h-9 rounded-xl px-3.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>

            {/* Primary Action Button - Direct Booking */}
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-xl px-4 shadow-xs hover:shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t('nav.bookNow', 'Book a Seat')}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden border border-border text-muted-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map(link => {
              const label = t(link.labelKey, link.defaultLabel);
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                onNavigate('register');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3.5 py-2.5 rounded-xl text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
            >
              Member Sign In / Account
            </button>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                onClick={() => {
                  onNavigate('booking');
                  setMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center text-sm font-semibold bg-primary text-primary-foreground h-10 rounded-xl cursor-pointer shadow-xs"
              >
                {t('nav.bookNow', 'Book a Seat')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

import React, { useState } from 'react';
import { WHubLogo } from './WHubLogo';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Mail, Instagram, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenApply: (role?: 'startup' | 'mentor' | 'student') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Programs', href: '#programs' },
    { label: 'Summit 2026', href: '#summit' },
    { label: 'Reels', href: '#reels' },
    { label: 'Startups', href: '#startups' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a href="#top" className="hover:opacity-95 transition">
            <WHubLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/whubwgl/"
              target="_blank"
              rel="noreferrer"
              title="Follow @Whubwgl on Instagram"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-800 transition"
            >
              <Instagram size={18} />
            </a>

            {/* Email Link */}
            <a
              href="mailto:contact.w.hub@gmail.com"
              title="Email contact.w.hub@gmail.com"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800 transition"
            >
              <Mail size={18} />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Join / Apply CTA */}
            <button
              onClick={() => onOpenApply('startup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:brightness-110 shadow-lg shadow-orange-600/25 transition"
            >
              <Sparkles size={15} />
              Join W-Hub
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-around py-2">
              <a
                href="https://www.instagram.com/whubwgl/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400"
              >
                <Instagram size={16} />
                @Whubwgl
              </a>
              <a
                href="mailto:contact.w.hub@gmail.com"
                className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400"
              >
                <Mail size={16} />
                contact.w.hub@gmail.com
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply('startup');
              }}
              className="w-full py-3 rounded-xl font-display font-bold text-center text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Join / Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React from 'react';

interface WHubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const WHubLogo: React.FC<WHubLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative group cursor-pointer">
        {/* Glowing pulse aura */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 opacity-60 blur-sm group-hover:opacity-100 transition duration-500" />
        
        {/* 3D Circular Emblem */}
        <img
          src="/images/w-hub-logo.jpg"
          alt="W-Hub | Warangal Startups & Innovation Ecosystem"
          className={`relative ${sizeClasses[size]} rounded-full object-cover shadow-lg ring-2 ring-amber-400/80 transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold tracking-tight text-xl sm:text-2xl text-slate-900 dark:text-white leading-none">
              W-Hub
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm">
              Warangal
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
            Startups & Innovation Ecosystem
          </span>
        </div>
      )}
    </div>
  );
};

export default WHubLogo;


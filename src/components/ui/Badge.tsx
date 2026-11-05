import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'processing' | 'warning' | 'error' | 'default';
  count?: number | string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'default',
  count,
  dot = false,
  children,
  className = '',
  ...props
}) => {
  const statusColors = {
    success: 'bg-emerald-500 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 bg-emerald-500/10',
    processing: 'bg-blue-500 text-blue-700 dark:text-blue-300 border-blue-500/20 bg-blue-500/10',
    warning: 'bg-amber-500 text-amber-700 dark:text-amber-300 border-amber-500/20 bg-amber-500/10',
    error: 'bg-destructive text-destructive border-destructive/20 bg-destructive/10',
    default: 'bg-secondary text-secondary-foreground border-border',
  };

  const dotColors = {
    success: 'bg-emerald-500',
    processing: 'bg-blue-500 animate-pulse',
    warning: 'bg-amber-500',
    error: 'bg-destructive',
    default: 'bg-muted-foreground',
  };

  if (children) {
    return (
      <span className={`relative inline-flex items-center ${className}`} {...props}>
        {children}
        {dot && (
          <span
            className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-background ${dotColors[status]}`}
            aria-hidden="true"
          />
        )}
        {count !== undefined && !dot && (
          <span
            className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-primary shadow-xs leading-none`}
          >
            {count}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[status]} ${className}`}
      {...props}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColors[status]}`} aria-hidden="true" />
      {count}
    </span>
  );
};

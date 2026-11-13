import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Sparkles,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { DateRangeCalendar, DateRangeValue } from './DateRangeCalendar';
import { formatDisplayDate, formatRangeSummary, getDaysDifference, getTodayStr } from '../utils/dateUtils';

export interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (range: DateRangeValue) => void;
  minDate?: string;
  maxDate?: string;
  mode?: 'range' | 'single';
  showPresets?: boolean;
  highlightedDates?: string[];
  unavailableDates?: string[];
  className?: string;
  buttonClassName?: string;
  label?: string;
  placeholder?: string;
  inline?: boolean;
  disabled?: boolean;
  align?: 'left' | 'right' | 'center';
  compact?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  mode = 'range',
  showPresets = true,
  highlightedDates = [],
  unavailableDates = [],
  className = '',
  buttonClassName = '',
  label,
  placeholder = 'Select Dates',
  inline = false,
  disabled = false,
  align = 'left',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If inline mode is requested, render DateRangeCalendar directly
  if (inline) {
    return (
      <div className={className}>
        {label && (
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <DateRangeCalendar
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          mode={mode}
          showPresets={showPresets}
          highlightedDates={highlightedDates}
          unavailableDates={unavailableDates}
          inline={true}
        />
      </div>
    );
  }

  // Outside click listener to auto-close popover
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const daysCount = getDaysDifference(startDate, endDate);

  const formattedStart = startDate ? formatDisplayDate(startDate, { includeDayOfWeek: false, includeYear: false }) : '';
  const formattedEnd = endDate ? formatDisplayDate(endDate, { includeDayOfWeek: false, includeYear: false }) : '';

  // In range mode, if startDate === endDate (or no range set), show "Select Dates" instead of "Nov 11" with "1d"
  const hasRangeSelected = Boolean(startDate && endDate && startDate !== endDate);

  // Formatted trigger label
  const displaySummary = mode === 'single'
    ? (startDate ? formattedStart : placeholder)
    : hasRangeSelected
    ? `${formattedStart} – ${formattedEnd}`
    : placeholder;

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      {label && (
        <label className="block text-[11px] font-semibold text-muted-foreground mb-1 truncate">
          {label}
        </label>
      )}

      {/* Trigger Button with Perfect Alignment & Motion Effects */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Booking Date Selector: currently ${displaySummary}`}
        className={`w-full group flex items-center justify-between text-left rounded-xl border transition-all duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
          compact
            ? 'h-[38px] px-3 py-0 bg-background text-xs font-semibold'
            : 'min-h-[42px] px-3.5 py-2 bg-background text-xs'
        } ${
          isOpen
            ? 'border-primary ring-2 ring-primary/25 bg-card shadow-sm'
            : 'border-border/80 hover:border-primary/50 hover:bg-accent/40 shadow-xs hover:shadow-sm'
        } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${buttonClassName}`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
          <div className={`flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${
            compact ? 'h-4 w-4 text-primary' : 'p-1.5 rounded-lg bg-primary/10 text-primary'
          }`}>
            <CalendarIcon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          </div>

          <div className="min-w-0 flex-1 truncate">
            {compact ? (
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-bold text-foreground text-xs truncate">
                  {displaySummary}
                </span>
                {hasRangeSelected && mode === 'range' && (
                  <span className="text-[10px] text-primary font-bold px-1.5 py-0.2 rounded-md bg-primary/10 shrink-0">
                    {daysCount}d
                  </span>
                )}
              </div>
            ) : (
              <div className="truncate">
                <div className="text-xs font-bold text-foreground truncate">{displaySummary}</div>
                {hasRangeSelected && mode === 'range' && (
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 truncate mt-0.5">
                    <span>{daysCount} {daysCount === 1 ? 'day pass' : 'days total'}</span>
                    <span>•</span>
                    <span className="text-primary font-medium group-hover:underline">Click to change</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
          {!compact && hasRangeSelected && mode === 'range' && (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/25">
              <Sparkles className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
              {daysCount}d
            </span>
          )}
          <ChevronDown
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-250 ease-out ${
              isOpen ? 'rotate-180 text-primary' : 'group-hover:text-foreground'
            }`}
          />
        </div>
      </button>

      {/* Popover Calendar Modal / Dropdown with Animated Caret & Motion */}
      {isOpen && (
        <>
          {/* Mobile backdrop for small screens */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 sm:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Select Date Range"
            className={`z-50 ${
              // Mobile: centered modal dialog
              'fixed sm:absolute inset-x-3 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:top-full sm:translate-y-0 sm:mt-2.5'
            } ${
              align === 'right'
                ? 'sm:right-0 sm:origin-top-right'
                : align === 'center'
                ? 'sm:left-1/2 sm:-translate-x-1/2 sm:origin-top'
                : 'sm:left-0 sm:origin-top-left'
            } w-auto max-w-[calc(100vw-24px)] sm:w-[380px] md:w-[410px] calendar-popover-anim`}
          >
            {/* Top decorative pointer caret on desktop */}
            <div
              className={`hidden sm:block absolute -top-2 w-4 h-4 rotate-45 bg-card border-t border-l border-border/80 z-10 ${
                align === 'right'
                  ? 'right-6'
                  : align === 'center'
                  ? 'left-1/2 -translate-x-1/2'
                  : 'left-6'
              }`}
            />

            <DateRangeCalendar
              startDate={startDate}
              endDate={endDate}
              onChange={onChange}
              minDate={minDate}
              maxDate={maxDate}
              mode={mode}
              showPresets={showPresets}
              highlightedDates={highlightedDates}
              unavailableDates={unavailableDates}
              inline={false}
              onCancel={() => setIsOpen(false)}
              onApply={() => setIsOpen(false)}
              className="border border-border/90 shadow-2xl relative z-20"
            />
          </div>
        </>
      )}
    </div>
  );
};

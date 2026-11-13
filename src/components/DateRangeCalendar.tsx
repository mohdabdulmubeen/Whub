import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import {
  formatYMD,
  parseYMD,
  getTodayStr,
  isPastDate,
  isSameDay,
  isDateInRange,
  getDaysDifference,
  formatDisplayDate,
  getMonthCalendarGrid,
  addDays,
  DATE_PRESETS,
  CalendarDayItem,
  isBefore
} from '../utils/dateUtils';

export interface DateRangeValue {
  startDate: string;
  endDate: string;
  daysCount: number;
}

export interface DateRangeCalendarProps {
  startDate?: string;
  endDate?: string;
  onChange: (range: DateRangeValue) => void;
  minDate?: string;
  maxDate?: string;
  mode?: 'range' | 'single';
  showPresets?: boolean;
  highlightedDates?: string[]; // E.g., for alternate days
  unavailableDates?: string[];
  className?: string;
  onApply?: () => void;
  onCancel?: () => void;
  inline?: boolean;
}

export const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  startDate: propStartDate,
  endDate: propEndDate,
  onChange,
  minDate,
  maxDate,
  mode = 'range',
  showPresets = true,
  highlightedDates = [],
  unavailableDates = [],
  className = '',
  onApply,
  onCancel,
  inline = true
}) => {
  const todayStr = useMemo(() => getTodayStr(), []);
  const effectiveMinDate = minDate || todayStr;
  const effectiveMaxDate = maxDate || addDays(todayStr, 180);

  // Active dates state
  const [internalStart, setInternalStart] = useState<string>(propStartDate || todayStr);
  const [internalEnd, setInternalEnd] = useState<string>(
    mode === 'single' ? (propStartDate || todayStr) : (propEndDate || propStartDate || todayStr)
  );

  // Focus target: 'start' = next click chooses start date; 'end' = next click chooses end date
  const [activeTarget, setActiveTarget] = useState<'start' | 'end'>('start');

  // Hovered date for interactive preview ribbon
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Current calendar view month and year
  const initialDate = parseYMD(propStartDate || todayStr);
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth()); // 0-11

  // Validation message
  const [validationNote, setValidationNote] = useState<string | null>(null);

  // Sync internal state when props change
  useEffect(() => {
    if (propStartDate) {
      setInternalStart(propStartDate);
    }
    if (mode === 'single') {
      if (propStartDate) setInternalEnd(propStartDate);
    } else if (propEndDate) {
      setInternalEnd(propEndDate);
    }
  }, [propStartDate, propEndDate, mode]);

  // Update calendar view when start date changes from outside
  useEffect(() => {
    if (propStartDate) {
      const d = parseYMD(propStartDate);
      setCurrentYear(d.getFullYear());
      setCurrentMonth(d.getMonth());
    }
  }, [propStartDate]);

  // Compute days count
  const daysCount = useMemo(() => {
    return getDaysDifference(internalStart, internalEnd);
  }, [internalStart, internalEnd]);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleJumpToday = () => {
    const d = new Date();
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  // Calendar matrix for current view
  const daysGrid = useMemo(() => {
    return getMonthCalendarGrid(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Month title
  const monthTitle = useMemo(() => {
    const d = new Date(currentYear, currentMonth, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [currentYear, currentMonth]);

  // Date selection logic
  const handleDayClick = (dayItem: CalendarDayItem) => {
    const clickedStr = dayItem.dateStr;

    // Reject past dates or out-of-bounds dates
    if (isPastDate(clickedStr, effectiveMinDate)) {
      setValidationNote(`Cannot select past dates. Earliest booking date is ${formatDisplayDate(effectiveMinDate)}.`);
      return;
    }
    if (effectiveMaxDate && clickedStr > effectiveMaxDate) {
      setValidationNote(`Advance bookings are limited to 180 days.`);
      return;
    }
    if (unavailableDates.includes(clickedStr)) {
      setValidationNote(`${formatDisplayDate(clickedStr)} is unavailable.`);
      return;
    }

    setValidationNote(null);

    if (mode === 'single') {
      setInternalStart(clickedStr);
      setInternalEnd(clickedStr);
      onChange({
        startDate: clickedStr,
        endDate: clickedStr,
        daysCount: 1
      });
      return;
    }

    // Range mode logic
    if (activeTarget === 'start') {
      // User is explicitly setting start date
      setInternalStart(clickedStr);
      // If previous end was before new start, move end date to new start
      let newEnd = internalEnd;
      if (clickedStr > internalEnd) {
        newEnd = clickedStr;
        setInternalEnd(clickedStr);
      }
      setActiveTarget('end');
      const count = getDaysDifference(clickedStr, newEnd);
      onChange({
        startDate: clickedStr,
        endDate: newEnd,
        daysCount: count
      });
    } else {
      // User is setting end date
      if (clickedStr < internalStart) {
        // Intuitive swap: if they clicked an earlier date, make it the new start date
        setInternalStart(clickedStr);
        setActiveTarget('end');
        const count = getDaysDifference(clickedStr, internalEnd);
        onChange({
          startDate: clickedStr,
          endDate: internalEnd,
          daysCount: count
        });
      } else {
        setInternalEnd(clickedStr);
        setActiveTarget('start'); // Ready for next cycle or changes
        const count = getDaysDifference(internalStart, clickedStr);
        onChange({
          startDate: internalStart,
          endDate: clickedStr,
          daysCount: count
        });
      }
    }
  };

  // Quick preset click
  const handlePresetClick = (presetId: string) => {
    const preset = DATE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const range = preset.getRange(todayStr);
    setInternalStart(range.startDate);
    setInternalEnd(range.endDate);
    setActiveTarget('end');
    setValidationNote(null);

    // Jump calendar to start date month
    const d = parseYMD(range.startDate);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());

    onChange({
      startDate: range.startDate,
      endDate: range.endDate,
      daysCount: range.daysCount
    });
  };

  // Reset to today
  const handleReset = () => {
    setInternalStart(todayStr);
    setInternalEnd(todayStr);
    setActiveTarget('start');
    setValidationNote(null);
    const d = new Date();
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
    onChange({
      startDate: todayStr,
      endDate: todayStr,
      daysCount: 1
    });
  };

  // Determine cell highlight states
  const getDayStatus = (dateStr: string) => {
    const isStart = dateStr === internalStart;
    const isEnd = dateStr === internalEnd;
    const isSingleSelection = internalStart === internalEnd && isStart;

    // Effective range preview while hovering
    let inRange = false;
    let inHoverRange = false;

    if (mode === 'range') {
      if (internalStart && internalEnd) {
        inRange = isDateInRange(dateStr, internalStart, internalEnd);
      }
      if (activeTarget === 'end' && hoverDate && hoverDate >= internalStart) {
        inHoverRange = isDateInRange(dateStr, internalStart, hoverDate);
      }
    }

    const isHighlighted = highlightedDates.includes(dateStr);
    const isUnavailable = unavailableDates.includes(dateStr);

    return {
      isStart,
      isEnd,
      isSingleSelection,
      inRange,
      inHoverRange,
      isHighlighted,
      isUnavailable
    };
  };

  return (
    <div
      className={`bg-card rounded-2xl border border-border shadow-lg p-3 sm:p-5 text-card-foreground select-none max-w-full ${className}`}
      role="region"
      aria-label="Interactive Calendar Date-Range Picker"
    >
      {/* 1. Header with Selected Range Summary & Date Switching Tabs */}
      <div className="pb-3 mb-3 border-b border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Range tabs for desktop and mobile */}
          <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/60">
            {/* Check-in Date Button / Tab */}
            <button
              type="button"
              onClick={() => setActiveTarget('start')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
                activeTarget === 'start'
                  ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30'
                  : 'text-foreground/80 hover:bg-background/80 hover:text-foreground'
              }`}
              aria-label={`Check-in Date: ${formatDisplayDate(internalStart)}. Click to change Check-in date.`}
              aria-pressed={activeTarget === 'start'}
            >
              <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider opacity-80 leading-none">Check-in</span>
                <span className="font-bold">{formatDisplayDate(internalStart, { includeDayOfWeek: false })}</span>
              </div>
            </button>

            {mode === 'range' && (
              <>
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0 mx-0.5" />

                {/* Check-out Date Button / Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTarget('end')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
                    activeTarget === 'end'
                      ? 'bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30'
                      : 'text-foreground/80 hover:bg-background/80 hover:text-foreground'
                  }`}
                  aria-label={`Check-out Date: ${formatDisplayDate(internalEnd)}. Click to change Check-out date.`}
                  aria-pressed={activeTarget === 'end'}
                >
                  <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider opacity-80 leading-none">Check-out</span>
                    <span className="font-bold">{formatDisplayDate(internalEnd, { includeDayOfWeek: false })}</span>
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Days summary badge and reset */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30"
              aria-live="polite"
            >
              <Sparkles className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              {daysCount} {daysCount === 1 ? 'Day' : 'Days'}
            </span>

            <button
              type="button"
              onClick={handleReset}
              title="Reset to today"
              aria-label="Reset date selection to today"
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Validation note banner if active */}
        {validationNote && (
          <div
            className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-200 text-xs font-medium"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
            <span>{validationNote}</span>
          </div>
        )}
      </div>

      {/* 2. Quick Duration Presets (horizontal scroll on mobile) */}
      {showPresets && mode === 'range' && (
        <div className="mb-3.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
              Presets:
            </span>
            {DATE_PRESETS.map(preset => {
              const isSelected =
                preset.id === 'today'
                  ? internalStart === todayStr && internalEnd === todayStr
                  : preset.id === 'week'
                  ? daysCount === 7 && internalStart === todayStr
                  : preset.id === '2weeks'
                  ? daysCount === 14 && internalStart === todayStr
                  : preset.id === 'month'
                  ? daysCount === 30 && internalStart === todayStr
                  : false;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetClick(preset.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 border ${
                    isSelected
                      ? 'bg-primary/15 text-primary border-primary/40 font-bold shadow-xs'
                      : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60'
                  }`}
                  aria-pressed={isSelected}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Month Navigation Bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-2">
          {monthTitle}
        </h3>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleJumpToday}
            className="px-2 py-1 text-xs font-semibold rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 mr-1"
            title="Jump to current month"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="p-1.5 rounded-lg border border-border/80 hover:bg-muted text-foreground cursor-pointer transition-all duration-150 hover:scale-110 active:scale-90"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-1.5 rounded-lg border border-border/80 hover:bg-muted text-foreground cursor-pointer transition-all duration-150 hover:scale-110 active:scale-90"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4. Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-1.5 text-center" role="row">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
          <div
            key={d}
            role="columnheader"
            aria-label={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i]}
            className={`text-[11px] font-bold py-1 ${
              i === 0 || i === 6 ? 'text-amber-600/80 dark:text-amber-400/80' : 'text-muted-foreground'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 5. Calendar Matrix Grid (Responsive & Touch Accessible) */}
      <div
        className="grid grid-cols-7 gap-y-1 gap-x-0.5 sm:gap-1 text-center"
        role="grid"
        aria-label={`Calendar for ${monthTitle}`}
        onMouseLeave={() => setHoverDate(null)}
      >
        {daysGrid.map(dayItem => {
          const { dateStr, dayNumber, isCurrentMonth, isPast } = dayItem;
          const {
            isStart,
            isEnd,
            isSingleSelection,
            inRange,
            inHoverRange,
            isHighlighted,
            isUnavailable
          } = getDayStatus(dateStr);

          const isDisabled = isPast || isUnavailable;

          // Compute style tokens for range ribbon
          let cellBg = '';
          let textStyle = '';
          let roundedCorners = 'rounded-lg';

          if (isDisabled) {
            textStyle = 'text-muted-foreground/35 cursor-not-allowed line-through';
            cellBg = 'bg-transparent';
          } else if (isSingleSelection) {
            cellBg = 'bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-primary/40';
            roundedCorners = 'rounded-xl';
          } else if (isStart) {
            cellBg = 'bg-primary text-primary-foreground font-bold shadow-md';
            roundedCorners = 'rounded-l-xl rounded-r-none';
          } else if (isEnd) {
            cellBg = 'bg-primary text-primary-foreground font-bold shadow-md';
            roundedCorners = 'rounded-r-xl rounded-l-none';
          } else if (inRange) {
            cellBg = 'bg-amber-500/20 text-amber-950 dark:text-amber-100 font-semibold';
            roundedCorners = 'rounded-none';
          } else if (inHoverRange) {
            cellBg = 'bg-amber-500/10 text-foreground font-medium';
            roundedCorners = 'rounded-none';
          } else if (!isCurrentMonth) {
            textStyle = 'text-muted-foreground/40 hover:text-foreground/70';
            cellBg = 'hover:bg-muted/40';
          } else {
            textStyle = 'text-foreground hover:text-primary font-medium';
            cellBg = 'hover:bg-muted/70';
          }

          if (isHighlighted && !isStart && !isEnd) {
            cellBg += ' ring-1 ring-inset ring-amber-500/60 font-bold';
          }

          return (
            <div
              key={dateStr}
              role="gridcell"
              className={`relative p-0 flex items-center justify-center calendar-ribbon-cell ${
                inRange && !isStart && !isEnd ? 'bg-amber-500/10 dark:bg-amber-500/15' : ''
              }`}
            >
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleDayClick(dayItem)}
                onMouseEnter={() => !isDisabled && setHoverDate(dateStr)}
                aria-label={`${formatDisplayDate(dateStr)}${
                  isStart ? ' (Check-in Date)' : isEnd ? ' (Check-out Date)' : ''
                }${isDisabled ? ' (Unavailable)' : ''}`}
                aria-selected={isStart || isEnd || inRange}
                aria-disabled={isDisabled}
                className={`w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                  !isDisabled ? 'calendar-day-motion cursor-pointer select-none' : ''
                } ${cellBg} ${textStyle} ${roundedCorners}`}
              >
                <span className="relative z-10">{dayNumber}</span>
                {dayItem.isToday && !isStart && !isEnd && (
                  <span
                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary today-dot-pulse z-10"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 6. Footer Information & Inner Guidance Message */}
      <div className="mt-3.5 pt-3 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 min-w-0">
          <Info className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate">
            {mode === 'single'
              ? 'Select Dates: Choose your session date'
              : activeTarget === 'start'
              ? 'Select Dates: Click any date to set Check-in'
              : 'Select Dates: Click any date to set Check-out (or tap earlier date to adjust Check-in)'}
          </span>
        </div>

        {/* Optional action buttons when used in modal / drawer */}
        {(!inline || onApply || onCancel) && (
          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted font-medium text-xs transition-colors"
              >
                Cancel
              </button>
            )}
            {onApply && (
              <button
                type="button"
                onClick={onApply}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:opacity-95 transition-all flex items-center gap-1"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Apply Dates
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

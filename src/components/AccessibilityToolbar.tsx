import React, { useEffect, useRef } from 'react';
import { X, RotateCcw, Type, Eye, EyeOff, Sun, Sliders } from 'lucide-react';
import { useAccessibility, TextSize } from '../context/AccessibilityContext';
import { useI18n } from '../i18n/I18nContext';

export const AccessibilityToolbar: React.FC = () => {
  const {
    settings,
    setTextSize,
    setHighContrast,
    setReduceMotion,
    setDyslexicFont,
    resetSettings,
    isToolbarOpen,
    setIsToolbarOpen,
  } = useAccessibility();
  const { t } = useI18n();

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isToolbarOpen) {
        setIsToolbarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isToolbarOpen, setIsToolbarOpen]);

  if (!isToolbarOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6 text-foreground animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sliders className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="a11y-dialog-title" className="text-base font-bold text-foreground">
                {t('a11y.title', 'Accessibility Settings')}
              </h2>
              <p className="text-xs text-muted-foreground">WCAG 2.1 AA Compliant Tools</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsToolbarOpen(false)}
            aria-label={t('a11y.close', 'Close dialog')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Text Size */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Type className="h-3.5 w-3.5" aria-hidden="true" />
              {t('a11y.fontSize', 'Text Size')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as TextSize[]).map((size) => {
                const label =
                  size === 'normal'
                    ? t('a11y.fontNormal', '100%')
                    : size === 'large'
                    ? t('a11y.fontLarge', '115%')
                    : t('a11y.fontXLarge', '130%');
                const isSelected = settings.textSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTextSize(size)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-muted/40 hover:bg-muted text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-muted/30">
            <div className="pr-3">
              <p className="text-sm font-semibold flex items-center gap-1.5">
                <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
                {t('a11y.contrast', 'High Contrast Mode')}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('a11y.contrastDesc', 'Enhances contrast ratios to meet WCAG AAA standards')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.highContrast}
              onClick={() => setHighContrast(!settings.highContrast)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-hidden ${
                settings.highContrast ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-muted/30">
            <div className="pr-3">
              <p className="text-sm font-semibold flex items-center gap-1.5">
                <EyeOff className="h-4 w-4 text-primary" aria-hidden="true" />
                {t('a11y.reduceMotion', 'Reduce Motion')}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('a11y.reduceMotionDesc', 'Minimizes motion and animation across the application')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.reduceMotion}
              onClick={() => setReduceMotion(!settings.reduceMotion)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-hidden ${
                settings.reduceMotion ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ${
                  settings.reduceMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Dyslexia Friendly Spacing */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-muted/30">
            <div className="pr-3">
              <p className="text-sm font-semibold flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
                {t('a11y.dyslexicFont', 'Dyslexia Friendly Font')}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('a11y.dyslexicFontDesc', 'Enhances letter spacing and character distinction')}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.dyslexicFont}
              onClick={() => setDyslexicFont(!settings.dyslexicFont)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-hidden ${
                settings.dyslexicFont ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ${
                  settings.dyslexicFont ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <button
            type="button"
            onClick={resetSettings}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t('a11y.reset', 'Reset to Defaults')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsToolbarOpen(false)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow hover:bg-primary/90 cursor-pointer transition-all"
          >
            {t('a11y.close', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
};

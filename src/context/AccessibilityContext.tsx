import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexicFont: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setTextSize: (size: TextSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setDyslexicFont: (enabled: boolean) => void;
  resetSettings: () => void;
  isToolbarOpen: boolean;
  setIsToolbarOpen: (open: boolean) => void;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  dyslexicFont: false,
};

const STORAGE_KEY = 'celpin_a11y_settings';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultSettings;
  });

  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}

    const root = document.documentElement;

    // Text size
    root.classList.remove('font-size-large', 'font-size-xlarge');
    if (settings.textSize === 'large') root.classList.add('font-size-large');
    if (settings.textSize === 'xlarge') root.classList.add('font-size-xlarge');

    // High Contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduce Motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Dyslexic Font
    if (settings.dyslexicFont) {
      root.classList.add('dyslexic-font');
    } else {
      root.classList.remove('dyslexic-font');
    }
  }, [settings]);

  const setTextSize = (size: TextSize) => setSettings(s => ({ ...s, textSize: size }));
  const setHighContrast = (enabled: boolean) => setSettings(s => ({ ...s, highContrast: enabled }));
  const setReduceMotion = (enabled: boolean) => setSettings(s => ({ ...s, reduceMotion: enabled }));
  const setDyslexicFont = (enabled: boolean) => setSettings(s => ({ ...s, dyslexicFont: enabled }));
  const resetSettings = () => setSettings(defaultSettings);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setTextSize,
        setHighContrast,
        setReduceMotion,
        setDyslexicFont,
        resetSettings,
        isToolbarOpen,
        setIsToolbarOpen,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    // Return safe fallback if used outside provider during SSR/testing
    return {
      settings: defaultSettings,
      setTextSize: () => {},
      setHighContrast: () => {},
      setReduceMotion: () => {},
      setDyslexicFont: () => {},
      resetSettings: () => {},
      isToolbarOpen: false,
      setIsToolbarOpen: () => {},
    };
  }
  return context;
};

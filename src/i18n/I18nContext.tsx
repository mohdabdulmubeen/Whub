import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES, translations } from './translations';

export interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
  t: (key: string, defaultVal?: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'celpin_preferred_language';

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language?.slice(0, 2) as LanguageCode;
      if (SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
        return browserLang;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = currentLanguageInfo.dir;
  }, [language, currentLanguageInfo]);

  const t = (key: string, defaultVal?: string, params?: Record<string, string | number>): string => {
    const langDict = translations[language];
    let val = langDict ? langDict[key] : undefined;
    if (!val) {
      // Fallback to English
      val = translations['en'] ? translations['en'][key] : undefined;
    }
    if (!val) {
      val = defaultVal !== undefined ? defaultVal : key;
    }
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        val = val!.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return val;
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo,
        t,
        dir: currentLanguageInfo.dir
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

const defaultFallbackContext: I18nContextType = {
  language: 'en',
  setLanguage: () => {},
  languages: SUPPORTED_LANGUAGES,
  currentLanguageInfo: SUPPORTED_LANGUAGES[0],
  t: (key: string, defaultVal?: string, params?: Record<string, string | number>) => {
    let val = translations['en']?.[key] || defaultVal || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return val;
  },
  dir: 'ltr'
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    return defaultFallbackContext;
  }
  return context;
};

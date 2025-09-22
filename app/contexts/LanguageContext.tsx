import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Initialize i18n

export type Language = 'en' | 'hi' | 'as';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string | number>) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>((i18n.language as Language) || 'en');

  const changeLanguage = async (lang: Language) => {
    try {
      await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  };

  React.useEffect(() => {
    setCurrentLanguage((i18n.language as Language) || 'en');
  }, [i18n.language]);

  const contextValue: LanguageContextType = {
    language: currentLanguage,
    changeLanguage,
    t,
    isReady: i18n.isInitialized,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getAvailableLanguages = (): { code: Language; name: string; nativeName: string }[] => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
];

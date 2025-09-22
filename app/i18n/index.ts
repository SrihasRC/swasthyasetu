import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from '../../translations/en.json';
import hi from '../../translations/hi.json';
import as from '../../translations/as.json';

export type Language = 'en' | 'hi' | 'as';

const LANGUAGE_STORAGE_KEY = '@SwasthyaSetu:language';

// Custom language detector for React Native
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      
      // Fall back to device locale
      const locales = getLocales();
      const deviceLanguage = locales[0]?.languageCode || 'en';
      const supportedLanguage = ['en', 'hi', 'as'].includes(deviceLanguage) ? deviceLanguage : 'en';
      callback(supportedLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
};

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  as: {
    translation: as,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4', // Important for React Native
    resources,
    fallbackLng: 'en',
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;

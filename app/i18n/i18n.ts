import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './locales/en.json';
import hi from './locales/hi.json';

export type Language = 'en' | 'hi';

export interface TranslationResources {
  [key: string]: any;
}

export interface I18nConfig {
  language: Language;
  translations: Record<Language, TranslationResources>;
  fallbackLanguage: Language;
}

const LANGUAGE_STORAGE_KEY = '@SwasthyaSetu:language';

class I18n {
  private config: I18nConfig;
  private listeners: ((language: Language) => void)[] = [];

  constructor() {
    this.config = {
      language: 'en',
      translations: {
        en,
        hi,
      },
      fallbackLanguage: 'en',
    };
    this.init();
  }

  private async init() {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && this.isValidLanguage(savedLanguage)) {
        this.config.language = savedLanguage as Language;
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  }

  private isValidLanguage(lang: string): lang is Language {
    return lang === 'en' || lang === 'hi';
  }

  getCurrentLanguage(): Language {
    return this.config.language;
  }

  async changeLanguage(language: Language): Promise<void> {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      this.config.language = language;
      this.notifyListeners(language);
    } catch (error) {
      console.error('Error saving language:', error);
      throw error;
    }
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    const currentLangTranslations = this.config.translations[this.config.language];
    const fallbackTranslations = this.config.translations[this.config.fallbackLanguage];

    // Try to get translation from current language
    let translation = this.getNestedValue(currentLangTranslations, keys);
    
    // Fallback to default language if not found
    if (typeof translation !== 'string') {
      translation = this.getNestedValue(fallbackTranslations, keys);
    }

    // Return key if no translation found
    if (typeof translation !== 'string') {
      return key;
    }

    // Replace parameters in translation
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(
          new RegExp(`{{${param}}}`, 'g'), 
          String(params[param])
        );
      });
    }

    return translation;
  }

  private getNestedValue(obj: any, keys: string[]): any {
    return keys.reduce((current, key) => {
      return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
  }

  addLanguageListener(callback: (language: Language) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(language: Language) {
    this.listeners.forEach(listener => listener(language));
  }

  getAvailableLanguages(): { code: Language; name: string; nativeName: string }[] {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    ];
  }
}

export const i18n = new I18n();
export default i18n;

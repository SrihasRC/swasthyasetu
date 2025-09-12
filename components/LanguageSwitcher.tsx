import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Language {
  code: string;
  name: string;
}

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  languages?: Language[];
}

const defaultLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'as', name: 'অসমীয়া' },
];

export default function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange, 
  languages = defaultLanguages 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex-row items-center justify-between min-w-24"
        style={{ elevation: 1 }}
      >
        <Text className="text-gray-900 font-medium">
          {currentLang.name}
        </Text>
        <Text className="text-gray-500 ml-2">⌄</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="bg-white border border-gray-300 rounded-lg overflow-hidden" style={{ elevation: 2 }}>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={language.code}
          onPress={() => handleLanguageSelect(language.code)}
          className={`
            px-4 py-3 flex-row items-center justify-between
            ${currentLanguage === language.code ? 'bg-blue-50' : 'bg-white'}
            ${index < languages.length - 1 ? 'border-b border-gray-200' : ''}
          `}
        >
          <Text className={`
            font-medium
            ${currentLanguage === language.code ? 'text-blue-700' : 'text-gray-900'}
          `}>
            {language.name}
          </Text>
          {currentLanguage === language.code && (
            <Text className="text-blue-700">✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

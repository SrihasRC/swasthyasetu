import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../components/ThemeProvider';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const LanguageToggle: React.FC = () => {
  const { colors } = useAppTheme();
  const { language } = useLanguage();
  const [showSelector, setShowSelector] = useState(false);

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case 'hi': return 'हिन्दी';
      case 'as': return 'অসমীয়া';
      case 'en': return 'English';
      default: return 'English';
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowSelector(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="language" size={16} color={colors.primary} />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            fontWeight: '500',
            color: colors.foreground,
          }}
        >
          {getLanguageDisplay(language)}
        </Text>
        <Ionicons name="chevron-down" size={14} color={colors.mutedForeground} style={{ marginLeft: 4 }} />
      </TouchableOpacity>

      <LanguageSelector
        visible={showSelector}
        onClose={() => setShowSelector(false)}
      />
    </>
  );
};

export default LanguageToggle;

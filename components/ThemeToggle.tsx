import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme, colors } = useAppTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'phone-portrait-outline';
      default:
        return 'sunny-outline';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return 'System Default';
      default:
        return 'Light Mode';
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="flex flex-row items-center justify-between p-4 rounded-xl border"
      style={{ 
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <View className="flex flex-row items-center gap-3">
        <View
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Ionicons
            name={getThemeIcon()}
            size={20}
            color="white"
          />
        </View>
        <View>
          <Text
            className="font-semibold text-base"
            style={{ color: colors.foreground }}
          >
            Theme
          </Text>
          <Text
            className="text-sm"
            style={{ color: colors.mutedForeground }}
          >
            {getThemeLabel()}
          </Text>
        </View>
      </View>
      
      <Ionicons
        name="chevron-forward"
        size={20}
        style={{ color: colors.mutedForeground }}
      />
    </TouchableOpacity>
  );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  subtitle?: string;
}

export default function Header({ 
  title, 
  showBack = false, 
  onBackPress,
  rightElement,
  subtitle
}: HeaderProps) {
  const { colors } = useAppTheme();
  
  const BackButton = () => {
    if (onBackPress) {
      return (
        <TouchableOpacity 
          onPress={onBackPress}
          className="p-2 mr-3 rounded-full"
          style={{ backgroundColor: colors.muted }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View 
      className="px-4 pt-12 pb-4 border-b" 
      style={{ 
        backgroundColor: colors.card,
        borderColor: colors.border,
        elevation: 2,
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {showBack && <BackButton />}
          <View className="flex-1">
            <Text 
              className="text-xl font-semibold"
              style={{ color: colors.foreground }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text 
                className="text-sm mt-1"
                style={{ color: colors.mutedForeground }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        
        {rightElement && (
          <View className="ml-3">
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
}

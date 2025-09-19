import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

interface TileProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  description?: string;
}

export default function Tile({ title, onPress, icon, description }: TileProps) {
  const { colors } = useAppTheme();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-lg p-6 border h-32 justify-center"
      style={{ 
        backgroundColor: colors.card,
        borderColor: colors.border,
        elevation: 2,
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      activeOpacity={0.7}
    >
      <View className="items-center justify-center flex-1">
        {icon && (
          <View className="mb-2">
            {icon}
          </View>
        )}
        
        <Text 
          className="font-semibold text-center text-sm"
          style={{ color: colors.foreground }}
          numberOfLines={2}
        >
          {title}
        </Text>
        
        {description && (
          <Text 
            className="text-xs text-center mt-1"
            style={{ color: colors.mutedForeground }}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

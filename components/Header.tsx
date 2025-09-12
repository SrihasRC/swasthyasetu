import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  const BackButton = () => {
    if (onBackPress) {
      return (
        <TouchableOpacity 
          onPress={onBackPress}
          className="p-2 mr-3 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100" style={{ elevation: 2 }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {showBack && <BackButton />}
          <View className="flex-1">
            <Text className="text-xl font-semibold text-gray-900">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-gray-600 mt-1">
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

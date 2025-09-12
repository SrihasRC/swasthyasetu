import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TileProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  description?: string;
}

export default function Tile({ title, onPress, icon, description }: TileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
      style={{ elevation: 2 }}
      activeOpacity={0.7}
    >
      <View className="items-center space-y-3">
        {icon && (
          <View className="mb-2">
            {icon}
          </View>
        )}
        
        <Text className="font-semibold text-gray-900 text-center">
          {title}
        </Text>
        
        {description && (
          <Text className="text-sm text-gray-600 text-center">
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  total?: number;
  current?: number;
  showLabels?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'red';
  size?: 'small' | 'medium' | 'large';
}

export default function ProgressBar({ 
  progress, 
  total, 
  current,
  showLabels = true,
  color = 'blue',
  size = 'medium'
}: ProgressBarProps) {
  const getColorStyles = () => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-500', container: 'bg-blue-100' };
      case 'green':
        return { bg: 'bg-green-500', container: 'bg-green-100' };
      case 'orange':
        return { bg: 'bg-orange-500', container: 'bg-orange-100' };
      case 'red':
        return { bg: 'bg-red-500', container: 'bg-red-100' };
      default:
        return { bg: 'bg-blue-500', container: 'bg-blue-100' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'h-2';
      case 'medium':
        return 'h-3';
      case 'large':
        return 'h-4';
      default:
        return 'h-3';
    }
  };

  const colorStyles = getColorStyles();
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View className="w-full">
      {showLabels && (total && current) && (
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-medium text-gray-700">
            Step {current} of {total}
          </Text>
          <Text className="text-sm text-gray-600">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      
      <View className={`w-full ${getSizeStyles()} ${colorStyles.container} rounded-full overflow-hidden`}>
        <View 
          className={`h-full ${colorStyles.bg} rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
      
      {showLabels && !(total && current) && (
        <Text className="text-xs text-gray-600 mt-1 text-center">
          {Math.round(clampedProgress)}% Complete
        </Text>
      )}
    </View>
  );
}

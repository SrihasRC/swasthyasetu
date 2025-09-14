import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

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
  const { colors } = useAppTheme();
  
  const getColorStyles = () => {
    switch (color) {
      case 'blue':
        return { bg: colors.primary, container: colors.primary + '20' };
      case 'green':
        return { bg: colors.success, container: colors.success + '20' };
      case 'orange':
        return { bg: colors.warning, container: colors.warning + '20' };
      case 'red':
        return { bg: colors.error, container: colors.error + '20' };
      default:
        return { bg: colors.primary, container: colors.primary + '20' };
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
          <Text 
            className="text-sm font-medium"
            style={{ color: colors.foreground }}
          >
            Step {current} of {total}
          </Text>
          <Text 
            className="text-sm"
            style={{ color: colors.mutedForeground }}
          >
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      
      <View 
        className={`w-full ${getSizeStyles()} rounded-full overflow-hidden`}
        style={{ backgroundColor: colorStyles.container }}
      >
        <View 
          className="h-full rounded-full"
          style={{ 
            backgroundColor: colorStyles.bg,
            width: `${clampedProgress}%` 
          }}
        />
      </View>
      
      {showLabels && !(total && current) && (
        <Text 
          className="text-xs mt-1 text-center"
          style={{ color: colors.mutedForeground }}
        >
          {Math.round(clampedProgress)}% Complete
        </Text>
      )}
    </View>
  );
}

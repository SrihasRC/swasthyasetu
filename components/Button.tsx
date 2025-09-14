import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from './ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  size = 'medium'
}: ButtonProps) {
  const { colors } = useAppTheme();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: colors.muted,
          borderColor: colors.border,
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          borderColor: colors.error,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return colors.foreground;
      case 'danger':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2';
      case 'medium':
        return 'px-4 py-3';
      case 'large':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const buttonStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`rounded-lg border items-center justify-center min-h-[48px] ${getSizeStyles()} ${disabled || loading ? 'opacity-50' : ''}`}
      style={{ 
        backgroundColor: buttonStyles.backgroundColor,
        borderColor: buttonStyles.borderColor,
        elevation: disabled ? 0 : 2 
      }}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'secondary' ? colors.foreground : '#FFFFFF'} 
        />
      ) : (
        <Text 
          className={`font-medium ${getTextSize()}`}
          style={{ color: getTextColor() }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

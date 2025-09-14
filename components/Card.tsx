import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'interactive';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
  title?: string;
  subtitle?: string;
}

export default function Card({ 
  children, 
  variant = 'elevated', 
  padding = 'medium',
  onPress,
  title,
  subtitle
}: CardProps) {
  const { colors } = useAppTheme();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.card,
          borderColor: colors.border,
        };
      case 'flat':
        return {
          backgroundColor: colors.muted,
          borderColor: colors.border,
        };
      case 'interactive':
        return {
          backgroundColor: colors.card,
          borderColor: colors.border,
        };
      default:
        return {
          backgroundColor: colors.card,
          borderColor: colors.border,
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-2';
      case 'medium':
        return 'p-4';
      case 'large':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const cardStyles = getVariantStyles();

  const CardContent = () => (
    <View 
      className={`rounded-xl border ${getPaddingStyles()} ${variant === 'interactive' ? 'active:scale-98' : ''}`}
      style={{ 
        backgroundColor: cardStyles.backgroundColor,
        borderColor: cardStyles.borderColor,
        elevation: variant === 'elevated' ? 2 : 0 
      }}
    >
      {(title || subtitle) && (
        <View className="mb-3">
          {title && (
            <Text 
              className="text-lg font-semibold mb-1"
              style={{ color: colors.foreground }}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text 
              className="text-sm"
              style={{ color: colors.mutedForeground }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

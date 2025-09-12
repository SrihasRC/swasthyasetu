import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white border border-gray-100';
      case 'flat':
        return 'bg-gray-50 border border-gray-200';
      case 'interactive':
        return 'bg-white border border-gray-200 active:scale-98';
      default:
        return 'bg-white border border-gray-100';
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

  const CardContent = () => (
    <View className={`rounded-xl ${getVariantStyles()} ${getPaddingStyles()}`} 
          style={{ elevation: variant === 'elevated' ? 2 : 0 }}>
      {(title || subtitle) && (
        <View className="mb-3">
          {title && (
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-sm text-gray-600">
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

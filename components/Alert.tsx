import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface AlertProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  showIcon?: boolean;
}

export default function Alert({ 
  message, 
  type = 'info', 
  title,
  showIcon = true 
}: AlertProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextStyles = () => {
    switch (type) {
      case 'success':
        return { title: 'text-green-800', message: 'text-green-700' };
      case 'warning':
        return { title: 'text-yellow-800', message: 'text-yellow-700' };
      case 'error':
        return { title: 'text-red-800', message: 'text-red-700' };
      case 'info':
        return { title: 'text-blue-800', message: 'text-blue-700' };
      default:
        return { title: 'text-blue-800', message: 'text-blue-700' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={20} color="#059669" />;
      case 'warning':
        return <Ionicons name="warning" size={20} color="#D97706" />;
      case 'error':
        return <Ionicons name="close-circle" size={20} color="#DC2626" />;
      case 'info':
        return <Ionicons name="information-circle" size={20} color="#2563EB" />;
      default:
        return <Ionicons name="information-circle" size={20} color="#2563EB" />;
    }
  };

  const textStyles = getTextStyles();

  return (
    <View className={`p-4 rounded-xl border ${getAlertStyles()}`}>
      <View className="flex-row items-start">
        {showIcon && (
          <View className="mr-3 mt-0.5">
            {getIcon()}
          </View>
        )}
        <View className="flex-1">
          {title && (
            <Text className={`font-semibold mb-1 ${textStyles.title}`}>
              {title}
            </Text>
          )}
          <Text className={`${textStyles.message} leading-5`}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

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
  const { colors } = useAppTheme();
  
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success + '10',
          borderColor: colors.success + '30',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning + '10',
          borderColor: colors.warning + '30',
        };
      case 'error':
        return {
          backgroundColor: colors.error + '10',
          borderColor: colors.error + '30',
        };
      case 'info':
        return {
          backgroundColor: colors.info + '10',
          borderColor: colors.info + '30',
        };
      default:
        return {
          backgroundColor: colors.info + '10',
          borderColor: colors.info + '30',
        };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'info':
        return colors.info;
      default:
        return colors.info;
    }
  };

  const getIcon = () => {
    const iconColor = getTextColor();
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={20} color={iconColor} />;
      case 'warning':
        return <Ionicons name="warning" size={20} color={iconColor} />;
      case 'error':
        return <Ionicons name="close-circle" size={20} color={iconColor} />;
      case 'info':
        return <Ionicons name="information-circle" size={20} color={iconColor} />;
      default:
        return <Ionicons name="information-circle" size={20} color={iconColor} />;
    }
  };

  const alertStyles = getAlertStyles();
  const textColor = getTextColor();

  return (
    <View 
      className="p-4 rounded-xl border"
      style={{
        backgroundColor: alertStyles.backgroundColor,
        borderColor: alertStyles.borderColor,
      }}
    >
      <View className="flex-row items-start">
        {showIcon && (
          <View className="mr-3 mt-0.5">
            {getIcon()}
          </View>
        )}
        <View className="flex-1">
          {title && (
            <Text 
              className="font-semibold mb-1"
              style={{ color: textColor }}
            >
              {title}
            </Text>
          )}
          <Text 
            className="leading-5"
            style={{ color: textColor }}
          >
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
}

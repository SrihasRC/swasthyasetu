import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useAppTheme } from './ThemeProvider';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'phone' | 'number';
  icon?: keyof typeof Ionicons.glyphMap;
  helper?: string;
}

export default function Input({ 
  label, 
  error, 
  required = false,
  type = 'text',
  icon,
  helper,
  ...textInputProps 
}: InputProps) {
  const { colors } = useAppTheme();
  
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <View className="mb-4">
      {/* Label */}
      <Text 
        className="font-medium mb-2 text-base"
        style={{ color: colors.foreground }}
      >
        {label}
        {required && (
          <Text style={{ color: colors.error }} className="ml-1">*</Text>
        )}
      </Text>
      
      {/* Input Container */}
      <View className="relative">
        {icon && (
          <View className="absolute left-3 top-4 z-10">
            <Ionicons name={icon} size={20} color={colors.mutedForeground} />
          </View>
        )}
        
        <TextInput
          className={`border rounded-xl py-4 text-base min-h-[52px] ${icon ? 'pl-12 pr-4' : 'px-4'}`}
          style={{
            backgroundColor: error ? colors.error + '10' : colors.card,
            borderColor: error ? colors.error : colors.border,
            color: colors.foreground,
          }}
          placeholderTextColor={colors.mutedForeground}
          keyboardType={getKeyboardType()}
          {...textInputProps}
        />
      </View>
      
      {/* Helper Text */}
      {helper && !error && (
        <Text 
          className="text-sm mt-1"
          style={{ color: colors.mutedForeground }}
        >
          {helper}
        </Text>
      )}
      
      {/* Error Message */}
      {error && (
        <View className="flex-row items-center mt-1">
          <Ionicons name="alert-circle" size={16} color={colors.error} />
          <Text 
            className="text-sm ml-1"
            style={{ color: colors.error }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

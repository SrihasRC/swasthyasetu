import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

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
      <Text className="text-gray-700 font-medium mb-2 text-base">
        {label}
        {required && <Text className="text-red-500 ml-1">*</Text>}
      </Text>
      
      {/* Input Container */}
      <View className="relative">
        {icon && (
          <View className="absolute left-3 top-4 z-10">
            <Ionicons name={icon} size={20} color="#6B7280" />
          </View>
        )}
        
        <TextInput
          className={`
            border rounded-xl px-4 py-4 text-gray-900 bg-white text-base min-h-[52px]
            ${icon ? 'pl-12' : 'px-4'}
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
            focus:border-blue-500
          `}
          placeholderTextColor="#9CA3AF"
          keyboardType={getKeyboardType()}
          {...textInputProps}
        />
      </View>
      
      {/* Helper Text */}
      {helper && !error && (
        <Text className="text-gray-500 text-sm mt-1">
          {helper}
        </Text>
      )}
      
      {/* Error Message */}
      {error && (
        <View className="flex-row items-center mt-1">
          <Ionicons name="alert-circle" size={16} color="#DC2626" />
          <Text className="text-red-500 text-sm ml-1">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

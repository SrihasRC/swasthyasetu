import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormField({ 
  label, 
  error, 
  required = false, 
  ...textInputProps 
}: FormFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2">
        {label}
        {required && <Text className="text-red-500 ml-1">*</Text>}
      </Text>
      
      <TextInput
        className={`
          border rounded-lg px-4 py-3 text-gray-900 bg-white
          ${error ? 'border-red-300' : 'border-gray-300'}
          focus:border-blue-500
        `}
        placeholderTextColor="#9CA3AF"
        {...textInputProps}
      />
      
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}

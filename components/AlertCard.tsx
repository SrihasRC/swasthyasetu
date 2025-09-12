import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AlertCardProps {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  onPress?: () => void;
}

export default function AlertCard({ title, description, severity, timestamp, onPress }: AlertCardProps) {
  const getSeverityColors = () => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityTextColor = () => {
    switch (severity) {
      case 'high':
        return 'text-red-800';
      case 'medium':
        return 'text-yellow-800';
      case 'low':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const getSeverityBadgeColor = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-lg p-4 border-2 mb-3 ${getSeverityColors()}`}
      style={{ elevation: 1 }}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className={`text-lg font-semibold flex-1 ${getSeverityTextColor()}`}>
          {title}
        </Text>
        <View className={`px-2 py-1 rounded-full ml-2 ${getSeverityBadgeColor()}`}>
          <Text className="text-xs font-medium capitalize">
            {severity}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-700 mb-3 leading-5">
        {description}
      </Text>
      
      <Text className="text-sm text-gray-500">
        {timestamp}
      </Text>
    </TouchableOpacity>
  );
}

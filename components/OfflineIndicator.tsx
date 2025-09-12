import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface OfflineIndicatorProps {
  isOffline: boolean;
  pendingCount?: number;
  compact?: boolean;
}

export default function OfflineIndicator({ 
  isOffline, 
  pendingCount = 0,
  compact = false 
}: OfflineIndicatorProps) {
  if (!isOffline && pendingCount === 0) {
    return null;
  }

  if (compact) {
    return (
      <View className={`flex-row items-center px-2 py-1 rounded-full ${
        isOffline ? 'bg-red-100' : 'bg-orange-100'
      }`}>
        <Ionicons 
          name={isOffline ? "cloud-offline" : "cloud-upload-outline"} 
          size={14} 
          color={isOffline ? "#DC2626" : "#EA580C"} 
        />
        {pendingCount > 0 && (
          <Text className={`text-xs font-medium ml-1 ${
            isOffline ? 'text-red-700' : 'text-orange-700'
          }`}>
            {pendingCount}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className={`p-3 rounded-xl border ${
      isOffline 
        ? 'bg-red-50 border-red-200' 
        : 'bg-orange-50 border-orange-200'
    }`}>
      <View className="flex-row items-center">
        <Ionicons 
          name={isOffline ? "cloud-offline" : "cloud-upload-outline"} 
          size={20} 
          color={isOffline ? "#DC2626" : "#EA580C"} 
        />
        <View className="ml-3 flex-1">
          <Text className={`font-medium ${
            isOffline ? 'text-red-800' : 'text-orange-800'
          }`}>
            {isOffline ? 'Offline Mode' : 'Sync Pending'}
          </Text>
          <Text className={`text-sm ${
            isOffline ? 'text-red-600' : 'text-orange-600'
          }`}>
            {isOffline 
              ? `${pendingCount} reports waiting to sync`
              : `${pendingCount} reports pending upload`
            }
          </Text>
        </View>
      </View>
    </View>
  );
}

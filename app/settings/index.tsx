import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <View className='flex-1 bg-white'>
      {/* Header with Back Button */}
      <View className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Settings
          </Text>
        </View>
      </View>

      {/* Settings Content */}
      <View className='flex-1 p-4'>
        <Text className='text-gray-900 text-lg mb-4'>Settings Page</Text>
        
        {/* Add settings options here */}
        <View className="space-y-4">
          <TouchableOpacity className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Text className="text-gray-900 font-medium">Language Settings</Text>
            <Text className="text-gray-600 text-sm mt-1">Change app language</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Text className="text-gray-900 font-medium">Profile</Text>
            <Text className="text-gray-600 text-sm mt-1">Manage your profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Text className="text-gray-900 font-medium">Notifications</Text>
            <Text className="text-gray-600 text-sm mt-1">Configure alerts and notifications</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
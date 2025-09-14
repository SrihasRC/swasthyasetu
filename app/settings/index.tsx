import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../components/ThemeProvider';

export default function SettingsPage() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useAppTheme();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header with Back Button */}
      <View 
        className="px-4 pt-12 pb-4 border-b"
        style={{ 
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 mr-3"
          >
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text 
            className="text-xl font-semibold"
            style={{ color: colors.foreground }}
          >
            Settings
          </Text>
        </View>
      </View>

      {/* Settings Content */}
      <View className='flex-1 p-4'>
        <Text 
          className='text-lg mb-4'
          style={{ color: colors.foreground }}
        >
          App Settings
        </Text>
        
        {/* Settings Options */}
        <View className="flex gap-4">
          {/* Theme Toggle */}
          <View 
            className="p-4 rounded-lg border flex-row items-center justify-between"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-1">
              <View className="flex-row items-center gap-3">
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={20} 
                  color={colors.primary} 
                />
                <Text 
                  className="font-medium"
                  style={{ color: colors.foreground }}
                >
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <Text 
                className="text-sm mt-1"
                style={{ color: colors.mutedForeground }}
              >
                Toggle between light and dark themes
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: colors.muted,
                true: colors.primary,
              }}
              thumbColor={isDark ? colors.card : colors.card}
            />
          </View>
          
          <TouchableOpacity 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="language" size={20} color={colors.primary} />
              <View>
                <Text 
                  className="font-medium"
                  style={{ color: colors.foreground }}
                >
                  Language Settings
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  Change app language
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="person" size={20} color={colors.primary} />
              <View>
                <Text 
                  className="font-medium"
                  style={{ color: colors.foreground }}
                >
                  Profile
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  Manage your profile information
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <View>
                <Text 
                  className="font-medium"
                  style={{ color: colors.foreground }}
                >
                  Notifications
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  Configure alerts and notifications
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* App Info Section */}
          <View className="mt-6">
            <Text 
              className="text-lg mb-4"
              style={{ color: colors.foreground }}
            >
              About
            </Text>
            
            <View 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center gap-3 mb-3">
                <Ionicons name="shield-checkmark" size={20} color={colors.success} />
                <Text 
                  className="font-medium"
                  style={{ color: colors.foreground }}
                >
                  SwasthyaSetu
                </Text>
              </View>
              <Text 
                className="text-sm mb-2"
                style={{ color: colors.mutedForeground }}
              >
                Version 1.0.0
              </Text>
              <Text 
                className="text-sm"
                style={{ color: colors.mutedForeground }}
              >
                Government of India health monitoring app for rural communities
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
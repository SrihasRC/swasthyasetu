import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAppTheme } from '../../components/ThemeProvider';
import LanguageToggle from '../components/LanguageToggle';

export default function SettingsPage() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useAppTheme();
  const { t } = useTranslation();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header with Back Button */}
      <View 
        className="px-4 pt-12 pb-4 border-b"
        style={{ 
          backgroundColor: colors.background,
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
            {t('settings.title')}
          </Text>
        </View>
      </View>

      {/* Settings Content */}
      <View className='flex-1 p-4'>
        <Text 
          className='text-lg mb-4'
          style={{ color: colors.foreground }}
        >
          {t('settings.appSettings')}
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
                  {isDark ? t('settings.darkMode') : t('settings.lightMode')}
                </Text>
              </View>
              <Text 
                className="text-sm mt-1"
                style={{ color: colors.mutedForeground }}
              >
                {t('settings.themeToggleDescription')}
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
          
          {/* Language Settings */}
          <View 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="language" size={20} color={colors.primary} />
                  <Text 
                    className="font-medium"
                    style={{ color: colors.foreground }}
                  >
                    {t('settings.languageSettings')}
                  </Text>
                </View>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  {t('settings.languageDescription')}
                </Text>
              </View>
              <LanguageToggle />
            </View>
          </View>
          
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
                  {t('settings.profile')}
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  {t('settings.profileDescription')}
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
                  {t('settings.notifications')}
                </Text>
                <Text 
                  className="text-sm mt-1"
                  style={{ color: colors.mutedForeground }}
                >
                  {t('settings.notificationsDescription')}
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
              {t('settings.about')}
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
                  {t('settings.appName')}
                </Text>
              </View>
              <Text 
                className="text-sm mb-2"
                style={{ color: colors.mutedForeground }}
              >
                {t('settings.versionNumber')}
              </Text>
              <Text 
                className="text-sm"
                style={{ color: colors.mutedForeground }}
              >
                {t('settings.appDescription')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
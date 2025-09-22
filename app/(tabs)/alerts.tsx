import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AlertDetailsModal from '../../components/AlertDetailsModal';
import Header from '../../components/Header';
import { useAppTheme } from '../../components/ThemeProvider';
import { Alert } from '../../types/alert';

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Diarrhea Outbreak',
    description: 'Multiple cases reported in the area',
    location: 'Majuli Island',
    timeAgo: '2 hours ago',
    riskLevel: 'HIGH',
    type: 'outbreak',
    affectedCount: 12,
    isRead: false,
  },
  {
    id: '2',
    title: 'Water Contamination',
    description: 'High turbidity detected in main source',
    location: 'Jorhat District',
    timeAgo: '5 hours ago',
    riskLevel: 'MEDIUM',
    type: 'contamination',
    affectedCount: 8,
    isRead: false,
  },
  {
    id: '3',
    title: 'Boil Water Notice',
    description: 'Precautionary measure lifted',
    location: 'Dibrugarh',
    timeAgo: '1 day ago',
    riskLevel: 'RESOLVED',
    type: 'notice',
    isRead: true,
  },
  {
    id: '4',
    title: 'Heavy Rainfall Alert',
    description: 'Potential flooding risk',
    location: 'Upper Assam',
    timeAgo: '3 hours ago',
    riskLevel: 'MEDIUM',
    type: 'weather',
    isRead: true,
  },
];

export default function AlertsScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  
  // Modal state for AlertDetailsModal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const getRiskColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return colors.riskCritical;
      case 'MEDIUM': return colors.riskMedium;
      case 'LOW': return colors.riskLow;
      case 'RESOLVED': return colors.success;
      default: return colors.mutedForeground;
    }
  };

  // const getRiskBorderColor = (level: Alert['riskLevel']) => {
  //   switch (level) {
  //     case 'HIGH': return colors.riskCritical;
  //     case 'MEDIUM': return colors.riskMedium;
  //     case 'LOW': return colors.riskLow;
  //     case 'RESOLVED': return colors.success;
  //     default: return colors.border;
  //   }
  // };

  const getRiskIcon = (type: Alert['type']) => {
    switch (type) {
      case 'outbreak': return 'medical';
      case 'contamination': return 'water';
      case 'notice': return 'information-circle';
      case 'weather': return 'cloud-outline';
      default: return 'alert-circle';
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAlertPress = (alert: Alert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
    // Mark as read
    setAlerts(prev => 
      prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a)
    );
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header 
        title={t('alerts.title')} 
        showBack={false}
        rightElement={
          <View className="relative">
            <Ionicons name="notifications" size={24} color={colors.foreground} />
            {unreadCount > 0 && (
              <View 
                className="absolute -top-1 -right-1 rounded-full w-5 h-5 items-center justify-center"
                style={{ backgroundColor: colors.error }}
              >
                <Text className="text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </View>
        }
      />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="p-4">
          <Text 
            className="text-xl font-bold mb-6"
            style={{ color: colors.foreground }}
          >
            {t('alerts.title')}
          </Text>

          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              onPress={() => handleAlertPress(alert)}
              className="mb-4"
              activeOpacity={0.8}
            >
              <View 
                className="p-5 rounded-xl shadow-sm"
                style={{ 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                {/* Header Row */}
                <View className="flex flex-row items-center justify-between mb-4">
                  <View className="flex flex-row items-center gap-3">
                      <Ionicons 
                        name={getRiskIcon(alert.type)} 
                        size={20} 
                        color={colors.mutedForeground}
                      />
                    <View 
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: getRiskColor(alert.riskLevel) }}
                    >
                      <Text className="text-xs font-bold text-white">
                        {alert.riskLevel}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Unread Indicator */}
                  {!alert.isRead ? (
                    <View 
                      className="flex flex-row items-center px-3 py-1 rounded-full gap-2"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <View 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <Text 
                        className="text-xs font-bold"
                        style={{ color: colors.primary }}
                      >
                        {t('alerts.unread')}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                      <Text 
                        className="text-xs font-medium"
                        style={{ color: colors.success }}
                      >
                        READ
                      </Text>
                    </View>
                  )}
                </View>

                {/* Content */}
                <View className="flex flex-col gap-3">
                  <Text 
                    className="text-lg font-bold leading-6"
                    style={{ color: colors.foreground }}
                  >
                    {alert.title}
                  </Text>
                  
                  <Text 
                    className="text-sm leading-5"
                    style={{ color: colors.mutedForeground }}
                  >
                    {alert.description}
                  </Text>

                  <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                      <Ionicons name="location-outline" size={16} color={colors.mutedForeground} />
                      <Text 
                        className="text-sm font-medium"
                        style={{ color: colors.foreground }}
                      >
                        {alert.location}
                      </Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={14} color={colors.mutedForeground} />
                      <Text 
                        className="text-xs font-medium"
                        style={{ color: colors.mutedForeground }}
                      >
                        {alert.timeAgo}
                      </Text>
                    </View>
                  </View>

                  {alert.affectedCount && (
                    <View className="flex flex-row items-center gap-2">
                      <Ionicons name="people-outline" size={16} color={colors.mutedForeground} />
                      <Text 
                        className="text-sm font-medium"
                        style={{ color: colors.mutedForeground }}
                      >
                        {alert.affectedCount} cases affected
                      </Text>
                    </View>
                  )}

                  {/* Tap to view indicator */}
                  {alert.riskLevel !== 'RESOLVED' && (
                    <View 
                      className="mt-2 pt-3 border-t"
                      style={{ borderColor: colors.border }}
                    >
                      <View className="flex flex-row items-center justify-center py-2 gap-2">
                        <Ionicons name="eye-outline" size={16} color={colors.mutedForeground} />
                        <Text 
                          className="text-sm font-medium"
                          style={{ color: colors.mutedForeground }}
                        >
                          Tap to view full details
                        </Text>
                        <Ionicons name="chevron-forward-outline" size={14} color={colors.mutedForeground} />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}          
          
          {/* Emergency Contact Section */}
          <TouchableOpacity 
            className="mt-6 p-4 rounded-xl border shadow-sm"
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
            onPress={() => {/* Handle emergency call */}}
            activeOpacity={0.8}
          >
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-4">
                <View 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: colors.error + '20' }}
                >
                  <Ionicons name="call" size={24} color={colors.error} />
                </View>
                <View className="flex flex-col gap-1">
                  <Text 
                    className="font-bold text-lg"
                    style={{ color: colors.foreground }}
                  >
                    {t('contacts.emergency')}: 108
                  </Text>
                  <Text 
                    className="text-xs"
                    style={{ color: colors.mutedForeground }}
                  >
                    {t('contacts.available24x7')}
                  </Text>
                </View>
              </View>
              <View 
                className="px-5 py-3 rounded-xl shadow-sm"
                style={{ backgroundColor: colors.error }}
              >
                <Text className="text-white font-bold text-sm">{t('contacts.call')}</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Info Section */}
          <View 
            className="p-4 mt-6 rounded-lg"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="information-circle" size={20} color={colors.primary} />
              <Text 
                className="font-semibold ml-2"
                style={{ color: colors.primary }}
              >
                Alert Guidelines
              </Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row items-start">
                <Text 
                  className="text-sm mr-2"
                  style={{ color: colors.primary }}
                >
                  •
                </Text>
                <Text 
                  className="text-sm flex-1"
                  style={{ color: colors.primary }}
                >
                  Alerts are updated in real-time when network is available
                </Text>
              </View>
              <View className="flex-row items-start">
                <Text 
                  className="text-sm mr-2"
                  style={{ color: colors.primary }}
                >
                  •
                </Text>
                <Text 
                  className="text-sm flex-1"
                  style={{ color: colors.primary }}
                >
                  High-risk alerts require immediate attention
                </Text>
              </View>
              <View className="flex-row items-start">
                <Text 
                  className="text-sm mr-2"
                  style={{ color: colors.primary }}
                >
                  •
                </Text>
                <Text 
                  className="text-sm flex-1"
                  style={{ color: colors.primary }}
                >
                  Pull down to refresh for latest updates
                </Text>
              </View>
            </View>
          </View>
          </View>
      </ScrollView>
      
      {/* Alert Details Modal */}
      <AlertDetailsModal
        visible={modalVisible}
        alert={selectedAlert}
        onClose={() => {
          setModalVisible(false);
          setSelectedAlert(null);
        }}
      />
    </View>
  );
}

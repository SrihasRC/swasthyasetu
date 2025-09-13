import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AlertDetailsModal from '../../components/AlertDetailsModal';
import Header from '../../components/Header';
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
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const getRiskColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-orange-500';
      case 'LOW': return 'bg-yellow-500';
      case 'RESOLVED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBorderColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'border-red-500';
      case 'MEDIUM': return 'border-orange-500';
      case 'LOW': return 'border-yellow-500';
      case 'RESOLVED': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getRiskLightBorder = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'border-red-200';
      case 'MEDIUM': return 'border-orange-200';
      case 'LOW': return 'border-yellow-200';
      case 'RESOLVED': return 'border-green-200';
      default: return 'border-gray-200';
    }
  };

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
    setShowDetails(true);
    // Mark as read
    setAlerts(prev => 
      prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a)
    );
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Alerts & Notices" 
        showBack={false}
        rightElement={
          <View className="relative">
            <Ionicons name="notifications" size={24} color="#1F2937" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
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
          <Text className="text-xl font-bold text-gray-900 mb-6">
            Recent Alerts
          </Text>

          {alerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              onPress={() => handleAlertPress(alert)}
              className="mb-4"
              activeOpacity={0.8}
            >
              <View 
                className={`p-5 rounded-xl border-l shadow-sm bg-white border ${getRiskBorderColor(alert.riskLevel)} ${getRiskLightBorder(alert.riskLevel)}`}
              >
                {/* Header Row */}
                <View className="flex flex-row items-center justify-between mb-4">
                  <View className="flex flex-row items-center gap-3">
                      <Ionicons 
                        name={getRiskIcon(alert.type)} 
                        size={20} 
                        color="#374151" 
                      />
                    <View className={`px-3 py-1 rounded-full ${getRiskColor(alert.riskLevel)}`}>
                      <Text className="text-xs font-bold text-white">
                        {alert.riskLevel}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Unread Indicator */}
                  {!alert.isRead ? (
                    <View className="flex flex-row items-center bg-blue-100 px-3 py-1 rounded-full gap-2">
                      <View className="w-2 h-2 bg-blue-500 rounded-full" />
                      <Text className="text-xs font-bold text-blue-700">NEW</Text>
                    </View>
                  ) : (
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="checkmark-circle" size={16} color="#059669" />
                      <Text className="text-xs font-medium text-green-600">READ</Text>
                    </View>
                  )}
                </View>

                {/* Content */}
                <View className="flex flex-col gap-3">
                  <Text className="text-lg font-bold text-gray-900 leading-6">
                    {alert.title}
                  </Text>
                  
                  <Text className="text-sm text-gray-600 leading-5">
                    {alert.description}
                  </Text>

                  <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                      <Ionicons name="location-outline" size={16} color="#6B7280" />
                      <Text className="text-sm font-medium text-gray-700">
                        {alert.location}
                      </Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                      <Text className="text-xs text-gray-500 font-medium">
                        {alert.timeAgo}
                      </Text>
                    </View>
                  </View>

                  {alert.affectedCount && (
                    <View className="flex flex-row items-center gap-2">
                      <Ionicons name="people-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 font-medium">
                        {alert.affectedCount} cases affected
                      </Text>
                    </View>
                  )}

                  {/* Tap to view indicator */}
                  {alert.riskLevel !== 'RESOLVED' && (
                    <View className="mt-2 pt-3 border-t border-gray-100">
                      <View className="flex flex-row items-center justify-center py-2 gap-2">
                        <Ionicons name="eye-outline" size={16} color="#6B7280" />
                        <Text className="text-gray-600 text-sm font-medium">
                          Tap to view full details
                        </Text>
                        <Ionicons name="chevron-forward-outline" size={14} color="#9CA3AF" />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}          
          
          {/* Emergency Contact Section */}
          <TouchableOpacity 
            className="mt-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            onPress={() => {/* Handle emergency call */}}
            activeOpacity={0.8}
          >
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-4">
                <View className="bg-red-100 p-3 rounded-xl">
                  <Ionicons name="call" size={24} color="#DC2626" />
                </View>
                <View className="flex flex-col gap-1">
                  <Text className="font-bold text-gray-900 text-lg">Emergency: 108</Text>
                  <Text className="text-xs text-gray-600">24/7 National Medical Helpline</Text>
                </View>
              </View>
              <View className="bg-red-600 px-5 py-3 rounded-xl shadow-sm">
                <Text className="text-white font-bold text-sm">CALL NOW</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Info Section */}
            <View className="bg-blue-50 p-4 mt-6 rounded-lg">
              <View className="flex-row items-center mb-3">
                <Ionicons name="information-circle" size={20} color="#1E40AF" />
                <Text className="text-blue-900 font-semibold ml-2">
                  Alert Guidelines
                </Text>
              </View>
              <View className="space-y-2">
                <View className="flex-row items-start">
                  <Text className="text-blue-800 text-sm mr-2">•</Text>
                  <Text className="text-blue-800 text-sm flex-1">
                    Alerts are updated in real-time when network is available
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-800 text-sm mr-2">•</Text>
                  <Text className="text-blue-800 text-sm flex-1">
                    High-risk alerts require immediate attention
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-800 text-sm mr-2">•</Text>
                  <Text className="text-blue-800 text-sm flex-1">
                    Pull down to refresh for latest updates
                  </Text>
                </View>
              </View>
            </View>
          </View>
      </ScrollView>

      {/* Alert Details Modal */}
      <AlertDetailsModal
        visible={showDetails}
        alert={selectedAlert}
        onClose={() => setShowDetails(false)}
      />
    </View>
  );
}

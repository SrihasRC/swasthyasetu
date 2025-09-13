import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../components/Card';
import Header from '../../components/Header';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'RESOLVED';
  type: 'outbreak' | 'contamination' | 'notice' | 'weather';
  affectedCount?: number;
  isRead: boolean;
}

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

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [refreshing, setRefreshing] = useState(false);

  const getRiskColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-orange-500';
      case 'LOW': return 'bg-yellow-500';
      case 'RESOLVED': return 'bg-green-500';
      default: return 'bg-gray-500';
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
    // Mark as read
    setAlerts(prev => 
      prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a)
    );
    
    // Navigate to alert details (will implement in a separate screen)
    console.log('Alert clicked:', alert.id);
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
              activeOpacity={0.7}
            >
              <Card variant="elevated">
                <View className="flex-row items-start space-x-3">
                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center gap-2">
                        {!alert.isRead && (
                          <View className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                        <View className={`px-3 py-1 rounded-full ${getRiskColor(alert.riskLevel)}`}>
                          <Text className="text-xs font-bold text-white">
                            {alert.riskLevel}
                          </Text>
                        </View>
                      </View>
                      <Ionicons 
                        name={getRiskIcon(alert.type)} 
                        size={22} 
                        color="#6B7280" 
                      />
                    </View>

                    <Text className="text-lg font-semibold text-gray-900 mb-2">
                      {alert.title}
                    </Text>
                    
                    <Text className="text-sm text-gray-600 mb-3 leading-5">
                      {alert.description}
                    </Text>

                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#6B7280" />
                        <Text className="text-sm font-medium text-gray-700 ml-1">
                          {alert.location}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-500">
                        {alert.timeAgo}
                      </Text>
                    </View>

                    {alert.affectedCount && (
                      <View className="flex-row items-center mb-3">
                        <Ionicons name="people-outline" size={16} color="#6B7280" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {alert.affectedCount} cases affected
                        </Text>
                      </View>
                    )}

                    {alert.riskLevel !== 'RESOLVED' && (
                      <View className="mt-3 pt-3 border-t border-gray-100">
                        <TouchableOpacity className="bg-blue-600 py-3 px-4 rounded-lg">
                          <Text className="text-white text-sm font-semibold text-center">
                            View Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          {/* Emergency Contact Section */}
          <View className="mt-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <View className="items-center">
              <View className="flex-row items-center mb-4">
                <Ionicons name="warning" size={24} color="#DC2626" />
                <Text className="text-xl font-bold text-red-600 ml-2">
                  Emergency Contact
                </Text>
              </View>
              
              <TouchableOpacity 
                className="bg-red-600 py-4 px-8 rounded-lg mb-3"
                onPress={() => {/* Handle emergency call */}}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="call" size={20} color="#FFFFFF" />
                  <Text className="text-white text-lg font-bold ml-2">
                    Call 108
                  </Text>
                </View>
              </TouchableOpacity>
              
              <Text className="text-red-600 text-sm text-center">
                National Emergency Helpline - Available 24/7
              </Text>
            </View>
          </View>

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
    </View>
  );
}
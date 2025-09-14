import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { useAppTheme } from '../../components/ThemeProvider';

interface EmergencyContact {
  id: string;
  name: string;
  title: string;
  phone: string;
  type: 'emergency' | 'health_center' | 'official';
  isAvailable24x7?: boolean;
  location?: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: '108',
    title: 'National Emergency',
    phone: '108',
    type: 'emergency',
    isAvailable24x7: true
  },
  {
    id: '2',
    name: 'PHC Majuli',
    title: 'Primary Health Center',
    phone: '+91-9876543210',
    type: 'health_center',
    location: 'Majuli, Assam',
    isAvailable24x7: true
  },
  {
    id: '3',
    name: 'CHC Jorhat',
    title: 'Community Health Center',
    phone: '+91-9823456789',
    type: 'health_center',
    location: 'Jorhat, Assam'
  },
  {
    id: '4',
    name: 'Dr. R. Sharma',
    title: 'District CMO',
    phone: '+91-9765432108',
    type: 'official',
    location: 'Jorhat District'
  },
  {
    id: '5',
    name: 'Dr. P. Borah',
    title: 'Block Medical Officer',
    phone: '+91-9654321078',
    type: 'official',
    location: 'Majuli Block'
  },
  {
    id: '6',
    name: 'Health Helpline Assam',
    title: 'State Health Helpline',
    phone: '104',
    type: 'emergency',
    isAvailable24x7: true
  }
];

export default function ContactsScreen() {
  const { colors } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCall = async (contact: EmergencyContact) => {
    try {
      const phoneUrl = `tel:${contact.phone}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);
      
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Unable to make phone calls on this device');
      }
    } catch {
      Alert.alert('Error', 'Failed to initiate call');
    }
  };

  const handleDirection = (contact: EmergencyContact) => {
    if (contact.location) {
      Alert.alert('Directions', `Opening directions to ${contact.location}`);
      // In real app, this would open maps app
    } else {
      Alert.alert('Location', 'Location information not available');
    }
  };

  const handleMessage = (contact: EmergencyContact) => {
    Alert.alert('Message', `Opening message to ${contact.name}`);
    // In real app, this would open SMS app
  };

  const getContactIcon = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'emergency': return 'warning-outline';
      case 'health_center': return 'medical-outline';
      case 'official': return 'person-outline';
      default: return 'call-outline';
    }
  };

  const getContactColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'emergency': return colors.error;
      case 'health_center': return colors.success;
      case 'official': return colors.primary;
      default: return colors.mutedForeground;
    }
  };

  const emergencyNumbers = emergencyContacts.filter(c => c.type === 'emergency');
  const healthCenters = emergencyContacts.filter(c => c.type === 'health_center');
  const officials = emergencyContacts.filter(c => c.type === 'official');

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header 
        title="Emergency Contacts" 
        subtitle="Get Help When You Need It"
      />
      
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-4 py-4 flex flex-col gap-4">
          
          {/* Emergency Numbers */}
          <View>
            <View className="flex flex-row items-center gap-3 mb-4">
              <View 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.error + '20' }}
              >
                <Ionicons name="warning" size={20} color={colors.error} />
              </View>
              <Text 
                className="text-xl font-bold"
                style={{ color: colors.foreground }}
              >
                Emergency
              </Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {emergencyNumbers.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => handleCall(contact)}
                  className="rounded-xl p-4 shadow-sm border-l"
                  style={{ 
                    backgroundColor: colors.card,
                    borderLeftColor: colors.error,
                    borderRightWidth: 1, 
                    borderTopWidth: 1, 
                    borderBottomWidth: 1, 
                    borderRightColor: colors.border, 
                    borderTopColor: colors.border, 
                    borderBottomColor: colors.border,
                  }}
                  activeOpacity={0.8}
                >
                  <View className="flex flex-row items-center gap-3">
                    <View 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.error }}
                    >
                      <Ionicons name="call" size={20} color="white" />
                    </View>
                    
                    <View className="flex-1 flex flex-col gap-1">
                      <Text 
                        className="font-bold text-lg"
                        style={{ color: colors.foreground }}
                      >
                        {contact.name}
                      </Text>
                      <Text 
                        className="text-sm font-medium"
                        style={{ color: colors.mutedForeground }}
                      >
                        {contact.title}
                      </Text>
                      {contact.isAvailable24x7 && (
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={12} color={colors.success} />
                          <Text 
                            className="text-xs font-medium"
                            style={{ color: colors.success }}
                          >
                            24/7 Available
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    <View 
                      className="px-3 py-2 rounded-lg"
                      style={{ backgroundColor: colors.error }}
                    >
                      <Text className="text-white font-bold text-xs">CALL</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Health Centers */}
          <View>
            <View className="flex flex-row items-center gap-3 mb-4">
              <View 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.success + '20' }}
              >
                <Ionicons name="medical" size={20} color={colors.success} />
              </View>
              <Text 
                className="text-xl font-bold"
                style={{ color: colors.foreground }}
              >
                Health Centers
              </Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {healthCenters.map((contact) => (
                <View
                  key={contact.id}
                  className="rounded-xl p-4 shadow-sm border"
                  style={{ 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <View className="flex flex-row items-center gap-3 mb-3">
                    <View 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.success + '20' }}
                    >
                      <Ionicons 
                        name={getContactIcon(contact.type)} 
                        size={20} 
                        color={getContactColor(contact.type)} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text 
                        className="font-bold text-base"
                        style={{ color: colors.foreground }}
                      >
                        {contact.name}
                      </Text>
                      <Text 
                        className="text-sm"
                        style={{ color: colors.mutedForeground }}
                      >
                        {contact.title}
                      </Text>
                      <View className="flex flex-row items-center flex-wrap gap-3 mt-1">
                        {contact.location && (
                          <View className="flex flex-row items-center gap-1">
                            <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
                            <Text 
                              className="text-xs"
                              style={{ color: colors.mutedForeground }}
                            >
                              {contact.location}
                            </Text>
                          </View>
                        )}
                        {contact.isAvailable24x7 && (
                          <View className="flex flex-row items-center gap-1">
                            <Ionicons name="time-outline" size={12} color={colors.success} />
                            <Text 
                              className="text-xs font-medium"
                              style={{ color: colors.success }}
                            >
                              24/7
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  
                  <View className="flex flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => handleCall(contact)}
                      className="flex-1 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                      style={{ backgroundColor: colors.success }}
                    >
                      <Ionicons name="call-outline" size={16} color="white" />
                      <Text className="text-white font-bold text-sm">Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => handleDirection(contact)}
                      className="flex-1 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2 border"
                      style={{ borderColor: colors.border }}
                    >
                      <Ionicons name="navigate-outline" size={18} color={colors.foreground} />
                      <Text 
                        className="font-bold"
                        style={{ color: colors.foreground }}
                      >
                        Direction
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Health Officials */}
          <View>
            <View className="flex flex-row items-center gap-3 mb-4">
              <View 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="people" size={20} color={colors.primary} />
              </View>
              <Text 
                className="text-xl font-bold"
                style={{ color: colors.foreground }}
              >
                Health Officials
              </Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {officials.map((contact) => (
                <View
                  key={contact.id}
                  className="rounded-xl p-4 shadow-sm border"
                  style={{ 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                >
                  <View className="flex flex-row items-center gap-3 mb-3">
                    <View 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <Ionicons 
                        name={getContactIcon(contact.type)} 
                        size={20} 
                        color={getContactColor(contact.type)} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text 
                        className="font-bold text-base"
                        style={{ color: colors.foreground }}
                      >
                        {contact.name}
                      </Text>
                      <Text 
                        className="text-sm"
                        style={{ color: colors.mutedForeground }}
                      >
                        {contact.title}
                      </Text>
                      {contact.location && (
                        <View className="flex flex-row items-center gap-1 mt-1">
                          <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
                          <Text 
                            className="text-xs"
                            style={{ color: colors.mutedForeground }}
                          >
                            {contact.location}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <View className="flex flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => handleCall(contact)}
                      className="flex-1 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Ionicons name="call-outline" size={16} color="white" />
                      <Text className="text-white font-bold text-sm">Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => handleMessage(contact)}
                      className="flex-1 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2 border"
                      style={{ borderColor: colors.border }}
                    >
                      <Ionicons name="chatbubble-outline" size={16} color={colors.foreground} />
                      <Text 
                        className="font-bold text-sm"
                        style={{ color: colors.foreground }}
                      >
                        Message
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View 
            className="rounded-xl p-4 border"
            style={{ 
              backgroundColor: colors.primary + '10',
              borderColor: colors.primary + '30',
            }}
          >
            <View className="flex flex-row items-center gap-3 mb-3">
              <View 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="flash-outline" size={18} color={colors.primary} />
              </View>
              <Text 
                className="font-bold text-base"
                style={{ color: colors.primary }}
              >
                Quick Actions
              </Text>
            </View>
            
            <View className="flex flex-col gap-2">
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  Add Emergency Contact
                </Text>
                <Ionicons name="chevron-forward-outline" size={14} color={colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="share-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  Share Contact List
                </Text>
                <Ionicons name="chevron-forward-outline" size={14} color={colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="download-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  Save for Offline
                </Text>
                <Ionicons name="chevron-forward-outline" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';

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
      case 'emergency': return '#DC2626';
      case 'health_center': return '#059669';
      case 'official': return '#1E40AF';
      default: return '#6B7280';
    }
  };

  const getContactBgColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'emergency': return '#FEF2F2';
      case 'health_center': return '#ECFDF5';
      case 'official': return '#EFF6FF';
      default: return '#F9FAFB';
    }
  };

  const emergencyNumbers = emergencyContacts.filter(c => c.type === 'emergency');
  const healthCenters = emergencyContacts.filter(c => c.type === 'health_center');
  const officials = emergencyContacts.filter(c => c.type === 'official');

  return (
    <View className="flex-1 bg-gray-50">
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
              <View className="bg-red-100 p-2 rounded-lg">
                <Ionicons name="warning" size={20} color="#DC2626" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Emergency</Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {emergencyNumbers.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => handleCall(contact)}
                  className="bg-white rounded-xl p-4 shadow-sm border-l-2 border-red-500"
                  style={{ borderRightWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderRightColor: '#E5E7EB', borderTopColor: '#E5E7EB', borderBottomColor: '#E5E7EB' }}
                  activeOpacity={0.8}
                >
                  <View className="flex flex-row items-center gap-3">
                    <View className="bg-red-600 p-3 rounded-lg">
                      <Ionicons name="call" size={20} color="white" />
                    </View>
                    
                    <View className="flex-1 flex flex-col gap-1">
                      <Text className="font-bold text-gray-900 text-lg">{contact.name}</Text>
                      <Text className="text-gray-600 text-sm font-medium">{contact.title}</Text>
                      {contact.isAvailable24x7 && (
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={12} color="#059669" />
                          <Text className="text-green-600 text-xs font-medium">24/7 Available</Text>
                        </View>
                      )}
                    </View>
                    
                    <View className="bg-red-600 px-3 py-2 rounded-lg">
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
              <View className="bg-green-100 p-2 rounded-lg">
                <Ionicons name="medical" size={20} color="#059669" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Health Centers</Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {healthCenters.map((contact) => (
                <View
                  key={contact.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <View className="flex flex-row items-center gap-3 mb-3">
                    <View 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: getContactBgColor(contact.type) }}
                    >
                      <Ionicons 
                        name={getContactIcon(contact.type)} 
                        size={20} 
                        color={getContactColor(contact.type)} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-gray-900 text-base">{contact.name}</Text>
                      <Text className="text-gray-600 text-sm">{contact.title}</Text>
                      <View className="flex flex-row items-center flex-wrap gap-3 mt-1">
                        {contact.location && (
                          <View className="flex flex-row items-center gap-1">
                            <Ionicons name="location-outline" size={12} color="#6B7280" />
                            <Text className="text-gray-500 text-xs">{contact.location}</Text>
                          </View>
                        )}
                        {contact.isAvailable24x7 && (
                          <View className="flex flex-row items-center gap-1">
                            <Ionicons name="time-outline" size={12} color="#059669" />
                            <Text className="text-green-600 text-xs font-medium">24/7</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  
                  <View className="flex flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => handleCall(contact)}
                      className="flex-1 bg-green-600 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                    >
                      <Ionicons name="call-outline" size={16} color="white" />
                      <Text className="text-white font-bold text-sm">Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => handleDirection(contact)}
                      className="flex-1 border border-gray-300 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                    >
                      <Ionicons name="navigate-outline" size={18} color="#374151" />
                      <Text className="text-gray-700 font-bold">Direction</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Health Officials */}
          <View>
            <View className="flex flex-row items-center gap-3 mb-4">
              <View className="bg-blue-100 p-2 rounded-lg">
                <Ionicons name="people" size={20} color="#1E40AF" />
              </View>
              <Text className="text-xl font-bold text-gray-900">Health Officials</Text>
            </View>
            
            <View className="flex flex-col gap-3">
              {officials.map((contact) => (
                <View
                  key={contact.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <View className="flex flex-row items-center gap-3 mb-3">
                    <View 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: getContactBgColor(contact.type) }}
                    >
                      <Ionicons 
                        name={getContactIcon(contact.type)} 
                        size={20} 
                        color={getContactColor(contact.type)} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-gray-900 text-base">{contact.name}</Text>
                      <Text className="text-gray-600 text-sm">{contact.title}</Text>
                      {contact.location && (
                        <View className="flex flex-row items-center gap-1 mt-1">
                          <Ionicons name="location-outline" size={12} color="#6B7280" />
                          <Text className="text-gray-500 text-xs">{contact.location}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <View className="flex flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => handleCall(contact)}
                      className="flex-1 bg-blue-600 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                    >
                      <Ionicons name="call-outline" size={16} color="white" />
                      <Text className="text-white font-bold text-sm">Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      onPress={() => handleMessage(contact)}
                      className="flex-1 border border-gray-300 py-2 px-3 rounded-lg flex flex-row items-center justify-center gap-2"
                    >
                      <Ionicons name="chatbubble-outline" size={16} color="#374151" />
                      <Text className="text-gray-700 font-bold text-sm">Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <View className="flex flex-row items-center gap-3 mb-3">
              <View className="bg-blue-100 p-2 rounded-lg">
                <Ionicons name="flash-outline" size={18} color="#1E40AF" />
              </View>
              <Text className="text-blue-900 font-bold text-base">Quick Actions</Text>
            </View>
            
            <View className="flex flex-col gap-2">
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="add-circle-outline" size={18} color="#1E40AF" />
                <Text className="text-blue-800 font-medium flex-1 text-sm">Add Emergency Contact</Text>
                <Ionicons name="chevron-forward-outline" size={14} color="#1E40AF" />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="share-outline" size={18} color="#1E40AF" />
                <Text className="text-blue-800 font-medium flex-1 text-sm">Share Contact List</Text>
                <Ionicons name="chevron-forward-outline" size={14} color="#1E40AF" />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="download-outline" size={18} color="#1E40AF" />
                <Text className="text-blue-800 font-medium flex-1 text-sm">Save for Offline</Text>
                <Ionicons name="chevron-forward-outline" size={14} color="#1E40AF" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
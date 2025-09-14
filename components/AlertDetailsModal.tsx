import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Alert, AlertDetailsModalProps } from '../types/alert';
import Card from './Card';
import { useAppTheme } from './ThemeProvider';

export default function AlertDetailsModal({
  visible,
  alert,
  onClose,
}: AlertDetailsModalProps) {
  const { colors } = useAppTheme();
  
  const getRiskColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return colors.riskCritical;
      case 'MEDIUM': return colors.riskMedium;
      case 'LOW': return colors.riskLow;
      case 'RESOLVED': return colors.success;
      default: return colors.mutedForeground;
    }
  };

  const getRiskIconForLevel = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'alert-circle';
      case 'LOW': return 'information-circle';
      case 'RESOLVED': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  const getImmediateActions = (type: Alert['type'], riskLevel: Alert['riskLevel']) => {
    const baseActions = {
      outbreak: [
        'Avoid crowded areas and maintain social distancing',
        'Practice good hygiene - wash hands frequently',
        'Seek medical attention if symptoms develop',
        'Follow local health authority guidelines'
      ],
      contamination: [
        'Use only bottled or boiled water for drinking',
        'Avoid swimming in affected water bodies',
        'Report any unusual water taste, smell, or color',
        'Seek alternative water sources immediately'
      ],
      notice: [
        'Read the full notice carefully',
        'Share information with family and neighbors',
        'Follow any specific instructions provided',
        'Contact authorities if you have questions'
      ],
      weather: [
        'Stay indoors and avoid unnecessary travel',
        'Secure loose objects that could become projectiles',
        'Keep emergency supplies readily available',
        'Monitor weather updates regularly'
      ]
    };

    let actions = baseActions[type] || [
      'Stay alert and monitor the situation',
      'Follow local authority guidance',
      'Report any relevant information to authorities',
      'Take necessary precautions for your safety'
    ];

    if (riskLevel === 'HIGH') {
      actions = ['EVACUATE IMMEDIATELY if instructed by authorities', ...actions];
    }

    return actions;
  };

  const getContactInfo = (location: string) => {
    // This would typically come from a database based on location
    const contacts = [
      {
        name: 'District Health Officer',
        role: 'Primary Health Authority',
        phone: '+91-98765-43210'
      },
      {
        name: 'Emergency Services',
        role: 'Emergency Response',
        phone: '108'
      },
      {
        name: 'Local PHC',
        role: `${location} Primary Health Center`,
        phone: '+91-98765-43211'
      }
    ];
    return contacts;
  };

  const handlePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  if (!alert) return null;

  const immediateActions = getImmediateActions(alert.type, alert.riskLevel);
  const contacts = getContactInfo(alert.location);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        {/* Header */}
        <View 
          className="px-6 py-4 flex-row items-center justify-between shadow-sm"
          style={{ backgroundColor: colors.background, borderBottomColor: colors.border, borderBottomWidth: 1 }}
        >
          <Text className="text-white text-xl font-bold">Alert Details</Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full active:opacity-80"
          >
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-4">
            
            {/* Risk Level Header */}
            <View className="items-center mb-6">
              <View 
                className="px-6 py-3 rounded-lg flex-row items-center"
                style={{ backgroundColor: getRiskColor(alert.riskLevel) }}
              >
                <Ionicons name={getRiskIconForLevel(alert.riskLevel)} size={24} color="white" />
                <Text className="text-white text-lg font-bold ml-2">
                  {alert.riskLevel} RISK ALERT
                </Text>
              </View>
            </View>

            {/* Alert Title and Location */}
            <View className="mb-6">
              <Text 
                style={{ color: colors.foreground }} 
                className="text-2xl font-bold text-center mb-2"
              >
                {alert.title}
              </Text>
              <Text 
                style={{ color: colors.primary }} 
                className="text-lg font-medium text-center"
              >
                {alert.location}
              </Text>
            </View>

            {/* Alert Summary Card */}
            <Card variant="elevated">
              <View className="flex gap-1">
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.mutedForeground }}>Affected:</Text>
                  <Text style={{ color: colors.foreground }} className="font-medium">
                    {alert.affectedCount}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.mutedForeground }}>Reported:</Text>
                  <Text style={{ color: colors.foreground }} className="font-medium">
                    {alert.timeAgo}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.mutedForeground }}>Status:</Text>
                  <Text style={{ color: colors.foreground }} className="font-medium">
                    {alert.riskLevel === 'RESOLVED' ? 'Resolved' : 'Active'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text style={{ color: colors.mutedForeground }}>Risk:</Text>
                  <Text 
                    style={{ color: getRiskColor(alert.riskLevel) }} 
                    className="font-bold"
                  >
                    {alert.riskLevel}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Description */}
            <View className="my-6">
              <Text style={{ color: colors.foreground }} className="text-base leading-6">
                {alert.description}
              </Text>
            </View>

            {/* Immediate Actions */}
            <View className="mb-6">
              <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
                Immediate Actions
              </Text>
              <View className="space-y-2">
                {immediateActions.map((action: string, index: number) => (
                  <View key={index} className="flex-row items-start">
                    <Text style={{ color: colors.primary }} className="text-base mr-2">•</Text>
                    <Text style={{ color: colors.foreground }} className="text-base flex-1">
                      {action}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Contact Information */}
            <View className="mb-6">
              <Text style={{ color: colors.foreground }} className="text-lg font-bold mb-4">
                Contact
              </Text>
              <View className="flex gap-3">
                {contacts.map((contact: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePhoneCall(contact.phone)}
                    className="p-4 rounded-xl border flex-row items-center justify-between"
                    style={{ 
                      backgroundColor: colors.card,
                      borderColor: colors.border
                    }}
                    activeOpacity={0.7}
                  >
                    <View className="flex-1">
                      <Text style={{ color: colors.foreground }} className="font-semibold">
                        {contact.name}: Call
                      </Text>
                      <Text style={{ color: colors.mutedForeground }} className="text-sm">
                        {contact.role}
                      </Text>
                    </View>
                    <Ionicons name="call" size={20} color={colors.primary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

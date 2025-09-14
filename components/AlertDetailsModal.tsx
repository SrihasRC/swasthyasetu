import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Alert as RNAlert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Alert, AlertDetailsModalProps } from '../types/alert';
import { useAppTheme } from './ThemeProvider';

export default function AlertDetailsModal({
  visible,
  alert,
  onClose,
  onReport,
  onEmergencyCall,
  onShare
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

  const handleReport = () => {
    if (alert && onReport) {
      onReport(alert);
    } else {
      RNAlert.alert("Report Submitted", "Your report has been forwarded to the authorities.");
    }
  };

  const handleEmergencyCall = () => {
    if (alert && onEmergencyCall) {
      onEmergencyCall(alert);
    } else {
      RNAlert.alert("Emergency Call", "Calling emergency services...");
    }
  };

  const handleShare = () => {
    if (alert && onShare) {
      onShare(alert);
    } else {
      RNAlert.alert("Shared", "Alert shared with your team.");
    }
  };

  if (!alert) return null;

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
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white text-xl font-bold">Alert Details</Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full active:opacity-80"
            style={{ backgroundColor: colors.primary + 'CC' }}
          >
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* Main Content */}
          <View className="px-6 py-6 flex flex-col gap-6">
            
            {/* Risk Level & Time Section */}
            <View className="flex flex-row items-center justify-between">
              <View 
                className="px-4 py-2 rounded-md shadow-sm"
                style={{ backgroundColor: getRiskColor(alert.riskLevel) }}
              >
                <Text className="text-white font-bold text-sm">
                  {alert.riskLevel} RISK
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color={colors.mutedForeground} />
                <Text 
                  className="text-sm font-medium"
                  style={{ color: colors.mutedForeground }}
                >
                  {alert.timeAgo}
                </Text>
              </View>
            </View>

            {/* Title Section */}
            <View 
              className="rounded-md border p-6 shadow-sm"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <Text 
                className="text-2xl font-bold leading-8"
                style={{ color: colors.foreground }}
              >
                {alert.title}
              </Text>
              
              <View className="flex flex-row items-center gap-2 mt-4">
                <Ionicons name="location-outline" size={20} color={colors.mutedForeground} />
                <Text 
                  className="text-base font-medium"
                  style={{ color: colors.mutedForeground }}
                >
                  {alert.location}
                </Text>
              </View>
            </View>

            {/* Description Section */}
            <View 
              className="rounded-md border p-6 shadow-sm"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <Text 
                className="text-lg font-bold mb-3"
                style={{ color: colors.foreground }}
              >
                Description
              </Text>
              <Text 
                className="leading-6 text-base"
                style={{ color: colors.mutedForeground }}
              >
                {alert.description}
              </Text>
            </View>

            {/* Details Grid */}
            <View className="flex flex-row gap-4">
              <View 
                className="flex-1 rounded-md border p-5 shadow-sm"
                style={{ 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <View className="flex flex-row items-center gap-2 mb-2">
                  <Ionicons name="people-outline" size={20} color={colors.primary} />
                  <Text 
                    className="text-sm font-bold"
                    style={{ color: colors.foreground }}
                  >
                    Affected
                  </Text>
                </View>
                <Text 
                  className="text-base font-semibold"
                  style={{ color: colors.mutedForeground }}
                >
                  {alert.affectedCount ? `${alert.affectedCount} people` : 'TBD'}
                </Text>
              </View>

              <View 
                className="flex-1 rounded-md border p-5 shadow-sm"
                style={{ 
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
              >
                <View className="flex flex-row items-center gap-2 mb-2">
                  <Ionicons name="alert-circle-outline" size={20} color={colors.primary} />
                  <Text 
                    className="text-sm font-bold"
                    style={{ color: colors.foreground }}
                  >
                    Type
                  </Text>
                </View>
                <Text 
                  className="text-base font-semibold capitalize"
                  style={{ color: getRiskColor(alert.riskLevel) }}
                >
                  {alert.type}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View 
              className="rounded-md border p-6 shadow-sm"
              style={{ 
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <Text 
                className="text-lg font-bold mb-4"
                style={{ color: colors.foreground }}
              >
                Quick Actions
              </Text>
              
              <View className="flex flex-col gap-3">
                <TouchableOpacity 
                  className="py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:opacity-80 shadow-sm"
                  style={{ backgroundColor: colors.primary }}
                  onPress={handleReport}
                >
                  <Ionicons name="document-text-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Submit Report</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:opacity-80 shadow-sm"
                  style={{ backgroundColor: colors.error }}
                  onPress={handleEmergencyCall}
                >
                  <Ionicons name="call-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Emergency Call</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:opacity-80 border-2"
                  style={{ borderColor: colors.border }}
                  onPress={handleShare}
                >
                  <Ionicons name="share-outline" size={22} color={colors.foreground} />
                  <Text 
                    className="font-bold text-base"
                    style={{ color: colors.foreground }}
                  >
                    Share Alert
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

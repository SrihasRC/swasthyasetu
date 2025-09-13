import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Alert as RNAlert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Alert, AlertDetailsModalProps } from '../types/alert';

export default function AlertDetailsModal({
  visible,
  alert,
  onClose,
  onReport,
  onEmergencyCall,
  onShare
}: AlertDetailsModalProps) {
  const getRiskColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-orange-500';
      case 'LOW': return 'bg-yellow-500';
      case 'RESOLVED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskTextColor = (level: Alert['riskLevel']) => {
    switch (level) {
      case 'HIGH': return 'text-red-600';
      case 'MEDIUM': return 'text-orange-600';
      case 'LOW': return 'text-yellow-600';
      case 'RESOLVED': return 'text-green-600';
      default: return 'text-gray-600';
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
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-blue-600 px-6 py-4 flex-row items-center justify-between shadow-sm">
          <Text className="text-white text-xl font-bold">Alert Details</Text>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full bg-blue-700 active:bg-blue-800"
          >
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* Main Content */}
          <View className="px-6 py-6 flex flex-col gap-6">
            
            {/* Risk Level & Time Section */}
            <View className="flex flex-row items-center justify-between">
              <View className={`px-4 py-2 rounded-md ${getRiskColor(alert.riskLevel)} shadow-sm`}>
                <Text className="text-white font-bold text-sm">
                  {alert.riskLevel} RISK
                </Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="text-gray-500 text-sm font-medium">
                  {alert.timeAgo}
                </Text>
              </View>
            </View>

            {/* Title Section */}
            <View className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
              <Text className="text-2xl font-bold text-gray-900 leading-8">
                {alert.title}
              </Text>
              
              <View className="flex flex-row items-center gap-2 mt-4">
                <Ionicons name="location-outline" size={20} color="#6B7280" />
                <Text className="text-gray-600 text-base font-medium">{alert.location}</Text>
              </View>
            </View>

            {/* Description Section */}
            <View className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-3">Description</Text>
              <Text className="text-gray-700 leading-6 text-base">{alert.description}</Text>
            </View>

            {/* Details Grid */}
            <View className="flex flex-row gap-4">
              <View className="flex-1 bg-white rounded-md border border-gray-200 p-5 shadow-sm">
                <View className="flex flex-row items-center gap-2 mb-2">
                  <Ionicons name="people-outline" size={20} color="#4F46E5" />
                  <Text className="text-sm font-bold text-gray-900">Affected</Text>
                </View>
                <Text className="text-gray-700 text-base font-semibold">
                  {alert.affectedCount ? `${alert.affectedCount} people` : 'TBD'}
                </Text>
              </View>

              <View className="flex-1 bg-white rounded-md border border-gray-200 p-5 shadow-sm">
                <View className="flex flex-row items-center gap-2 mb-2">
                  <Ionicons name="alert-circle-outline" size={20} color="#4F46E5" />
                  <Text className="text-sm font-bold text-gray-900">Type</Text>
                </View>
                <Text className={`text-base font-semibold capitalize ${getRiskTextColor(alert.riskLevel)}`}>
                  {alert.type}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="bg-white rounded-md border border-gray-200 p-6 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
              
              <View className="flex flex-col gap-3">
                <TouchableOpacity 
                  className="bg-blue-600 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-blue-700 shadow-sm"
                  onPress={handleReport}
                >
                  <Ionicons name="document-text-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Submit Report</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-red-600 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-red-700 shadow-sm"
                  onPress={handleEmergencyCall}
                >
                  <Ionicons name="call-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Emergency Call</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="border-2 border-gray-200 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-gray-50"
                  onPress={handleShare}
                >
                  <Ionicons name="share-outline" size={22} color="#374151" />
                  <Text className="text-gray-700 font-bold text-base">Share Alert</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

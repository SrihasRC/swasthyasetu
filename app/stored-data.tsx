import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useAppTheme } from '../components/ThemeProvider';
import { readSavedData } from '../utils/storage';
import Header from '../components/Header';
import { router } from 'expo-router';

export default function StoredDataPage() {
  const { colors } = useAppTheme();
  const [symptomsData, setSymptomsData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const symptoms = await readSavedData('symptoms');
    const water = await readSavedData('water');
    setSymptomsData(symptoms);
    setWaterData(water);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header
        title="Stored Data"
        showBack={true}
        onBackPress={() => router.back()}
      />
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-xl font-bold mb-4" style={{ color: colors.foreground }}>
          Symptoms Reports ({symptomsData.length})
        </Text>
        
        {symptomsData.map((report, index) => (
          <View 
            key={report.id || index}
            className="mb-4 p-4 rounded-lg border"
            style={{ borderColor: colors.border, backgroundColor: colors.card }}
          >
            <Text style={{ color: colors.foreground }}>
              Village: {report.village}
            </Text>
            <Text style={{ color: colors.foreground }}>
              Household ID: {report.householdId}
            </Text>
            <Text style={{ color: colors.foreground }}>
              Patient Count: {report.patientCount}
            </Text>
            <Text style={{ color: colors.foreground }}>
              Severity: {report.severity}
            </Text>
            <Text style={{ color: colors.mutedForeground }}>
              Saved: {formatDate(report.savedAt)}
            </Text>
          </View>
        ))}

        <Text className="text-xl font-bold mb-4 mt-6" style={{ color: colors.foreground }}>
          Water Quality Reports ({waterData.length})
        </Text>
        
        {waterData.map((report, index) => (
          <View 
            key={report.id || index}
            className="mb-4 p-4 rounded-lg border"
            style={{ borderColor: colors.border, backgroundColor: colors.card }}
          >
            <Text style={{ color: colors.foreground }}>
              Location: {report.location}
            </Text>
            <Text style={{ color: colors.foreground }}>
              Source: {report.sourceType}
            </Text>
            <Text style={{ color: colors.foreground }}>
              pH: {report.pH}
            </Text>
            <Text style={{ color: colors.mutedForeground }}>
              Saved: {formatDate(report.savedAt)}
            </Text>
          </View>
        ))}

        {symptomsData.length === 0 && waterData.length === 0 && (
          <Text 
            className="text-center mt-8"
            style={{ color: colors.mutedForeground }}
          >
            No stored data found. Submit some reports to see them here.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
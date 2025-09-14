import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert as RNAlert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ProgressBar from '../../../components/ProgressBar';
import { useAppTheme } from '../../../components/ThemeProvider';

interface FormData {
  village: string;
  householdId: string;
  patientCount: string;
  symptoms: string[];
  onsetDate: string;
  severity: 'mild' | 'moderate' | 'severe' | '';
  notes: string;
}

export default function SymptomsPage() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    village: '',
    householdId: '',
    patientCount: '',
    symptoms: [],
    onsetDate: '',
    severity: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const symptomOptions = [
    { id: 'diarrhea', label: t('symptoms.diarrhea'), icon: 'medical-outline' },
    { id: 'vomiting', label: t('symptoms.vomiting'), icon: 'medical-outline' },
    { id: 'fever', label: t('symptoms.fever'), icon: 'thermometer-outline' },
    { id: 'stomach_pain', label: t('symptoms.bodyAche'), icon: 'medical-outline' },
    { id: 'dehydration', label: t('symptoms.fatigue'), icon: 'water-outline' },
    { id: 'nausea', label: t('symptoms.nausea'), icon: 'medical-outline' }
  ];

  const villages = [
    'Majuli Island',
    'Jorhat',
    'Dibrugarh',
    'Sivasagar',
    'Golaghat',
    'Other'
  ];

  const toggleSymptom = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
    if (errors.symptoms) {
      setErrors(prev => ({ ...prev, symptoms: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.village) newErrors.village = 'Village selection is required';
    if (!formData.householdId) newErrors.householdId = 'Household ID is required';
    if (!formData.patientCount) newErrors.patientCount = 'Patient count is required';
    else if (isNaN(Number(formData.patientCount)) || Number(formData.patientCount) < 1) {
      newErrors.patientCount = 'Please enter a valid number';
    }
    if (formData.symptoms.length === 0) newErrors.symptoms = 'Please select at least one symptom';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.onsetDate) newErrors.onsetDate = 'Onset date is required';
    if (!formData.severity) newErrors.severity = 'Severity level is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Show success message
      RNAlert.alert(
        'Report Submitted Successfully',
        'Your symptom report has been sent to health authorities. You will be contacted if further action is needed.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setCurrentStep(1);
              setFormData({
                village: '',
                householdId: '',
                patientCount: '',
                symptoms: [],
                onsetDate: '',
                severity: 'mild',
                notes: ''
              });
              // Navigate back to home
              router.back();
            }
          }
        ]
      );
    }, 2000);
  };

  const renderStep1 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text 
        className="text-xl font-bold mb-6"
        style={{ color: colors.foreground }}
      >
        Basic Information
      </Text>
      
      {/* Village Selection */}
      <Text 
        className="font-medium mb-2"
        style={{ color: colors.foreground }}
      >
        Village <Text style={{ color: colors.error }}>*</Text>
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {villages.map((village) => (
          <TouchableOpacity
            key={village}
            activeOpacity={0.8}
            onPress={() => {
              setFormData(prev => ({ ...prev, village }));
              if (errors.village) setErrors(prev => ({ ...prev, village: '' }));
            }}
            className="p-4 rounded-xl border-2"
            style={{
              borderColor: formData.village === village ? colors.primary : colors.border,
              backgroundColor: formData.village === village ? colors.primary + '10' : colors.card,
            }}
          >
            <Text 
              className="font-medium"
              style={{
                color: formData.village === village ? colors.primary : colors.foreground
              }}
            >
              {village}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.village && (
        <Text className="text-red-500 text-sm mb-4 ml-1">{errors.village}</Text>
      )}

      <Input
        label="Household ID"
        placeholder="Enter household identifier"
        value={formData.householdId}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, householdId: text }));
          if (errors.householdId) setErrors(prev => ({ ...prev, householdId: '' }));
        }}
        error={errors.householdId}
        required={true}
        icon="home-outline"
      />

      <Input
        label="Number of Patients"
        placeholder="How many people are affected?"
        value={formData.patientCount}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, patientCount: text }));
          if (errors.patientCount) setErrors(prev => ({ ...prev, patientCount: '' }));
        }}
        error={errors.patientCount}
        required={true}
        type="number"
        icon="people-outline"
      />

      {/* Symptoms Selection */}
      <Text 
        className="font-medium mb-2"
        style={{ color: colors.foreground }}
      >
        Symptoms (select all that apply) <Text style={{ color: colors.error }}>*</Text>
      </Text>
      <View className="flex flex-col gap-3 mb-8">
        {symptomOptions.map((symptom) => (
          <TouchableOpacity
            key={symptom.id}
            activeOpacity={0.8}
            onPress={() => toggleSymptom(symptom.id)}
            className="flex-row items-center p-4 rounded-xl border-2"
            style={{
              borderColor: formData.symptoms.includes(symptom.id) ? colors.error : colors.border,
              backgroundColor: formData.symptoms.includes(symptom.id) ? colors.error + '10' : colors.card,
            }}
          >
            <View 
              className="w-6 h-6 rounded border-2 mr-3 items-center justify-center"
              style={{
                borderColor: formData.symptoms.includes(symptom.id) ? colors.error : colors.border,
                backgroundColor: formData.symptoms.includes(symptom.id) ? colors.error : 'transparent',
              }}
            >
              {formData.symptoms.includes(symptom.id) && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text 
              className="ml-3 font-medium"
              style={{
                color: formData.symptoms.includes(symptom.id) ? colors.error : colors.foreground
              }}
            >
              {symptom.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.symptoms && (
        <Text 
          className="text-sm mb-4 ml-1"
          style={{ color: colors.error }}
        >
          {errors.symptoms}
        </Text>
      )}
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text 
        className="text-xl font-bold mb-6"
        style={{ color: colors.foreground }}
      >
        Additional Details
      </Text>
      
      <Input
        label="When did symptoms start?"
        placeholder="e.g., Today, Yesterday, 2 days ago"
        value={formData.onsetDate}
        onChangeText={(text) => {
          setFormData(prev => ({ ...prev, onsetDate: text }));
          if (errors.onsetDate) setErrors(prev => ({ ...prev, onsetDate: '' }));
        }}
        error={errors.onsetDate}
        required={true}
        icon="calendar-outline"
      />

      {/* Severity Selection */}
      <Text 
        className="font-medium mb-2"
        style={{ color: colors.foreground }}
      >
        Severity Level <Text style={{ color: colors.error }}>*</Text>
      </Text>
      <View className="flex flex-col gap-3 mb-4">
        {[
          { value: 'mild', label: 'Mild', color: colors.success, description: 'Manageable symptoms' },
          { value: 'moderate', label: 'Moderate', color: colors.warning, description: 'Concerning symptoms' },
          { value: 'severe', label: 'Severe', color: colors.error, description: 'Urgent medical attention needed' }
        ].map((severity) => (
          <TouchableOpacity
            key={severity.value}
            activeOpacity={0.8}
            onPress={() => {
              setFormData(prev => ({ ...prev, severity: severity.value as any }));
              if (errors.severity) setErrors(prev => ({ ...prev, severity: '' }));
            }}
            className="p-4 rounded-xl border-2"
            style={{
              borderColor: formData.severity === severity.value ? severity.color : colors.border,
              backgroundColor: formData.severity === severity.value ? severity.color + '10' : colors.card,
            }}
          >
            <View className="flex-row items-center">
              <View 
                className="w-6 h-6 rounded-full border-2 mr-3 items-center justify-center"
                style={{
                  borderColor: formData.severity === severity.value ? severity.color : colors.border,
                  backgroundColor: formData.severity === severity.value ? severity.color + '10' : colors.card,
                }}
              >
                {formData.severity === severity.value && (
                  <View 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: severity.color }}
                  />
                )}
              </View>
              <View className="flex-1">
                <Text 
                  className="font-semibold"
                  style={{
                    color: formData.severity === severity.value ? severity.color : colors.foreground
                  }}
                >
                  {severity.label}
                </Text>
                <Text 
                  className="text-sm"
                  style={{
                    color: formData.severity === severity.value ? severity.color : colors.mutedForeground
                  }}
                >
                  {severity.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {errors.severity && (
        <Text 
          className="text-sm mb-4 ml-1"
          style={{ color: colors.error }}
        >
          {errors.severity}
        </Text>
      )}

      <Input
        label="Additional Notes (Optional)"
        placeholder="Any other symptoms or details..."
        value={formData.notes}
        onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
        multiline={true}
        numberOfLines={3}
        icon="document-text-outline"
      />
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text 
        className="text-xl font-bold mb-6"
        style={{ color: colors.foreground }}
      >
        Review & Submit
      </Text>
      
      <Card variant="elevated" title="Report Summary">
        <View className="flex flex-col gap-3">
          <View className="flex-row justify-between">
            <Text style={{ color: colors.mutedForeground }}>Village:</Text>
            <Text 
              className="font-medium"
              style={{ color: colors.foreground }}
            >
              {formData.village}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.mutedForeground }}>Household ID:</Text>
            <Text 
              className="font-medium"
              style={{ color: colors.foreground }}
            >
              {formData.householdId}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{ color: colors.mutedForeground }}>Patients:</Text>
            <Text 
              className="font-medium"
              style={{ color: colors.foreground }}
            >
              {formData.patientCount}
            </Text>
          </View>
          <View>
            <Text 
              className="mb-1"
              style={{ color: colors.mutedForeground }}
            >
              Symptoms:
            </Text>
            <View className="flex-row flex-wrap gap-1">
              {formData.symptoms.map((symptomId) => {
                const symptom = symptomOptions.find(s => s.id === symptomId);
                return (
                  <View 
                    key={symptomId} 
                    className="px-2 py-1 rounded"
                    style={{ backgroundColor: colors.error + '20' }}
                  >
                    <Text 
                      className="text-sm"
                      style={{ color: colors.error }}
                    >
                      {symptom?.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>Onset:</Text>
            <Text style={{color: colors.foreground}} className="font-medium">{formData.onsetDate}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>Severity:</Text>
            <Text className={`font-medium capitalize ${
              formData.severity === 'severe' ? 'text-red-600' :
              formData.severity === 'moderate' ? 'text-orange-600' : 'text-green-600'
            }`}>
              {formData.severity}
            </Text>
          </View>
          {formData.notes && (
            <View>
              <Text style={{color: colors.mutedForeground}} className="mb-1">Notes:</Text>
              <Text style={{color: colors.foreground}}>{formData.notes}</Text>
            </View>
          )}
        </View>
      </Card>

      <View className="h-6" />

      <Alert
        type="warning"
        title="Important"
        message="This report will be sent to health authorities for immediate action. Please ensure all information is accurate."
      />
    </ScrollView>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header 
        title="Report Case" 
        showBack={true}
        onBackPress={() => router.back()}
        subtitle={`Step ${currentStep} of 3`}
      />
      
      <View 
        className="px-4 py-3 border-b"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border
        }}
      >
        <ProgressBar 
          progress={(currentStep / 3) * 100} 
          total={3} 
          current={currentStep} 
          color="blue" 
        />
      </View>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <View 
        className="p-4 border-t"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border
        }}
      >
        <View className="flex-row gap-3">
          {currentStep > 1 && (
            <View className="flex-1">
              <Button
                title="Back"
                onPress={() => setCurrentStep(currentStep - 1)}
                variant="secondary"
              />
            </View>
          )}
          <View className="flex-1">
            {currentStep < 3 ? (
              <Button
                title="Next"
                onPress={handleNext}
                variant="primary"
              />
            ) : (
              <Button
                title="Submit Report"
                onPress={handleSubmit}
                variant="primary"
                loading={loading}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
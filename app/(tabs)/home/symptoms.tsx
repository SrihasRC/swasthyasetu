import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert as RNAlert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ProgressBar from '../../../components/ProgressBar';

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
    { id: 'diarrhea', label: 'Diarrhea', icon: 'medical-outline' },
    { id: 'vomiting', label: 'Vomiting', icon: 'medical-outline' },
    { id: 'fever', label: 'Fever', icon: 'thermometer-outline' },
    { id: 'stomach_pain', label: 'Stomach Pain', icon: 'medical-outline' },
    { id: 'dehydration', label: 'Dehydration', icon: 'water-outline' },
    { id: 'nausea', label: 'Nausea', icon: 'medical-outline' }
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
      <Text className="text-xl font-bold text-gray-900 mb-6">Basic Information</Text>
      
      {/* Village Selection */}
      <Text className="text-gray-700 font-medium mb-2">
        Village <Text className="text-red-500">*</Text>
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
            className={`p-4 rounded-xl border-2 ${
              formData.village === village 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <Text className={`font-medium ${
              formData.village === village ? 'text-blue-700' : 'text-gray-900'
            }`}>
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
      <Text className="text-gray-700 font-medium mb-2">
        Symptoms (select all that apply) <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex flex-col gap-3 mb-4">
        {symptomOptions.map((symptom) => (
          <TouchableOpacity
            key={symptom.id}
            activeOpacity={0.8}
            onPress={() => toggleSymptom(symptom.id)}
            className={`flex-row items-center p-4 rounded-xl border-2 ${
              formData.symptoms.includes(symptom.id)
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
              formData.symptoms.includes(symptom.id)
                ? 'border-red-500 bg-red-500'
                : 'border-gray-300'
            }`}>
              {formData.symptoms.includes(symptom.id) && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Ionicons 
              name={symptom.icon as any} 
              size={24} 
              color={formData.symptoms.includes(symptom.id) ? "#DC2626" : "#6B7280"} 
            />
            <Text className={`ml-3 font-medium ${
              formData.symptoms.includes(symptom.id) ? 'text-red-700' : 'text-gray-900'
            }`}>
              {symptom.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.symptoms && (
        <Text className="text-red-500 text-sm mb-4 ml-1">{errors.symptoms}</Text>
      )}
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-gray-900 mb-6">Additional Details</Text>
      
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
      <Text className="text-gray-700 font-medium mb-2">
        Severity Level <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex flex-col gap-3 mb-4">
        {[
          { value: 'mild', label: 'Mild', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700', description: 'Manageable symptoms' },
          { value: 'moderate', label: 'Moderate', color: 'orange', bgColor: 'bg-orange-50', borderColor: 'border-orange-500', textColor: 'text-orange-700', description: 'Concerning symptoms' },
          { value: 'severe', label: 'Severe', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700', description: 'Urgent medical attention needed' }
        ].map((severity) => (
          <TouchableOpacity
            key={severity.value}
            activeOpacity={0.8}
            onPress={() => {
              setFormData(prev => ({ ...prev, severity: severity.value as any }));
              if (errors.severity) setErrors(prev => ({ ...prev, severity: '' }));
            }}
            className={`p-4 rounded-xl border-2 ${
              formData.severity === severity.value
                ? `${severity.borderColor} ${severity.bgColor}`
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className="flex-row items-center">
              <View className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                formData.severity === severity.value
                  ? `${severity.borderColor} ${severity.bgColor}`
                  : 'border-gray-300 bg-white'
              }`}>
                {formData.severity === severity.value && (
                  <View className={`w-3 h-3 rounded-full ${
                    severity.color === 'green' ? 'bg-green-500' :
                    severity.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                )}
              </View>
              <View className="flex-1">
                <Text className={`font-semibold ${
                  formData.severity === severity.value 
                    ? severity.textColor
                    : 'text-gray-900'
                }`}>
                  {severity.label}
                </Text>
                <Text className={`text-sm ${
                  formData.severity === severity.value 
                    ? severity.textColor.replace('700', '600')
                    : 'text-gray-600'
                }`}>
                  {severity.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {errors.severity && (
        <Text className="text-red-500 text-sm mb-4 ml-1">{errors.severity}</Text>
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
      <Text className="text-xl font-bold text-gray-900 mb-6">Review & Submit</Text>
      
      <Card variant="elevated" title="Report Summary">
        <View className="flex flex-col gap-3">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Village:</Text>
            <Text className="font-medium text-gray-900">{formData.village}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Household ID:</Text>
            <Text className="font-medium text-gray-900">{formData.householdId}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Patients:</Text>
            <Text className="font-medium text-gray-900">{formData.patientCount}</Text>
          </View>
          <View>
            <Text className="text-gray-600 mb-1">Symptoms:</Text>
            <View className="flex-row flex-wrap gap-1">
              {formData.symptoms.map((symptomId) => {
                const symptom = symptomOptions.find(s => s.id === symptomId);
                return (
                  <View key={symptomId} className="bg-red-100 px-2 py-1 rounded">
                    <Text className="text-red-700 text-sm">{symptom?.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Onset:</Text>
            <Text className="font-medium text-gray-900">{formData.onsetDate}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Severity:</Text>
            <Text className={`font-medium capitalize ${
              formData.severity === 'severe' ? 'text-red-600' :
              formData.severity === 'moderate' ? 'text-orange-600' : 'text-green-600'
            }`}>
              {formData.severity}
            </Text>
          </View>
          {formData.notes && (
            <View>
              <Text className="text-gray-600 mb-1">Notes:</Text>
              <Text className="text-gray-900">{formData.notes}</Text>
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
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Report Case" 
        showBack={true}
        onBackPress={() => router.back()}
        subtitle={`Step ${currentStep} of 3`}
      />
      
      <View className="px-4 py-3 bg-white border-b border-gray-100">
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
      <View className="p-4 bg-white border-t border-gray-100">
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
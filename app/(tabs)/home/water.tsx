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

interface WaterFormData {
  location: string;
  sourceType: string;
  coordinates: string;
  collectorName: string;
  collectionDate: string;
  pH: string;
  turbidity: string;
  chlorine: string;
  bacteria: string;
  heavyMetals: string;
  smell: string;
  color: string;
  taste: string;
  notes: string;
}

export default function WaterQualityPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WaterFormData>({
    location: '',
    sourceType: '',
    coordinates: '',
    collectorName: '',
    collectionDate: '',
    pH: '',
    turbidity: '',
    chlorine: '',
    bacteria: '',
    heavyMetals: '',
    smell: '',
    color: '',
    taste: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const waterSources = [
    { id: 'borewell', label: 'Borewell' },
    { id: 'handpump', label: 'Hand Pump' },
    { id: 'well', label: 'Open Well' },
    { id: 'river', label: 'River/Stream' },
    { id: 'pond', label: 'Pond/Tank' },
    { id: 'pipeline', label: 'Pipeline Supply' }
  ];

  const qualityOptions = {
    smell: [
      { id: 'none', label: 'No Smell' },
      { id: 'chlorine', label: 'Chlorine' },
      { id: 'sewage', label: 'Sewage' },
      { id: 'chemical', label: 'Chemical' },
      { id: 'other', label: 'Other' }
    ],
    color: [
      { id: 'clear', label: 'Clear' },
      { id: 'yellowish', label: 'Yellowish' },
      { id: 'brownish', label: 'Brownish' },
      { id: 'reddish', label: 'Reddish' },
      { id: 'cloudy', label: 'Cloudy' }
    ],
    taste: [
      { id: 'normal', label: 'Normal' },
      { id: 'salty', label: 'Salty' },
      { id: 'bitter', label: 'Bitter' },
      { id: 'metallic', label: 'Metallic' },
      { id: 'sweet', label: 'Sweet' }
    ]
  };

  const isStep1Valid = () => {
    return formData.location && formData.sourceType && formData.collectorName && formData.collectionDate;
  };

  const isStep2Valid = () => {
    return formData.pH && formData.turbidity && formData.chlorine && formData.bacteria;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Show success message
      RNAlert.alert(
        'Water Quality Report Submitted',
        'Your water quality report has been submitted successfully. Results will be shared with health authorities for necessary action.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setCurrentStep(1);
              setFormData({
                location: '',
                sourceType: '',
                coordinates: '',
                collectorName: '',
                collectionDate: '',
                pH: '',
                turbidity: '',
                chlorine: '',
                bacteria: '',
                heavyMetals: '',
                smell: '',
                color: '',
                taste: '',
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
      <Text className="text-xl font-bold text-gray-900 mb-6">Water Source Information</Text>
      
      {/* Location Input */}
      <Input
        label="Collection Location *"
        value={formData.location}
        onChangeText={(text) => setFormData({...formData, location: text})}
        placeholder="Enter location (e.g., Village name, area)"
        required
      />

      {/* Water Source Type */}
      <Text className="text-gray-700 font-medium mb-2">
        Water Source Type *
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {waterSources.map((source) => (
          <TouchableOpacity
            key={source.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, sourceType: source.id})}
            className={`p-3 rounded-xl border-2 flex-row items-center justify-between ${
              formData.sourceType === source.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <Text className={`font-medium ${
              formData.sourceType === source.id ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {source.label}
            </Text>
            {formData.sourceType === source.id && (
              <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* GPS Coordinates */}
      <Input
        label="GPS Coordinates (Optional)"
        value={formData.coordinates}
        onChangeText={(text) => setFormData({...formData, coordinates: text})}
        placeholder="Latitude, Longitude"
      />

      {/* Collector Name */}
      <Input
        label="Collector Name *"
        value={formData.collectorName}
        onChangeText={(text) => setFormData({...formData, collectorName: text})}
        placeholder="Enter your full name"
        required
      />

      {/* Collection Date */}
      <Input
        label="Collection Date *"
        value={formData.collectionDate}
        onChangeText={(text) => setFormData({...formData, collectionDate: text})}
        placeholder="DD/MM/YYYY"
        required
      />

      <View className="flex-row gap-3 mb-12">
        <Button
          title="Cancel"
          onPress={() => router.back()}
          variant="secondary"
        />
        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          disabled={!isStep1Valid()}
        />
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-gray-900 mb-6">Water Quality Parameters</Text>
      
      {/* pH Level */}
      <Input
        label="pH Level (6.5-8.5 is safe) *"
        value={formData.pH}
        onChangeText={(text) => setFormData({...formData, pH: text})}
        placeholder="Enter pH value"
        type="number"
        required
      />

      {/* Turbidity */}
      <Input
        label="Turbidity (NTU) *"
        value={formData.turbidity}
        onChangeText={(text) => setFormData({...formData, turbidity: text})}
        placeholder="Enter turbidity value"
        type="number"
        required
      />

      {/* Chlorine */}
      <Input
        label="Free Chlorine (mg/L) *"
        value={formData.chlorine}
        onChangeText={(text) => setFormData({...formData, chlorine: text})}
        placeholder="Enter chlorine level"
        type="number"
        required
      />

      {/* Bacteria Count */}
      <Input
        label="E.coli/Coliform (CFU/100ml) *"
        value={formData.bacteria}
        onChangeText={(text) => setFormData({...formData, bacteria: text})}
        placeholder="Enter bacteria count"
        type="number"
        required
      />

      {/* Heavy Metals */}
      <Input
        label="Heavy Metals (mg/L) (Optional)"
        value={formData.heavyMetals}
        onChangeText={(text) => setFormData({...formData, heavyMetals: text})}
        placeholder="Lead, Mercury, Arsenic levels"
      />

      {/* Smell */}
      <Text className="text-gray-700 font-medium mb-2">
        Smell/Odor
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {qualityOptions.smell.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, smell: option.id})}
            className={`p-3 rounded-xl border-2 flex-row items-center justify-between ${
              formData.smell === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <Text className={`font-medium ${
              formData.smell === option.id ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {option.label}
            </Text>
            {formData.smell === option.id && (
              <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Color */}
      <Text className="text-gray-700 font-medium mb-2">
        Water Color/Appearance
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {qualityOptions.color.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, color: option.id})}
            className={`p-3 rounded-xl border-2 flex-row items-center justify-between ${
              formData.color === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <Text className={`font-medium ${
              formData.color === option.id ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {option.label}
            </Text>
            {formData.color === option.id && (
              <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Taste */}
      <Text className="text-gray-700 font-medium mb-2">
        Taste
      </Text>
      <View className="flex flex-col gap-2 mb-6">
        {qualityOptions.taste.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, taste: option.id})}
            className={`p-3 rounded-xl border-2 flex-row items-center justify-between ${
              formData.taste === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <Text className={`font-medium ${
              formData.taste === option.id ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {option.label}
            </Text>
            {formData.taste === option.id && (
              <View className="bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row gap-3 mb-12">
        <Button
          title="Previous"
          onPress={handlePrevious}
          variant="secondary"
        />
        <Button
          title="Next"
          onPress={handleNext}
          variant="primary"
          disabled={!isStep2Valid()}
        />
      </View>
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-gray-900 mb-6">Review & Submit</Text>
      
      <Card variant="elevated" title="Water Quality Report Summary">
        <View className="flex flex-col gap-3">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Location:</Text>
            <Text className="font-medium text-gray-900">{formData.location}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Source Type:</Text>
            <Text className="font-medium text-gray-900 capitalize">
              {waterSources.find(s => s.id === formData.sourceType)?.label}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Collector:</Text>
            <Text className="font-medium text-gray-900">{formData.collectorName}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Collection Date:</Text>
            <Text className="font-medium text-gray-900">{formData.collectionDate}</Text>
          </View>
          
          <View className="border-t border-gray-200 pt-3 mt-3">
            <Text className="text-gray-700 font-medium mb-2">Test Results:</Text>
            <View className="flex flex-col gap-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">pH Level:</Text>
                <Text className={`font-medium ${
                  parseFloat(formData.pH) >= 6.5 && parseFloat(formData.pH) <= 8.5
                    ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.pH}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Turbidity:</Text>
                <Text className="font-medium text-gray-900">{formData.turbidity} NTU</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Free Chlorine:</Text>
                <Text className="font-medium text-gray-900">{formData.chlorine} mg/L</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Bacteria Count:</Text>
                <Text className={`font-medium ${
                  parseFloat(formData.bacteria) === 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.bacteria} CFU/100ml
                </Text>
              </View>
              {formData.smell && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Smell:</Text>
                  <Text className="font-medium text-gray-900 capitalize">
                    {qualityOptions.smell.find(s => s.id === formData.smell)?.label}
                  </Text>
                </View>
              )}
              {formData.color && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Color:</Text>
                  <Text className="font-medium text-gray-900 capitalize">
                    {qualityOptions.color.find(c => c.id === formData.color)?.label}
                  </Text>
                </View>
              )}
              {formData.taste && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Taste:</Text>
                  <Text className="font-medium text-gray-900 capitalize">
                    {qualityOptions.taste.find(t => t.id === formData.taste)?.label}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Card>

      <View className="h-6" />

      {/* Additional Notes */}
      <Input
        label="Additional Notes (Optional)"
        value={formData.notes}
        onChangeText={(text) => setFormData({...formData, notes: text})}
        placeholder="Any additional observations about water quality"
        multiline
        numberOfLines={3}
      />

      <Alert
        type="info"
        title="Report Submission"
        message="This water quality report will be shared with environmental and health authorities for analysis and necessary action."
      />

      <View className="h-6" />

      <View className="flex-row gap-3 mb-12">
        <Button
          title="Previous"
          onPress={handlePrevious}
          variant="secondary"
        />
        <Button
          title={loading ? "Submitting..." : "Submit Report"}
          onPress={handleSubmit}
          variant="primary"
          disabled={loading}
        />
      </View>
    </ScrollView>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Water Quality Report"
        showBack
        onBackPress={() => router.back()}
      />
      
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <ProgressBar 
          progress={(currentStep / 3) * 100}
          current={currentStep}
          total={3}
          color="blue"
        />
        <Text className="text-sm text-gray-600 mt-2 text-center">
          Step {currentStep} of 3
        </Text>
      </View>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </View>
  );
}
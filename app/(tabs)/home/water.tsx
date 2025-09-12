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
  const [gettingLocation, setGettingLocation] = useState(false);
  const [readingSensor, setReadingSensor] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.sourceType) newErrors.sourceType = 'Water source type is required';
    if (!formData.collectionDate) newErrors.collectionDate = 'Collection date is required';
    if (!formData.collectorName) newErrors.collectorName = 'Collector name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pH) newErrors.pH = 'pH level is required';
    else if (isNaN(Number(formData.pH)) || Number(formData.pH) < 0 || Number(formData.pH) > 14) {
      newErrors.pH = 'Please enter a valid pH value (0-14)';
    }
    
    if (!formData.turbidity) newErrors.turbidity = 'Turbidity value is required';
    else if (isNaN(Number(formData.turbidity)) || Number(formData.turbidity) < 0) {
      newErrors.turbidity = 'Please enter a valid turbidity value';
    }
    
    if (!formData.chlorine) newErrors.chlorine = 'Chlorine level is required';
    else if (isNaN(Number(formData.chlorine)) || Number(formData.chlorine) < 0) {
      newErrors.chlorine = 'Please enter a valid chlorine level';
    }
    
    if (!formData.bacteria) newErrors.bacteria = 'Bacteria count is required';
    else if (isNaN(Number(formData.bacteria)) || Number(formData.bacteria) < 0) {
      newErrors.bacteria = 'Please enter a valid bacteria count';
    }
    
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

  const getCurrentLocation = () => {
    setGettingLocation(true);
    // Simulate getting current location
    setTimeout(() => {
      const mockLocation = "Current Village, District";
      const mockCoordinates = "12.9716, 77.5946"; // Bangalore coordinates as example
      
      setFormData({
        ...formData,
        location: mockLocation,
        coordinates: mockCoordinates
      });
      setGettingLocation(false);
      
      RNAlert.alert(
        'Location Detected',
        `Location: ${mockLocation}\nCoordinates: ${mockCoordinates}`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const readFromSensor = (parameter: string) => {
    setReadingSensor(parameter);
    
    // Simulate sensor reading
    setTimeout(() => {
      const mockValues: { [key: string]: string } = {
        pH: '7.2',
        turbidity: '3.5',
        chlorine: '0.8',
        bacteria: '0'
      };
      
      const value = mockValues[parameter] || '';
      setFormData({
        ...formData,
        [parameter]: value
      });
      setReadingSensor(null);
      
      RNAlert.alert(
        'Sensor Reading Complete',
        `${parameter.toUpperCase()}: ${value}`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const selectDate = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    RNAlert.alert(
      'Select Date',
      'Choose collection date:',
      [
        {
          text: 'Today',
          onPress: () => setFormData({...formData, collectionDate: formattedDate})
        },
        {
          text: 'Yesterday', 
          onPress: () => {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayFormatted = `${yesterday.getDate().toString().padStart(2, '0')}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getFullYear()}`;
            setFormData({...formData, collectionDate: yesterdayFormatted});
          }
        },
        {
          text: 'Custom',
          onPress: () => {
            RNAlert.prompt(
              'Enter Date',
              'Please enter date in DD/MM/YYYY format:',
              (text) => setFormData({...formData, collectionDate: text || ''})
            );
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
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
      <View className="flex-row gap-3 items-end mb-4">
        <View className="flex-1">
          <Input
            label="Collection Location"
            value={formData.location}
            onChangeText={(text) => {
              setFormData({...formData, location: text});
              if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
            }}
            placeholder="Enter location (e.g., Village name, area)"
            required
            error={errors.location}
          />
        </View>
        <TouchableOpacity
          onPress={getCurrentLocation}
          disabled={gettingLocation}
          className={`bg-blue-600 p-3 rounded-lg items-center justify-center mb-4 ${
            gettingLocation ? 'opacity-50' : ''
          }`}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={gettingLocation ? "location" : "location-outline"} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>

      {/* Water Source Type */}
      <Text className="text-gray-700 font-medium mb-2">
        Water Source Type
        <Text className="text-red-500 ml-1">*</Text>
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {waterSources.map((source) => (
          <TouchableOpacity
            key={source.id}
            activeOpacity={0.8}
            onPress={() => {
              setFormData({...formData, sourceType: source.id});
              if (errors.sourceType) setErrors(prev => ({ ...prev, sourceType: '' }));
            }}
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
      {errors.sourceType && (
        <Text className="text-red-500 text-sm mb-4 ml-1">{errors.sourceType}</Text>
      )}

      {/* GPS Coordinates */}
      <Input
        label="GPS Coordinates (Optional)"
        value={formData.coordinates}
        onChangeText={(text) => setFormData({...formData, coordinates: text})}
        placeholder="Latitude, Longitude"
      />

      {/* Collector Name */}
      <Input
        label="Collector Name"
        value={formData.collectorName}
        onChangeText={(text) => {
          setFormData({...formData, collectorName: text});
          if (errors.collectorName) setErrors(prev => ({ ...prev, collectorName: '' }));
        }}
        placeholder="Enter your full name"
        required
        error={errors.collectorName}
      />

      {/* Collection Date */}
      <View className="flex-row gap-3 items-end mb-4">
        <View className="flex-1">
          <Input
            label="Collection Date"
            value={formData.collectionDate}
            onChangeText={(text) => {
              setFormData({...formData, collectionDate: text});
              if (errors.collectionDate) setErrors(prev => ({ ...prev, collectionDate: '' }));
            }}
            placeholder="DD/MM/YYYY"
            required
            error={errors.collectionDate}
          />
        </View>
        <TouchableOpacity
          onPress={selectDate}
          className="bg-blue-600 p-3 rounded-lg items-center justify-center mb-4"
          activeOpacity={0.8}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderStep2 = () => (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <Text className="text-xl font-bold text-gray-900 mb-6">Water Quality Parameters</Text>
      
      {/* pH Level */}
      <View className="mb-4">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              label="pH Level (6.5-8.5 is safe)"
              value={formData.pH}
              onChangeText={(text) => {
                setFormData({...formData, pH: text});
                if (errors.pH) setErrors(prev => ({ ...prev, pH: '' }));
              }}
              placeholder="Enter pH value"
              type="number"
              required
              error={errors.pH}
            />
          </View>
          <View className="pt-8">
            <TouchableOpacity
              onPress={() => readFromSensor('pH')}
              disabled={readingSensor === 'pH'}
              className={`bg-green-600 p-3 rounded-lg items-center justify-center ${
                readingSensor === 'pH' ? 'opacity-50' : ''
              }`}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={readingSensor === 'pH' ? "wifi" : "hardware-chip-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Turbidity */}
      <View className="mb-4">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              label="Turbidity (< 5 NTU is safe)"
              value={formData.turbidity}
              onChangeText={(text) => {
                setFormData({...formData, turbidity: text});
                if (errors.turbidity) setErrors(prev => ({ ...prev, turbidity: '' }));
              }}
              placeholder="Enter turbidity value"
              type="number"
              helper="Safe range: Less than 5 NTU"
              required
              error={errors.turbidity}
            />
          </View>
          <View className="pt-8">
            <TouchableOpacity
              onPress={() => readFromSensor('turbidity')}
              disabled={readingSensor === 'turbidity'}
              className={`bg-green-600 p-3 rounded-lg items-center justify-center ${
                readingSensor === 'turbidity' ? 'opacity-50' : ''
              }`}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={readingSensor === 'turbidity' ? "wifi" : "hardware-chip-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Chlorine */}
      <View className="mb-4">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              label="Free Chlorine (0.2-1.0 mg/L is safe)"
              value={formData.chlorine}
              onChangeText={(text) => {
                setFormData({...formData, chlorine: text});
                if (errors.chlorine) setErrors(prev => ({ ...prev, chlorine: '' }));
              }}
              placeholder="Enter chlorine level"
              type="number"
              helper="Safe range: 0.2-1.0 mg/L"
              required
              error={errors.chlorine}
            />
          </View>
          <View className="pt-8">
            <TouchableOpacity
              onPress={() => readFromSensor('chlorine')}
              disabled={readingSensor === 'chlorine'}
              className={`bg-green-600 p-3 rounded-lg items-center justify-center ${
                readingSensor === 'chlorine' ? 'opacity-50' : ''
              }`}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={readingSensor === 'chlorine' ? "wifi" : "hardware-chip-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bacteria Count */}
      <View className="mb-4">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              label="E.coli/Coliform (0 CFU/100ml is safe)"
              value={formData.bacteria}
              onChangeText={(text) => {
                setFormData({...formData, bacteria: text});
                if (errors.bacteria) setErrors(prev => ({ ...prev, bacteria: '' }));
              }}
              placeholder="Enter bacteria count"
              type="number"
              helper="Safe level: 0 CFU/100ml (no bacteria)"
              required
              error={errors.bacteria}
            />
          </View>
          <View className="pt-8">
            <TouchableOpacity
              onPress={() => readFromSensor('bacteria')}
              disabled={readingSensor === 'bacteria'}
              className={`bg-green-600 p-3 rounded-lg items-center justify-center ${
                readingSensor === 'bacteria' ? 'opacity-50' : ''
              }`}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={readingSensor === 'bacteria' ? "wifi" : "hardware-chip-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
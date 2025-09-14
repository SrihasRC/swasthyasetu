import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert as RNAlert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ProgressBar from '../../../components/ProgressBar';
import { useAppTheme } from '../../../components/ThemeProvider';

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
  const { colors } = useAppTheme();
  const { t } = useTranslation();
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
      <Text style={{color: colors.foreground}} className="text-xl font-bold mb-6">{t('water.sourceInformation')}</Text>
      
      {/* Location Input */}
      <View className="flex-row gap-3 items-end mb-4">
        <View className="flex-1">
          <Input
            label={t('water.collectionLocation')}
            value={formData.location}
            onChangeText={(text) => {
              setFormData({...formData, location: text});
              if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
            }}
            placeholder={t('water.locationPlaceholder')}
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
      <Text style={{color: colors.mutedForeground}} className="font-medium mb-2">
        {t('water.sourceType')}
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
            style={{
              backgroundColor: formData.sourceType === source.id ? colors.muted : colors.background,
              borderColor: formData.sourceType === source.id ? colors.primary : colors.border,
            }}
            className="p-3 rounded-xl border-2 flex-row items-center justify-between"
          >
            <Text style={{
              color: formData.sourceType === source.id ? colors.primary : colors.mutedForeground
            }} className="font-medium">
              {source.label}
            </Text>
            {formData.sourceType === source.id && (
              <View style={{backgroundColor: colors.primary}} className="rounded-full w-5 h-5 items-center justify-center">
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
        label={t('water.gpsCoordinates')}
        value={formData.coordinates}
        onChangeText={(text) => setFormData({...formData, coordinates: text})}
        placeholder={t('water.coordinatesPlaceholder')}
      />

      {/* Collector Name */}
      <Input
        label={t('water.collectorName')}
        value={formData.collectorName}
        onChangeText={(text) => {
          setFormData({...formData, collectorName: text});
          if (errors.collectorName) setErrors(prev => ({ ...prev, collectorName: '' }));
        }}
        placeholder={t('water.collectorPlaceholder')}
        required
        error={errors.collectorName}
      />

      {/* Collection Date */}
      <View className="flex-row gap-3 items-end mb-4">
        <View className="flex-1">
          <Input
            label={t('water.collectionDate')}
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
      <Text style={{color: colors.foreground}} className="text-xl font-bold mb-6">{t('water.parameters')}</Text>
      
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
      <Text style={{color: colors.mutedForeground}} className="font-medium mb-2">
        {t('water.smell')}
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {qualityOptions.smell.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, smell: option.id})}
            style={{
              backgroundColor: formData.smell === option.id ? colors.muted : colors.background,
              borderColor: formData.smell === option.id ? colors.primary : colors.border,
            }}
            className="p-3 rounded-xl border-2 flex-row items-center justify-between"
          >
            <Text style={{
              color: formData.smell === option.id ? colors.primary : colors.mutedForeground
            }} className="font-medium">
              {option.label}
            </Text>
            {formData.smell === option.id && (
              <View style={{backgroundColor: colors.primary}} className="rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Color */}
      <Text style={{color: colors.mutedForeground}} className="font-medium mb-2">
        {t('water.color')}
      </Text>
      <View className="flex flex-col gap-2 mb-4">
        {qualityOptions.color.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, color: option.id})}
            style={{
              backgroundColor: formData.color === option.id ? colors.muted : colors.background,
              borderColor: formData.color === option.id ? colors.primary : colors.border,
            }}
            className="p-3 rounded-xl border-2 flex-row items-center justify-between"
          >
            <Text style={{
              color: formData.color === option.id ? colors.primary : colors.mutedForeground
            }} className="font-medium">
              {option.label}
            </Text>
            {formData.color === option.id && (
              <View style={{backgroundColor: colors.primary}} className="rounded-full w-5 h-5 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Taste */}
      <Text style={{color: colors.mutedForeground}} className="font-medium mb-2">
        {t('water.taste')}
      </Text>
      <View className="flex flex-col gap-2 mb-6">
        {qualityOptions.taste.map((option) => (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.8}
            onPress={() => setFormData({...formData, taste: option.id})}
            style={{
              backgroundColor: formData.taste === option.id ? colors.muted : colors.background,
              borderColor: formData.taste === option.id ? colors.primary : colors.border,
            }}
            className="p-3 rounded-xl border-2 flex-row items-center justify-between"
          >
            <Text style={{
              color: formData.taste === option.id ? colors.primary : colors.mutedForeground
            }} className="font-medium">
              {option.label}
            </Text>
            {formData.taste === option.id && (
              <View style={{backgroundColor: colors.primary}} className="rounded-full w-5 h-5 items-center justify-center">
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
      <Text style={{color: colors.foreground}} className="text-xl font-bold mb-6">{t('water.reviewSubmit')}</Text>
      
      <Card variant="elevated" title={t('water.reportSummary')}>
        <View className="flex flex-col gap-3">
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>{t('water.location')}:</Text>
            <Text style={{color: colors.foreground}} className="font-medium">{formData.location}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>{t('water.sourceType')}:</Text>
            <Text style={{color: colors.foreground}} className="font-medium capitalize">
              {waterSources.find(s => s.id === formData.sourceType)?.label}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>{t('water.collector')}:</Text>
            <Text style={{color: colors.foreground}} className="font-medium">{formData.collectorName}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text style={{color: colors.mutedForeground}}>{t('water.collectionDate')}:</Text>
            <Text style={{color: colors.foreground}} className="font-medium">{formData.collectionDate}</Text>
          </View>
          
          <View style={{borderTopColor: colors.border}} className="border-t pt-3 mt-3">
            <Text style={{color: colors.foreground}} className="font-medium mb-2">{t('water.testResults')}:</Text>
            <View className="flex flex-col gap-2">
              <View className="flex-row justify-between">
                <Text style={{color: colors.mutedForeground}}>{t('water.phLevel')}:</Text>
                <Text className={`font-medium ${
                  parseFloat(formData.pH) >= 6.5 && parseFloat(formData.pH) <= 8.5
                    ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.pH}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{color: colors.mutedForeground}}>{t('water.turbidity')}:</Text>
                <Text style={{color: colors.foreground}} className="font-medium">{formData.turbidity} NTU</Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{color: colors.mutedForeground}}>{t('water.chlorine')}:</Text>
                <Text style={{color: colors.foreground}} className="font-medium">{formData.chlorine} mg/L</Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={{color: colors.mutedForeground}}>{t('water.bacteria')}:</Text>
                <Text className={`font-medium ${
                  parseFloat(formData.bacteria) === 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.bacteria} CFU/100ml
                </Text>
              </View>
              {formData.smell && (
                <View className="flex-row justify-between">
                  <Text style={{color: colors.mutedForeground}}>{t('water.smell')}:</Text>
                  <Text style={{color: colors.foreground}} className="font-medium capitalize">
                    {qualityOptions.smell.find(s => s.id === formData.smell)?.label}
                  </Text>
                </View>
              )}
              {formData.color && (
                <View className="flex-row justify-between">
                  <Text style={{color: colors.mutedForeground}}>{t('water.color')}:</Text>
                  <Text style={{color: colors.foreground}} className="font-medium capitalize">
                    {qualityOptions.color.find(c => c.id === formData.color)?.label}
                  </Text>
                </View>
              )}
              {formData.taste && (
                <View className="flex-row justify-between">
                  <Text style={{color: colors.mutedForeground}}>{t('water.taste')}:</Text>
                  <Text style={{color: colors.foreground}} className="font-medium capitalize">
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
        label={t('water.additionalNotes')}
        value={formData.notes}
        onChangeText={(text) => setFormData({...formData, notes: text})}
        placeholder={t('water.notesPlaceholder')}
        multiline
        numberOfLines={3}
      />

      <Alert
        type="info"
        title={t('water.reportSubmissionTitle')}
        message={t('water.reportSubmissionMessage')}
      />

      <View className="h-6" />
    </ScrollView>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header
        title={t('water.title')}
        showBack
        onBackPress={() => router.back()}
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
          current={currentStep}
          total={3}
          color="blue"
        />
        <Text 
          className="text-sm mt-2 text-center"
          style={{ color: colors.mutedForeground }}
        >
          {t('water.stepProgress', { current: currentStep, total: 3 })}
        </Text>
      </View>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <View style={{backgroundColor: colors.background, borderTopColor: colors.border}} className="p-4 border-t">
        <View className="flex-row gap-3">
          {currentStep > 1 && (
            <View className="flex-1">
              <Button
                title={t('common.back')}
                onPress={() => setCurrentStep(currentStep - 1)}
                variant="secondary"
              />
            </View>
          )}
          <View className="flex-1">
            {currentStep < 3 ? (
              <Button
                title={t('common.next')}
                onPress={handleNext}
                variant="primary"
              />
            ) : (
              <Button
                title={t('water.submitReport')}
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
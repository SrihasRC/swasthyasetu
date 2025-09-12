import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import Input from '../components/Input';
import OfflineIndicator from '../components/OfflineIndicator';
import ProgressBar from '../components/ProgressBar';

export default function ComponentsTest() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestInput = (text: string) => {
    setInputValue(text);
    if (text.length > 0) {
      setInputError('');
    }
  };

  const handleButtonPress = () => {
    if (inputValue.length === 0) {
      setInputError('This field is required');
    } else {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Component Showcase" 
        showBack={true}
        onBackPress={() => router.back()}
        subtitle="Test all components"
      />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        
        {/* Offline Indicator Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Offline Indicator</Text>
        <View className="flex flex-col gap-3 mb-6">
          <OfflineIndicator isOffline={true} pendingCount={3} />
          <OfflineIndicator isOffline={false} pendingCount={2} />
          <View className="flex-row gap-2">
            <OfflineIndicator isOffline={true} pendingCount={5} compact={true} />
            <OfflineIndicator isOffline={false} pendingCount={1} compact={true} />
          </View>
        </View>

        {/* Progress Bar Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Progress Bars</Text>
        <View className="flex flex-col gap-4 mb-6">
          <ProgressBar progress={33} total={3} current={1} color="blue" />
          <ProgressBar progress={66} total={3} current={2} color="green" />
          <ProgressBar progress={100} color="green" showLabels={true} />
          <ProgressBar progress={75} color="orange" size="large" />
        </View>

        {/* Alert Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Alerts</Text>
        <View className="flex flex-col gap-3 mb-6">
          <Alert 
            type="success" 
            title="Success!" 
            message="Report submitted successfully to health authorities."
          />
          <Alert 
            type="warning" 
            title="Warning" 
            message="Water quality parameters are outside normal range."
          />
          <Alert 
            type="error" 
            title="Error" 
            message="Failed to sync data. Please check your connection."
          />
          <Alert 
            type="info" 
            message="Your location has been auto-detected for this report."
          />
        </View>

        {/* Input Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Input Fields</Text>
        <View className="mb-6">
          <Input
            label="Village Name"
            placeholder="Enter village name"
            value={inputValue}
            onChangeText={handleTestInput}
            error={inputError}
            required={true}
            icon="location-outline"
          />
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            type="phone"
            icon="call-outline"
            helper="We'll use this for emergency contact"
          />
          <Input
            label="Email Address"
            placeholder="Enter email (optional)"
            type="email"
            icon="mail-outline"
          />
          <Input
            label="Patient Count"
            placeholder="Number of affected patients"
            type="number"
            icon="people-outline"
          />
        </View>

        {/* Button Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Buttons</Text>
        <View className="flex flex-col gap-3 mb-6">
          <Button 
            title="Submit Report" 
            onPress={handleButtonPress}
            variant="primary"
            loading={loading}
          />
          <Button 
            title="Save as Draft" 
            onPress={() => {}}
            variant="secondary"
          />
          <Button 
            title="Delete Report" 
            onPress={() => {}}
            variant="danger"
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button 
                title="Small" 
                onPress={() => {}}
                size="small"
              />
            </View>
            <View className="flex-1">
              <Button 
                title="Medium" 
                onPress={() => {}}
                size="medium"
              />
            </View>
            <View className="flex-1">
              <Button 
                title="Large" 
                onPress={() => {}}
                size="large"
              />
            </View>
          </View>
          <Button 
            title="Disabled Button" 
            onPress={() => {}}
            disabled={true}
          />
        </View>

        {/* Card Section */}
        <Text className="text-lg font-bold text-gray-900 mb-3">Cards</Text>
        <View className="flex flex-col gap-4 mb-6">
          <Card 
            variant="elevated"
            title="Elevated Card"
            subtitle="With shadow and title"
          >
            <Text className="text-gray-700">
              This card has elevation and shows shadow. Perfect for important content.
            </Text>
          </Card>

          <Card 
            variant="flat"
            title="Flat Card"
            subtitle="No shadow, flat design"
          >
            <Text className="text-gray-700">
              This is a flat card without shadow. Good for list items.
            </Text>
          </Card>

          <Card 
            variant="interactive"
            title="Interactive Card"
            onPress={() => alert('Card pressed!')}
          >
            <Text className="text-gray-700">
              Tap this card! It has press feedback and scaling animation.
            </Text>
          </Card>

          <Card variant="elevated" padding="large">
            <Text className="text-gray-900 font-semibold mb-2">Large Padding</Text>
            <Text className="text-gray-700">
              This card uses large padding for more spacious content.
            </Text>
          </Card>

          <Card variant="flat" padding="small">
            <Text className="text-gray-900 font-semibold mb-1">Small Padding</Text>
            <Text className="text-gray-700">Compact card with small padding.</Text>
          </Card>
        </View>

        {/* Test Section Complete */}
        <View className="bg-green-50 p-4 rounded-xl border border-green-200 mb-12">
          <Text className="text-green-800 font-semibold text-center">
            🎉 Component Showcase Complete!
          </Text>
          <Text className="text-green-700 text-center mt-1">
            All components are ready for your feedback
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

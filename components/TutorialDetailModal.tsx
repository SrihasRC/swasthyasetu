import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TutorialDetailModalProps, TutorialGuide } from '../types/tutorial';

export default function TutorialDetailModal({
  visible,
  guide,
  onClose,
  onBookmark,
  onShare,
  onDownload
}: TutorialDetailModalProps) {
  const getTypeIcon = (type: TutorialGuide['type']) => {
    switch (type) {
      case 'video': return 'play-circle-outline';
      case 'article': return 'document-text-outline';
      case 'checklist': return 'checkmark-circle-outline';
      default: return 'book-outline';
    }
  };

  const getTypeColor = (type: TutorialGuide['type']) => {
    switch (type) {
      case 'video': return '#DC2626';
      case 'article': return '#1E40AF';
      case 'checklist': return '#059669';
      default: return '#6B7280';
    }
  };

  const getDetailContent = (guide: TutorialGuide) => {
    switch (guide.title) {
      case 'Boil Water Properly':
        return {
          steps: [
            'Use a clean pot with a tight-fitting lid',
            'Fill with clear water from reliable source',
            'Bring water to a rolling boil',
            'Boil for at least 1 minute continuously',
            'Let cool naturally before drinking',
            'Store in clean, covered container'
          ],
          tips: [
            'Don\'t add more water while boiling',
            'At high altitudes, boil for 3 minutes',
            'Store boiled water in refrigerator',
            'Use within 24 hours for best safety'
          ],
          tags: ['Water Safety', 'Prevention', 'Emergency']
        };
      case 'Handwashing Steps':
        return {
          steps: [
            'Wet hands with clean running water',
            'Apply soap and lather well',
            'Scrub for at least 20 seconds',
            'Clean under nails and between fingers',
            'Rinse thoroughly with clean water',
            'Dry with clean towel or air dry'
          ],
          tips: [
            'Use alcohol-based sanitizer if soap unavailable',
            'Wash before eating and after using toilet',
            'Teach children the proper technique',
            'Wash hands frequently during illness'
          ],
          tags: ['Hygiene', 'Prevention', 'Daily Practice']
        };
      case 'ORS Preparation':
        return {
          steps: [
            'Boil 1 liter of clean water',
            'Let water cool to room temperature',
            'Add 6 teaspoons of sugar',
            'Add 1/2 teaspoon of salt',
            'Stir until completely dissolved',
            'Give small frequent sips'
          ],
          tips: [
            'Use within 24 hours of preparation',
            'Don\'t add more salt than recommended',
            'Continue normal feeding if possible',
            'Seek medical help if condition worsens'
          ],
          tags: ['First Aid', 'Dehydration', 'Emergency']
        };
      default:
        return {
          steps: ['Content loading...'],
          tips: ['Please check your connection'],
          tags: ['General']
        };
    }
  };

  if (!guide) return null;

  const content = getDetailContent(guide);

  const handleBookmark = () => {
    if (onBookmark) onBookmark(guide);
  };

  const handleShare = () => {
    if (onShare) onShare(guide);
  };

  const handleDownload = () => {
    if (onDownload) onDownload(guide);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white px-6 py-4 flex flex-row items-center justify-between shadow-sm border-b border-gray-100">
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
          >
            <Ionicons name="close" size={22} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity
              onPress={handleBookmark}
              className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
            >
              <Ionicons name="bookmark-outline" size={20} color="#374151" />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleShare}
              className="p-2 rounded-full bg-gray-100 active:bg-gray-200"
            >
              <Ionicons name="share-outline" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1">
          <View className="px-6 py-6 flex flex-col gap-6">
            
            {/* Title & Type Section */}
            <View className="bg-white rounded-xl p-6 shadow-sm">
              <View className="flex flex-row items-center gap-4 mb-4">
                <View 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: getTypeColor(guide.type) + '20' }}
                >
                  <Ionicons 
                    name={getTypeIcon(guide.type)} 
                    size={32} 
                    color={getTypeColor(guide.type)} 
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-gray-900 leading-8">
                    {guide.title}
                  </Text>
                  <View className="flex flex-row items-center gap-4 mt-2">
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text className="text-gray-600 font-medium">{guide.duration}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="folder-outline" size={16} color="#6B7280" />
                      <Text className="text-gray-600">{guide.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {guide.type === 'video' && (
                <TouchableOpacity className="bg-red-600 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-red-700">
                  <Ionicons name="play" size={24} color="white" />
                  <Text className="text-white font-bold text-lg">Play Video</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Steps Section */}
            <View className="bg-white rounded-xl p-6 shadow-sm">
              <Text className="text-xl font-bold text-gray-900 mb-4">
                {guide.type === 'checklist' ? 'Checklist' : 'Steps'}
              </Text>
              
              <View className="flex flex-col gap-3">
                {content.steps.map((step, index) => (
                  <View key={index} className="flex flex-row items-start gap-3">
                    <View className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <Text className="text-blue-600 font-bold text-sm">{index + 1}</Text>
                    </View>
                    <Text className="flex-1 text-gray-700 leading-6">{step}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Important Tips */}
            <View className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <View className="flex flex-row items-center gap-3 mb-4">
                <View className="bg-amber-100 p-2 rounded-lg">
                  <Ionicons name="bulb-outline" size={20} color="#D97706" />
                </View>
                <Text className="text-amber-900 font-bold text-lg">Important Tips</Text>
              </View>
              
              <View className="flex flex-col gap-3">
                {content.tips.map((tip, index) => (
                  <View key={index} className="flex flex-row items-start gap-3">
                    <View className="w-2 h-2 bg-amber-600 rounded-full mt-2" />
                    <Text className="flex-1 text-amber-800 leading-6">{tip}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Tags */}
            <View className="bg-white rounded-xl p-6 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-3">Related Topics</Text>
              <View className="flex flex-row flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <View key={index} className="bg-blue-100 px-3 py-2 rounded-full">
                    <Text className="text-blue-700 font-medium text-sm">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View className="bg-white rounded-xl p-6 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
              
              <View className="flex flex-col gap-3">
                <TouchableOpacity 
                  className="bg-green-600 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-green-700"
                  onPress={handleDownload}
                >
                  <Ionicons name="download-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Download for Offline</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="border-2 border-gray-200 py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:bg-gray-50"
                  onPress={handleShare}
                >
                  <Ionicons name="share-outline" size={22} color="#374151" />
                  <Text className="text-gray-700 font-bold text-base">Share with Team</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TutorialDetailModalProps, TutorialGuide } from '../types/tutorial';
import { useAppTheme } from './ThemeProvider';

export default function TutorialDetailModal({
  visible,
  guide,
  onClose,
  onBookmark,
  onShare,
  onDownload
}: TutorialDetailModalProps) {
  const { colors } = useAppTheme();
  
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
      case 'video': return colors.error;
      case 'article': return colors.primary;
      case 'checklist': return colors.success;
      default: return colors.mutedForeground;
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
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        {/* Header */}
        <View 
          className="px-6 py-4 flex flex-row items-center justify-between shadow-sm border-b"
          style={{ 
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            className="p-2 rounded-full active:opacity-80"
            style={{ backgroundColor: colors.muted }}
          >
            <Ionicons name="close" size={22} color={colors.foreground} />
          </TouchableOpacity>
          
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity
              onPress={handleBookmark}
              className="p-2 rounded-full active:opacity-80"
              style={{ backgroundColor: colors.muted }}
            >
              <Ionicons name="bookmark-outline" size={20} color={colors.foreground} />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleShare}
              className="p-2 rounded-full active:opacity-80"
              style={{ backgroundColor: colors.muted }}
            >
              <Ionicons name="share-outline" size={20} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1">
          <View className="px-6 py-6 flex flex-col gap-6">
            
            {/* Title & Type Section */}
            <View 
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: colors.card }}
            >
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
                  <Text 
                    className="text-2xl font-bold leading-8"
                    style={{ color: colors.foreground }}
                  >
                    {guide.title}
                  </Text>
                  <View className="flex flex-row items-center gap-4 mt-2">
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="time-outline" size={16} color={colors.mutedForeground} />
                      <Text 
                        className="font-medium"
                        style={{ color: colors.mutedForeground }}
                      >
                        {guide.duration}
                      </Text>
                    </View>
                    <View className="flex flex-row items-center gap-1">
                      <Ionicons name="folder-outline" size={16} color={colors.mutedForeground} />
                      <Text style={{ color: colors.mutedForeground }}>
                        {guide.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {guide.type === 'video' && (
                <TouchableOpacity 
                  className="py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:opacity-80"
                  style={{ backgroundColor: colors.error }}
                >
                  <Ionicons name="play" size={24} color="white" />
                  <Text className="text-white font-bold text-lg">Play Video</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Steps Section */}
            <View 
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: colors.card }}
            >
              <Text 
                className="text-lg font-bold mb-4"
                style={{ color: colors.foreground }}
              >
                {guide.type === 'checklist' ? 'Checklist' : 'Steps'}
              </Text>
              
              <View className="flex flex-col gap-3">
                {content.steps.map((step, index) => (
                  <View key={index} className="flex flex-row items-start gap-3">
                    <View 
                      className="w-6 h-6 rounded-full flex items-center justify-center mt-1"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <Text 
                        className="font-bold text-sm"
                        style={{ color: colors.primary }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                    <Text 
                      className="flex-1 leading-6"
                      style={{ color: colors.mutedForeground }}
                    >
                      {step}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Important Tips */}
            <View 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: colors.warning + '10',
                borderColor: colors.warning + '30',
              }}
            >
              <View className="flex flex-row items-center gap-3 mb-4">
                <View 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: colors.warning + '20' }}
                >
                  <Ionicons name="bulb-outline" size={20} color={colors.warning} />
                </View>
                <Text 
                  className="font-bold text-lg"
                  style={{ color: colors.warning }}
                >
                  Important Tips
                </Text>
              </View>
              
              <View className="flex flex-col gap-3">
                {content.tips.map((tip, index) => (
                  <View key={index} className="flex flex-row items-start gap-3">
                    <View 
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: colors.warning }}
                    />
                    <Text 
                      className="flex-1 leading-6"
                      style={{ color: colors.warning }}
                    >
                      {tip}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Tags */}
            <View 
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: colors.card }}
            >
              <Text 
                className="text-lg font-bold mb-3"
                style={{ color: colors.foreground }}
              >
                Related Topics
              </Text>
              <View className="flex flex-row flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <View 
                    key={index} 
                    className="px-3 py-2 rounded-full"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <Text 
                      className="font-medium text-sm"
                      style={{ color: colors.primary }}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View 
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: colors.card }}
            >
              <Text 
                className="text-lg font-bold mb-4"
                style={{ color: colors.foreground }}
              >
                Quick Actions
              </Text>
              
              <View className="flex flex-col gap-3">
                <TouchableOpacity 
                  className="py-4 px-6 rounded-xl flex flex-row items-center justify-center gap-3 active:opacity-80"
                  style={{ backgroundColor: colors.success }}
                  onPress={handleDownload}
                >
                  <Ionicons name="download-outline" size={22} color="white" />
                  <Text className="text-white font-bold text-base">Download for Offline</Text>
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
                    Share with Team
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

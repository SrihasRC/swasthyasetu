import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { useAppTheme } from '../../components/ThemeProvider';
import TutorialDetailModal from '../../components/TutorialDetailModal';
import { TutorialCategory, TutorialGuide } from '../../types/tutorial';

const categories: TutorialCategory[] = [
  {
    id: '1',
    title: 'Water Safety',
    icon: 'water-outline',
    description: 'Safe water practices',
    color: '#1E40AF',
    bgColor: '#EFF6FF',
    count: 12
  },
  {
    id: '2',
    title: 'Hygiene & Clean',
    icon: 'hand-left-outline',
    description: 'Personal hygiene',
    color: '#059669',
    bgColor: '#ECFDF5',
    count: 8
  },
  {
    id: '3',
    title: 'First Aid',
    icon: 'medical-outline',
    description: 'Emergency care',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    count: 15
  },
  {
    id: '4',
    title: 'Disease Info',
    icon: 'analytics-outline',
    description: 'Prevention & symptoms',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    count: 20
  }
];

const recentGuides: TutorialGuide[] = [
  {
    id: '1',
    title: 'Boil Water Properly',
    type: 'video',
    duration: '2 min',
    category: 'Water Safety',
    isNew: true,
    icon: 'play-outline'
  },
  {
    id: '2',
    title: 'Handwashing Steps',
    type: 'checklist',
    duration: 'Quick guide',
    category: 'Hygiene',
    isNew: false,
    icon: 'list-outline'
  },
  {
    id: '3',
    title: 'ORS Preparation',
    type: 'article',
    duration: '3 min read',
    category: 'First Aid',
    isNew: true,
    icon: 'document-text-outline'
  },
  {
    id: '4',
    title: 'Cholera Prevention',
    type: 'video',
    duration: '4 min',
    category: 'Disease Info',
    isNew: false,
    icon: 'play-outline'
  }
];

export default function TutorialsScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<TutorialGuide | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCategoryPress = (category: TutorialCategory) => {
    console.log('Category pressed:', category.title);
    // Navigate to category detail screen
  };

  const handleGuidePress = (guide: TutorialGuide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleBookmark = (guide: TutorialGuide) => {
    Alert.alert("Bookmarked", `${guide.title} has been added to your bookmarks.`);
  };

  const handleShare = (guide: TutorialGuide) => {
    Alert.alert("Shared", `${guide.title} has been shared with your team.`);
  };

  const handleDownload = (guide: TutorialGuide) => {
    Alert.alert("Downloaded", `${guide.title} is now available offline.`);
  };

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

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header 
        title={t('tutorials.title')} 
        subtitle={t('tutorials.subtitle')}
      />
      
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-5 py-5 flex flex-col gap-5">
          
          {/* Categories Section */}
          <View>
            <Text 
              className="text-xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              {t('tutorials.categories')}
            </Text>
            
            <View className="flex flex-row flex-wrap gap-4">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category)}
                  className="flex-1 min-w-[45%]"
                  activeOpacity={0.8}
                >
                  <View 
                    className="rounded-xl p-4 shadow-sm border h-36"
                    style={{ 
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    }}
                  >
                    <View className="flex flex-col items-center justify-center h-full gap-2">
                      <View 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <Ionicons 
                          name={category.icon} 
                          size={20} 
                          color="white" 
                        />
                      </View>
                      
                      <View className="flex flex-col items-center gap-1">
                        <Text 
                          className="font-bold text-center text-sm leading-tight"
                          style={{ color: colors.foreground }}
                          numberOfLines={2}
                        >
                          {category.title}
                        </Text>
                        <Text 
                          className="text-xs text-center leading-tight"
                          style={{ color: colors.mutedForeground }}
                          numberOfLines={2}
                        >
                          {category.description}
                        </Text>
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="book-outline" size={10} color={colors.mutedForeground} />
                          <Text 
                            className="text-xs font-medium"
                            style={{ color: colors.mutedForeground }}
                          >
                            {category.count} guides
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Guides Section */}
          <View>
            <View className="flex flex-row items-center justify-between mb-4">
              <Text 
                className="text-xl font-bold"
                style={{ color: colors.foreground }}
              >
                {t('tutorials.recent')}
              </Text>
              <TouchableOpacity className="flex flex-row items-center gap-1">
                <Text 
                  className="font-semibold text-sm"
                  style={{ color: colors.primary }}
                >
                  {t('common.viewAll')}
                </Text>
                <Ionicons name="chevron-forward-outline" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-3">
              {recentGuides.map((guide) => (
                <TouchableOpacity
                  key={guide.id}
                  onPress={() => handleGuidePress(guide)}
                  className="rounded-xl p-5 shadow-sm border"
                  style={{ 
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  }}
                  activeOpacity={0.8}
                >
                  <View className="flex flex-row items-center gap-4">
                    {/* Type Icon */}
                    <View 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.muted }}
                    >
                      <Ionicons 
                        name={getTypeIcon(guide.type)} 
                        size={22} 
                        color={getTypeColor(guide.type)} 
                      />
                    </View>

                    {/* Content */}
                    <View className="flex-1 flex flex-col gap-1">
                      <View className="flex flex-row items-center gap-2">
                        <Text 
                          className="text-lg font-bold flex-1"
                          style={{ color: colors.foreground }}
                        >
                          {guide.title}
                        </Text>
                        {guide.isNew && (
                          <View 
                            className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: colors.success + '20' }}
                          >
                            <Text 
                              className="text-xs font-bold"
                              style={{ color: colors.success }}
                            >
                              NEW
                            </Text>
                          </View>
                        )}
                      </View>
                      
                      <View className="flex flex-row items-center gap-4">
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={14} color={colors.mutedForeground} />
                          <Text 
                            className="text-sm font-medium"
                            style={{ color: colors.mutedForeground }}
                          >
                            {guide.duration}
                        </Text>
                        </View>
                        
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="folder-outline" size={14} color={colors.mutedForeground} />
                          <Text 
                            className="text-sm"
                            style={{ color: colors.mutedForeground }}
                          >
                            {guide.category}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Arrow */}
                    <Ionicons name="chevron-forward-outline" size={18} color={colors.mutedForeground} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View 
            className="rounded-xl p-4 border"
            style={{ 
              backgroundColor: colors.primary + '10',
              borderColor: colors.primary + '30',
            }}
          >
            <View className="flex flex-row items-center gap-3 mb-3">
              <View 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons name="bulb-outline" size={18} color={colors.primary} />
              </View>
              <Text 
                className="font-bold text-base"
                style={{ color: colors.primary }}
              >
                Quick Access
              </Text>
            </View>
            
            <View className="flex flex-col gap-2">
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="download-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  Download for Offline
                </Text>
                <Ionicons name="chevron-forward-outline" size={14} color={colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  My Bookmarks
                </Text>
                <View 
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: colors.primary + '30' }}
                >
                  <Text 
                    className="text-xs font-bold"
                    style={{ color: colors.primary }}
                  >
                    3
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="language-outline" size={18} color={colors.primary} />
                <Text 
                  className="font-medium flex-1 text-sm"
                  style={{ color: colors.primary }}
                >
                  Change Language
                </Text>
                <Text 
                  className="text-xs"
                  style={{ color: colors.primary }}
                >
                  English
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Tutorial Detail Modal */}
      <TutorialDetailModal
        visible={showModal}
        guide={selectedGuide}
        onClose={() => setShowModal(false)}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onDownload={handleDownload}
      />
    </View>
  );
}
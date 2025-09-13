import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
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
      case 'video': return '#DC2626';
      case 'article': return '#1E40AF';
      case 'checklist': return '#059669';
      default: return '#6B7280';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Health Education" 
        subtitle="Learn & Stay Healthy"
      />
      
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-6 py-6 flex flex-col gap-6">
          
          {/* Categories Section */}
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-4">Categories</Text>
            
            <View className="flex flex-row flex-wrap gap-4">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category)}
                  className="flex-1 min-w-[45%]"
                  activeOpacity={0.8}
                >
                  <View 
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <View className="flex flex-col items-center gap-3">
                      <View 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <Ionicons 
                          name={category.icon} 
                          size={24} 
                          color="white" 
                        />
                      </View>
                      
                      <View className="flex flex-col items-center gap-1">
                        <Text 
                          className="font-bold text-center text-base"
                          style={{ color: category.color }}
                        >
                          {category.title}
                        </Text>
                        <Text className="text-gray-600 text-sm text-center">
                          {category.description}
                        </Text>
                        <View className="flex flex-row items-center gap-1 mt-1">
                          <Ionicons name="book-outline" size={12} color="#6B7280" />
                          <Text className="text-gray-500 text-xs font-medium">
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
              <Text className="text-xl font-bold text-gray-900">Recent Guides</Text>
              <TouchableOpacity className="flex flex-row items-center gap-1">
                <Text className="text-blue-600 font-semibold text-sm">View All</Text>
                <Ionicons name="chevron-forward-outline" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-3">
              {recentGuides.map((guide) => (
                <TouchableOpacity
                  key={guide.id}
                  onPress={() => handleGuidePress(guide)}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  activeOpacity={0.8}
                >
                  <View className="flex flex-row items-center gap-4">
                    {/* Type Icon */}
                    <View className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Ionicons 
                        name={getTypeIcon(guide.type)} 
                        size={24} 
                        color={getTypeColor(guide.type)} 
                      />
                    </View>

                    {/* Content */}
                    <View className="flex-1 flex flex-col gap-1">
                      <View className="flex flex-row items-center gap-2">
                        <Text className="text-lg font-bold text-gray-900 flex-1">
                          {guide.title}
                        </Text>
                        {guide.isNew && (
                          <View className="bg-green-100 px-2 py-1 rounded-full">
                            <Text className="text-green-700 text-xs font-bold">NEW</Text>
                          </View>
                        )}
                      </View>
                      
                      <View className="flex flex-row items-center gap-4">
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={14} color="#6B7280" />
                          <Text className="text-gray-600 text-sm font-medium">
                            {guide.duration}
                          </Text>
                        </View>
                        
                        <View className="flex flex-row items-center gap-1">
                          <Ionicons name="folder-outline" size={14} color="#6B7280" />
                          <Text className="text-gray-600 text-sm">
                            {guide.category}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Arrow */}
                    <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <View className="flex flex-row items-center gap-3 mb-4">
              <View className="bg-blue-100 p-2 rounded-lg">
                <Ionicons name="bulb-outline" size={20} color="#1E40AF" />
              </View>
              <Text className="text-blue-900 font-bold text-lg">
                Quick Access
              </Text>
            </View>
            
            <View className="flex flex-col gap-3">
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="download-outline" size={20} color="#1E40AF" />
                <Text className="text-blue-800 font-semibold flex-1">
                  Download for Offline
                </Text>
                <Ionicons name="chevron-forward-outline" size={16} color="#1E40AF" />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="bookmark-outline" size={20} color="#1E40AF" />
                <Text className="text-blue-800 font-semibold flex-1">
                  My Bookmarks
                </Text>
                <View className="bg-blue-200 px-2 py-1 rounded-full">
                  <Text className="text-blue-800 text-xs font-bold">3</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex flex-row items-center gap-3 py-2">
                <Ionicons name="language-outline" size={20} color="#1E40AF" />
                <Text className="text-blue-800 font-semibold flex-1">
                  Change Language
                </Text>
                <Text className="text-blue-600 text-sm">English</Text>
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
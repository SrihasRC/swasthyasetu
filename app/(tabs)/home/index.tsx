import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Tile from "../../../components/Tile";

export default function HomePage() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <View className="bg-white px-4 pb-6 pt-12" style={{ elevation: 2 }}>
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-blue-700">
              SwasthyaSetu
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              स्वास्थ्यसेतु - Bridge to Health
            </Text>
          </View>
          <View className="flex-row space-x-3 gap-2">
            <TouchableOpacity className="p-2 rounded-full bg-green-100">
              <Ionicons name="wifi" size={20} color="#059669" />
            </TouchableOpacity>
            <Link href="/settings" asChild>
              <TouchableOpacity className="p-2 rounded-full bg-gray-100">
                <Ionicons name="settings-outline" size={20} color="#374151" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        
        {/* Greeting Section */}
        <View className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <Text className="text-lg font-semibold text-blue-900">
            Good Morning, [Name]
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center mr-4">
              <Ionicons name="cloud-offline-outline" size={16} color="#EA580C" />
              <Text className="text-sm text-orange-600 ml-1">
                3 pending reports
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#059669" />
              <Text className="text-sm text-green-600 ml-1">
                Majuli, Assam
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Quick Actions Header */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </Text>
        
        {/* Main Action Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="w-[48%] mb-4">
            <Link href="/home/symptoms" asChild>
              <Tile
                title="Report Case"
                description="Submit health reports"
                icon={<Ionicons name="medical-outline" size={32} color="#DC2626" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/home/water" asChild>
              <Tile
                title="Water Quality"
                description="Test & report water"
                icon={<Ionicons name="water-outline" size={32} color="#1E40AF" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/alerts" asChild>
              <Tile
                title="Alerts"
                description="Community warnings"
                icon={<Ionicons name="warning-outline" size={32} color="#EA580C" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/tutorials" asChild>
              <Tile
                title="Learn & Guide"
                description="Health education"
                icon={<Ionicons name="library-outline" size={32} color="#059669" />}
                onPress={() => {}}
              />
            </Link>
          </View>
        </View>

        {/* Today's Summary */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Today&apos;s Summary
        </Text>
        <View className="bg-white p-4 rounded-xl border border-gray-100 mb-6" style={{ elevation: 1 }}>
          <View className="flex-row justify-between items-center">
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-blue-600">5</Text>
              <Text className="text-sm text-gray-600">Reports</Text>
            </View>
            <View className="w-px h-8 bg-gray-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-orange-600">2</Text>
              <Text className="text-sm text-gray-600">Alerts</Text>
            </View>
            <View className="w-px h-8 bg-gray-200" />
            <View className="flex-1 items-center">
              <Text className="text-2xl font-bold text-green-600">8</Text>
              <Text className="text-sm text-gray-600">Resolved</Text>
            </View>
          </View>
        </View>

        {/* Emergency Quick Report */}
        <TouchableOpacity 
          className="bg-red-600 p-4 rounded-xl border border-red-700 mb-4"
          style={{ elevation: 2 }}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="alert-circle" size={24} color="#FFFFFF" />
            <Text className="text-white font-semibold text-lg ml-2">
              Quick Emergency Report
            </Text>
          </View>
          <Text className="text-red-100 text-sm text-center mt-1">
            Tap for urgent health alerts
          </Text>
        </TouchableOpacity>

        {/* Emergency Contact */}
        <Link href="/contacts" asChild className="mb-12">
          <TouchableOpacity className="bg-white p-4 rounded-xl border border-gray-200" style={{ elevation: 1 }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-red-100 p-2 rounded-full">
                  <Ionicons name="call" size={20} color="#DC2626" />
                </View>
                <View className="ml-3">
                  <Text className="font-semibold text-gray-900">Emergency: 108</Text>
                  <Text className="text-sm text-gray-600">24/7 Medical Help</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
}

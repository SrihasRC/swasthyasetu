import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Tile from "../../../components/Tile";

export default function HomePage() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Top Bar */}
      <View className="bg-white px-4 pb-4 pt-12 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              SwasthyaSetu
            </Text>
          </View>
          <Link href="/settings" asChild>
            <TouchableOpacity className="p-2 rounded-full bg-gray-100">
              <Ionicons name="settings-outline" size={24} color="#374151" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Dashboard Tiles */}
      <ScrollView className="flex-1 px-4 py-6">
        <View className="flex-row flex-wrap justify-between">
          {/* Report Case */}
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

          {/* Report Water */}
          <View className="w-[48%] mb-4">
            <Link href="/home/water" asChild>
              <Tile
                title="Report Water"
                description="Water quality testing"
                icon={<Ionicons name="water-outline" size={32} color="#2563EB" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          {/* Alerts */}
          <View className="w-[48%] mb-4">
            <Link href="/alerts" asChild>
              <Tile
                title="Alerts"
                description="Community warnings"
                icon={<Ionicons name="warning-outline" size={32} color="#D97706" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          {/* Tutorials */}
          <View className="w-[48%] mb-4">
            <Link href="/tutorials" asChild>
              <Tile
                title="Tutorials"
                description="Health guidance"
                icon={<Ionicons name="book-outline" size={32} color="#059669" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          {/* Contacts */}
          <View className="w-full mb-4">
            <Link href="/contacts" asChild>
              <Tile
                title="Emergency Contacts"
                description="Quick access to help"
                icon={<Ionicons name="call-outline" size={32} color="#7C3AED" />}
                onPress={() => {}}
              />
            </Link>
          </View>

          {/* Quick Scan */}
          <View className="w-full mb-4">
            <Link href="/home/quick-scan" asChild>
              <Tile
                title="Quick Health Scan"
                description="Symptom checker (Coming Soon)"
                icon={<Ionicons name="pulse-outline" size={32} color="#6B7280" />}
                onPress={() => {}}
              />
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

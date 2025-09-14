import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../components/ThemeProvider";
import Tile from "../../../components/Tile";

export default function HomePage() {
  const { colors } = useAppTheme();
  
  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Enhanced Header */}
      <View 
        className="px-4 pb-6 pt-12" 
        style={{ 
          backgroundColor: colors.background,
          elevation: 2,
          shadowColor: colors.foreground,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-1">
            <Text 
              className="text-2xl font-bold"
              style={{ color: colors.foreground }}
            >
              SwasthyaSetu
            </Text>
            <Text 
              className="text-sm mt-1"
              style={{ color: colors.mutedForeground }}
            >
              स्वास्थ्यसेतु - Bridge to Health
            </Text>
          </View>
          <View className="flex-row space-x-2 gap-2">
            <TouchableOpacity 
              className="p-2 rounded-full"
            >
              <Ionicons name="wifi" size={22} color={colors.success} />
            </TouchableOpacity>
            <Link href="/test-components" asChild>
              <TouchableOpacity 
                className="p-2 rounded-full"
              >
                <Ionicons name="construct-outline" size={22} color={colors.secondary} />
              </TouchableOpacity>
            </Link>
            <Link href="/settings" asChild>
              <TouchableOpacity 
                className="p-2 rounded-full"
              >
                <Ionicons name="settings-outline" size={22} color={colors.foreground} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        
        {/* Greeting Section */}
        <View 
          className="p-4 rounded-xl border"
          style={{ 
            backgroundColor: colors.primary + '10',
            borderColor: colors.primary + '30'
          }}
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: colors.primary }}
          >
            Good Morning, [Name]
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center mr-4">
              <Ionicons name="cloud-offline-outline" size={16} color={colors.warning} />
              <Text 
                className="text-sm ml-1"
                style={{ color: colors.warning }}
              >
                3 pending reports
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color={colors.success} />
              <Text 
                className="text-sm ml-1"
                style={{ color: colors.success }}
              >
                Majuli, Assam
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Quick Actions Header */}
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: colors.foreground }}
        >
          Quick Actions
        </Text>
        
        {/* Main Action Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="w-[48%] mb-4">
            <Link href="/home/symptoms" asChild>
              <Tile
                title="Report Case"
                description="Submit health reports"
                icon={<Ionicons name="medical-outline" size={32} color={colors.error} />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/home/water" asChild>
              <Tile
                title="Water Quality"
                description="Test & report water"
                icon={<Ionicons name="water-outline" size={32} color={colors.primary} />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/alerts" asChild>
              <Tile
                title="Alerts"
                description="Community warnings"
                icon={<Ionicons name="warning-outline" size={32} color={colors.warning} />}
                onPress={() => {}}
              />
            </Link>
          </View>

          <View className="w-[48%] mb-4">
            <Link href="/tutorials" asChild>
              <Tile
                title="Learn & Guide"
                description="Health education"
                icon={<Ionicons name="library-outline" size={32} color={colors.success} />}
                onPress={() => {}}
              />
            </Link>
          </View>
        </View>

        {/* Today's Summary */}
        <Text 
          className="text-lg font-semibold mb-4"
          style={{ color: colors.foreground }}
        >
          Today&apos;s Summary
        </Text>
        <View 
          className="p-4 rounded-xl border mb-6" 
          style={{ 
            backgroundColor: colors.card,
            borderColor: colors.border,
            elevation: 1 
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 items-center">
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.primary }}
              >
                5
              </Text>
              <Text 
                className="text-sm"
                style={{ color: colors.mutedForeground }}
              >
                Reports
              </Text>
            </View>
            <View 
              className="w-px h-8"
              style={{ backgroundColor: colors.border }}
            />
            <View className="flex-1 items-center">
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.warning }}
              >
                2
              </Text>
              <Text 
                className="text-sm"
                style={{ color: colors.mutedForeground }}
              >
                Alerts
              </Text>
            </View>
            <View 
              className="w-px h-8"
              style={{ backgroundColor: colors.border }}
            />
            <View className="flex-1 items-center">
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.success }}
              >
                8
              </Text>
              <Text 
                className="text-sm"
                style={{ color: colors.mutedForeground }}
              >
                Resolved
              </Text>
            </View>
          </View>
        </View>

        {/* Emergency Quick Report */}
        <TouchableOpacity 
          className="p-4 rounded-xl border mb-4"
          style={{ 
            backgroundColor: colors.error,
            borderColor: colors.error,
            elevation: 2 
          }}
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
          <TouchableOpacity 
            className="p-4 rounded-xl border" 
            style={{ 
              backgroundColor: colors.card,
              borderColor: colors.border,
              elevation: 1 
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View 
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.error + '20' }}
                >
                  <Ionicons name="call" size={20} color={colors.error} />
                </View>
                <View className="ml-3">
                  <Text 
                    className="font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    Emergency: 108
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.mutedForeground }}
                  >
                    24/7 Medical Help
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
            </View>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
}

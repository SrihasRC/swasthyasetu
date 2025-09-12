import { Ionicons } from "@expo/vector-icons";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function homePage() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-center text-blue-500">
        Dashboard <Ionicons name="stats-chart" size={24} color="#4F4FAF" />
      </Text>
      <View className="flex gap-1 mt-8">
        <Link
          href="/home/water"
          push
          asChild
          className="text-blue-500 underline"
        >
          <Button title="go to water" />
        </Link>
        <Link
          href="/home/symptoms"
          push
          asChild
          className="text-blue-500 underline"
        >
          <Button title="go to symptoms" />
        </Link>
        <Link
          href="/home/quick-scan"
          push
          asChild
          className="text-blue-500 underline"
        >
          <Button title="go to scan page" />
        </Link>
      </View>
    </View>
  );
}

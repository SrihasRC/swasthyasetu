import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { Text, View } from "react-native";

// Custom tab icon with badge for alerts
const AlertsTabIcon = ({ color, size }: { color: string; size: number }) => {
  // Mock unread count - in a real app, this would come from a global state/context
  const unreadCount = 2; // This matches our mock data (2 unread alerts)
  
  return (
    <View className="relative">
      <Ionicons name="alert-circle" size={size} color={color} />
      {unreadCount > 0 && (
        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
          <Text className="text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function TabsLayout() {
  const pathname = usePathname();
  
  // Hide tab bar on form screens
  const hideTabBar = pathname.includes('/water') || 
                     pathname.includes('/symptoms') || 
                     pathname.includes('/quick-scan');

  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: "black", 
        tabBarInactiveTintColor: "gray",
        tabBarStyle: hideTabBar ? { display: 'none' } : undefined,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          popToTopOnBlur: true,
          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: AlertsTabIcon,
        }}
      />
      <Tabs.Screen
        name="tutorials"
        options={{
          title: "Tutorials",
          tabBarIcon: ({color, size}) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({color, size}) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

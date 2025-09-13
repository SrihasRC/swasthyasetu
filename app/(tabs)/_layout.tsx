import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";

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
        tabBarStyle: hideTabBar ? { display: 'none' } : undefined
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          popToTopOnBlur: true,
          tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({color, size}) => <Ionicons name="alert-circle" size={size} color={color} />,
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

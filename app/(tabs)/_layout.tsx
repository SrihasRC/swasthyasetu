import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black", tabBarInactiveTintColor: "gray" }}>
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

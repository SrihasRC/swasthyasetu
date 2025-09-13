import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
        <Stack.Screen 
          name="water" 
          options={{ 
            title: "Water Quality Report", 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="symptoms" 
          options={{ 
            title: "Symptom Report", 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="quick-scan" 
          options={{ 
            title: "Quick Scan", 
            headerShown: false
          }} 
        />
    </Stack>
  )
}
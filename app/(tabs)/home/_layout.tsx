import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
        <Stack.Screen name="water" options={{ title: "Water Intake", headerShown: false }} />
        <Stack.Screen name="symptoms" options={{ title: "Symptoms", headerShown: false }} />
        <Stack.Screen name="quick-scan" options={{ title: "Quick Scan", headerShown: false }} />
    </Stack>
  )
}
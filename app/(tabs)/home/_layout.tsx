import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: "Dashboard" }} />
        <Stack.Screen name="water" options={{ title: "Water Intake" }} />
        <Stack.Screen name="symptoms" options={{ title: "Symptoms" }} />
        <Stack.Screen name="quick-scan" options={{ title: "Quick Scan" }} />
    </Stack>
  )
}
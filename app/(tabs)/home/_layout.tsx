import { Stack } from "expo-router";
import { useAppTheme } from "../../../components/ThemeProvider";

export default function HomeLayout() {
  const { colors } = useAppTheme();
  
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        animation: 'default',
        gestureEnabled: true,
        animationDuration: 150,
      }}
    >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Dashboard", 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }} 
        />
        <Stack.Screen 
          name="water" 
          options={{ 
            title: "Water Quality Report", 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }} 
        />
        <Stack.Screen 
          name="symptoms" 
          options={{ 
            title: "Symptom Report", 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }} 
        />
        <Stack.Screen 
          name="quick-scan" 
          options={{ 
            title: "Quick Scan", 
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }} 
        />
    </Stack>
  )
}
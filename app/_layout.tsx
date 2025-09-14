import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from '../components/ThemeProvider';
import './globals.css';

function RootContent() {
  const { colors, isDark } = useAppTheme();
  
  return (
    <>
      <StatusBar 
        style={isDark ? "light" : "dark"} 
        backgroundColor={colors.background}
        translucent={false}
      />
      <View 
        className="flex-1"
        style={{ backgroundColor: colors.background }}
      >
        <Slot 
          screenOptions={{
            contentStyle: { backgroundColor: colors.background }
          }}
        />
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

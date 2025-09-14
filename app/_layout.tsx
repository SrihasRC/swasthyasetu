import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ThemeProvider, useAppTheme } from '../components/ThemeProvider';
import './globals.css';

function RootContent() {
  const { colors, isDark } = useAppTheme();
  
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View 
        className="flex-1"
        style={{ backgroundColor: colors.background }}
      >
        <Slot />
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>
  );
}

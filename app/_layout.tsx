import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import './globals.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <View className="flex-1 bg-black">
        <Slot />
      </View>
    </>
  );
}

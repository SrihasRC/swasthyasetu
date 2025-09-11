import { StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import './globals.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView edges={['top']} className="flex-1 bg-black">
        <Slot />
      </SafeAreaView>
    </>
  );
}

import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '../../../components/ThemeProvider';

export default function QuickScanPage() {
  const { colors } = useAppTheme();
  
  return (
    <View 
      className='flex-1 justify-center items-center'
      style={{ backgroundColor: colors.background }}
    >
      <Text style={{ color: colors.foreground }}>Quick Scan Page</Text>
      <Text 
        className="text-sm mt-2"
        style={{ color: colors.mutedForeground }}
      >
        Coming soon...
      </Text>
    </View>
  )
}
import React, { createContext, ReactNode, useContext } from 'react';
import { Theme, useTheme } from '../hooks/useTheme';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: {
    // Government Brand Colors
    primary: string;
    secondary: string;
    tertiary: string;
    
    // Status Colors
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Risk Colors
    riskCritical: string;
    riskHigh: string;
    riskMedium: string;
    riskLow: string;
    
    // Background Colors
    background: string;
    card: string;
    muted: string;
    
    // Text Colors
    foreground: string;
    mutedForeground: string;
    
    // Border
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  primary: '#1e40af',
  secondary: '#059669',
  tertiary: '#0891b2',
  success: '#16a34a',
  warning: '#f59e0b',
  error: '#dc2626',
  info: '#3b82f6',
  riskCritical: '#dc2626',
  riskHigh: '#f59e0b',
  riskMedium: '#3b82f6',
  riskLow: '#16a34a',
  background: '#f8fafc',
  card: '#ffffff',
  muted: '#f1f5f9',
  foreground: '#0f172a',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
};

const darkColors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#06b6d4',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#60a5fa',
  riskCritical: '#ef4444',
  riskHigh: '#f59e0b',
  riskMedium: '#60a5fa',
  riskLow: '#22c55e',
  background: '#0f172a',
  card: '#1e293b',
  muted: '#334155',
  foreground: '#f1f5f9',
  mutedForeground: '#94a3b8',
  border: '#334155',
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeHook = useTheme();
  
  const colors = themeHook.isDark ? darkColors : lightColors;

  const value: ThemeContextType = {
    ...themeHook,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

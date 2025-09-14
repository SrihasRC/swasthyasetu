import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setIsDark(colorScheme === 'dark');
      }
    });

    // Initial setup
    if (theme === 'system') {
      setIsDark(Appearance.getColorScheme() === 'dark');
    } else {
      setIsDark(theme === 'dark');
    }

    return () => subscription?.remove();
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}

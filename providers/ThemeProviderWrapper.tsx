'use client';
import { useThemeMode } from '@lib/theme/useThemeMode';
import { CssBaseline, ThemeProvider } from '@mui/material';

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

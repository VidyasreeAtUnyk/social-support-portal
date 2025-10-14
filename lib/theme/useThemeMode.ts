'use client';
import themeBase from '@lib/theme/themeConfig';
import { createTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { darkPalette, lightPalette } from './palette';

export const useThemeMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        ...themeBase,
        palette: mode === 'light' ? lightPalette : darkPalette,
      }),
    [mode],
  );

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, mode, toggleTheme };
};

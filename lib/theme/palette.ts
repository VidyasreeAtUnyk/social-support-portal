import { colorTokens } from '@lib/designSystem/tokens';
import type { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: colorTokens.primary[500],
    light: colorTokens.primary[300],
    dark: colorTokens.primary[700],
    contrastText: '#fff',
  },
  secondary: {
    main: colorTokens.secondary[500],
    light: colorTokens.secondary[300],
    dark: colorTokens.secondary[700],
    contrastText: '#fff',
  },
  success: {
    main: colorTokens.success[500],
    light: colorTokens.success[300],
    dark: colorTokens.success[700],
    contrastText: '#fff',
  },
  warning: {
    main: colorTokens.warning[500],
    light: colorTokens.warning[300],
    dark: colorTokens.warning[700],
    contrastText: '#fff',
  },
  error: {
    main: colorTokens.error[500],
    light: colorTokens.error[300],
    dark: colorTokens.error[700],
    contrastText: '#fff',
  },
  info: {
    main: colorTokens.primary[500],
    light: colorTokens.primary[300],
    dark: colorTokens.primary[700],
    contrastText: '#fff',
  },
  background: {
    default: colorTokens.background.secondary,
    paper: colorTokens.background.primary,
  },
  text: {
    primary: colorTokens.text.primary,
    secondary: colorTokens.text.secondary,
  },
  grey: colorTokens.neutral,
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: colorTokens.primary[300],
    light: colorTokens.primary[100],
    dark: colorTokens.primary[500],
    contrastText: '#000',
  },
  secondary: {
    main: colorTokens.secondary[300],
    light: colorTokens.secondary[100],
    dark: colorTokens.secondary[500],
    contrastText: '#000',
  },
  success: {
    main: colorTokens.success[300],
    light: colorTokens.success[100],
    dark: colorTokens.success[500],
    contrastText: '#000',
  },
  warning: {
    main: colorTokens.warning[300],
    light: colorTokens.warning[100],
    dark: colorTokens.warning[500],
    contrastText: '#000',
  },
  error: {
    main: colorTokens.error[300],
    light: colorTokens.error[100],
    dark: colorTokens.error[500],
    contrastText: '#000',
  },
  info: {
    main: colorTokens.primary[300],
    light: colorTokens.primary[100],
    dark: colorTokens.primary[500],
    contrastText: '#000',
  },
  background: {
    default: colorTokens.background.dark,
    paper: colorTokens.background.darkSecondary,
  },
  text: {
    primary: colorTokens.text.inverse,
    secondary: colorTokens.neutral[400],
  },
  grey: colorTokens.neutral,
};

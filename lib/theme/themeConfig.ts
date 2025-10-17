'use client';
import { designTokens } from '@lib/designSystem/tokens';
import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';
import { darkPalette, lightPalette } from './palette';
import typography from './typography';

export const getTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    breakpoints,
    shape: { 
      borderRadius: designTokens.borderRadius.md,
    },
    spacing: designTokens.spacing.sm,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: designTokens.borderRadius.md,
            fontWeight: designTokens.typography.fontWeight.semibold,
            padding: designTokens.components.button.padding.medium,
            minHeight: designTokens.components.button.height.medium,
            boxShadow: designTokens.shadows.none,
            transition: `all ${designTokens.animations.duration.normal} ${designTokens.animations.easing.easeInOut}`,
            '&:hover': {
              boxShadow: designTokens.shadows.md,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            background: designTokens.gradients.primary,
            '&:hover': {
              background: designTokens.gradients.primary,
              boxShadow: designTokens.shadows.lg,
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: designTokens.borderRadius.md,
              transition: `all ${designTokens.animations.duration.normal} ${designTokens.animations.easing.easeInOut}`,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: designTokens.colors.primary[300],
                borderWidth: 2,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: designTokens.colors.primary[500],
                borderWidth: 2,
                boxShadow: `0 0 0 3px ${designTokens.colors.primary[100]}`,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.lg,
            boxShadow: designTokens.shadows.md,
            transition: `all ${designTokens.animations.duration.normal} ${designTokens.animations.easing.easeInOut}`,
            '&:hover': {
              boxShadow: designTokens.shadows.lg,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.md,
          },
          elevation1: {
            boxShadow: designTokens.shadows.sm,
          },
          elevation2: {
            boxShadow: designTokens.shadows.md,
          },
          elevation3: {
            boxShadow: designTokens.shadows.lg,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.full,
            fontWeight: designTokens.typography.fontWeight.medium,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: designTokens.borderRadius.xl,
            boxShadow: designTokens.shadows['2xl'],
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.md,
            fontWeight: designTokens.typography.fontWeight.medium,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: mode === 'light' 
              ? designTokens.gradients.background.light 
              : designTokens.gradients.background.dark,
            backgroundAttachment: 'fixed',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.sm,
            height: 6,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: designTokens.borderRadius.sm,
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: 'primary.main',
          },
        },
      },
    },
  });

export default getTheme;

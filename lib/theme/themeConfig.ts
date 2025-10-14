'use client';
import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';
import { darkPalette, lightPalette } from './palette';
import typography from './typography';

export const getTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    breakpoints,
    shape: { borderRadius: 8 },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600,
            padding: '8px 16px',
            minHeight: 40,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
          elevation2: {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            '& .MuiSnackbarContent-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 6,
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

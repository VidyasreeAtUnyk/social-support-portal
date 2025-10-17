/**
 * Design Tokens - Centralized Design System Configuration
 * 
 * This file contains all design tokens that can be changed in one place
 * to update the entire application's visual appearance.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colorTokens = {
  // Primary Brand Colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary Brand Colors
  secondary: {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63', // Main secondary
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  
  // Success Colors
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // Main success
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  
  // Warning Colors
  warning: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800', // Main warning
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  
  // Error Colors
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // Main error
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Semantic Colors
  semantic: {
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  
  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    dark: '#121212',
    darkSecondary: '#1e1e1e',
  },
  
  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd',
    inverse: '#ffffff',
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacingTokens = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  xxl: 48,  // 48px
  xxxl: 64, // 64px
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typographyTokens = {
  fontFamily: {
    primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    secondary: '"Roboto Mono", "Monaco", "Consolas", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadiusTokens = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadowTokens = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animationTokens = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

// ============================================================================
// BREAKPOINT TOKENS
// ============================================================================

export const breakpointTokens = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const componentTokens = {
  button: {
    height: {
      small: 32,
      medium: 40,
      large: 48,
    },
    borderRadius: borderRadiusTokens.md,
    padding: {
      small: `${spacingTokens.xs}px ${spacingTokens.sm}px`,
      medium: `${spacingTokens.sm}px ${spacingTokens.md}px`,
      large: `${spacingTokens.md}px ${spacingTokens.lg}px`,
    },
  },
  
  input: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
    borderRadius: borderRadiusTokens.md,
    borderWidth: 1,
  },
  
  card: {
    borderRadius: borderRadiusTokens.lg,
    padding: spacingTokens.lg,
    shadow: shadowTokens.md,
  },
  
  modal: {
    borderRadius: borderRadiusTokens.xl,
    padding: spacingTokens.xl,
    shadow: shadowTokens['2xl'],
  },
} as const;

// ============================================================================
// GRADIENT TOKENS
// ============================================================================

export const gradientTokens = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  warning: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  
  // Subtle gradients for backgrounds
  background: {
    light: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    dark: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  },
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================

export const designTokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  borderRadius: borderRadiusTokens,
  shadows: shadowTokens,
  animations: animationTokens,
  breakpoints: breakpointTokens,
  components: componentTokens,
  gradients: gradientTokens,
} as const;

export type DesignTokens = typeof designTokens;
export type ColorTokens = typeof colorTokens;
export type SpacingTokens = typeof spacingTokens;
export type TypographyTokens = typeof typographyTokens;
export type BorderRadiusTokens = typeof borderRadiusTokens;
export type ShadowTokens = typeof shadowTokens;
export type AnimationTokens = typeof animationTokens;
export type BreakpointTokens = typeof breakpointTokens;
export type ComponentTokens = typeof componentTokens;
export type GradientTokens = typeof gradientTokens;

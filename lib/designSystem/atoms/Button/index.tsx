'use client';

import { ButtonProps, Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomButtonProps extends ButtonProps {
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Button variant
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text';
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button color
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether button is full width
   * @default false
   */
  fullWidth?: boolean;
}

const StyledButton = styled(MuiButton)<CustomButtonProps>(({ theme, size, loading }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
  ...(size === 'small' && {
    padding: '4px 12px',
    minHeight: 32,
    fontSize: '0.75rem',
  }),
  ...(size === 'medium' && {
    padding: '8px 16px',
    minHeight: 40,
    fontSize: '0.875rem',
  }),
  ...(size === 'large' && {
    padding: '12px 24px',
    minHeight: 48,
    fontSize: '1rem',
  }),
  ...(loading && {
    color: 'transparent',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
    },
  }),
  // fix icon/text overlap in RTL
  '& .MuiButton-startIcon': {
    marginLeft: theme.direction === 'rtl' ? 0 : undefined,
    marginRight: theme.direction === 'rtl' ? 8 : undefined,
  },
  '& .MuiButton-endIcon': {
    marginRight: theme.direction === 'rtl' ? 0 : undefined,
    marginLeft: theme.direction === 'rtl' ? 8 : undefined,
  },
}));

const LoadingSpinner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 20,
  height: 20,
  border: `2px solid ${theme.palette.primary.contrastText}40`,
  borderTop: `2px solid ${theme.palette.primary.contrastText}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
}));

/**
 * Button component with consistent styling and loading state
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary" size="medium">
 *   Click me
 * </Button>
 *
 * <Button loading variant="outlined">
 *   Loading...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, loading = false, size = 'medium', ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        size={size}
        loading={loading}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

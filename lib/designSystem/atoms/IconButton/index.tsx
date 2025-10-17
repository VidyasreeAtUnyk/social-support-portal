'use client';

import { IconButtonProps, IconButton as MuiIconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomIconButtonProps extends IconButtonProps {
  /**
   * Icon button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Icon button color
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether button has a background
   * @default false
   */
  variant?: 'contained' | 'outlined' | 'text';
}

const StyledIconButton = styled(MuiIconButton)<CustomIconButtonProps>(
  ({ theme, size, variant, loading }) => ({
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    ...(size === 'small' && {
      padding: 8,
      width: 32,
      height: 32,
    }),
    ...(size === 'medium' && {
      padding: 12,
      width: 40,
      height: 40,
    }),
    ...(size === 'large' && {
      padding: 16,
      width: 48,
      height: 48,
    }),
    ...(variant === 'contained' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
    }),
    ...(variant === 'outlined' && {
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
    }),
    ...(loading && {
      color: 'transparent',
    }),
  }),
);

const LoadingSpinner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 16,
  height: 16,
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
 * IconButton component with consistent styling and loading state
 *
 * @example
 * ```tsx
 * <IconButton size="medium" color="primary">
 *   <EditIcon />
 * </IconButton>
 *
 * <IconButton loading variant="contained">
 *   <SaveIcon />
 * </IconButton>
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, CustomIconButtonProps>(
  ({ children, loading = false, size = 'medium', variant = 'text', ...props }, ref) => {
    return (
      <StyledIconButton
        ref={ref}
        size={size}
        variant={variant}
        loading={loading}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </StyledIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

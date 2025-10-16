'use client';

import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomInputProps extends Omit<TextFieldProps, 'size'> {
  /**
   * Input type
   */
  type?: string;
  /**
   * Input size
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * Input variant
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Whether input is in error state
   * @default false
   */
  error?: boolean;
  /**
   * Helper text to display below input
   */
  helperText?: string;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether input is required
   * @default false
   */
  required?: boolean;
  /**
   * Whether input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether input is full width
   * @default true
   */
  fullWidth?: boolean;
}

const StyledTextField = styled(TextField)<CustomInputProps>(({ theme, size }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease-in-out',
    ...(size === 'small' && {
      fontSize: '0.875rem',
      '& .MuiOutlinedInput-input': {
        padding: '8px 12px',
      },
    }),
    ...(size === 'medium' && {
      fontSize: '1rem',
      '& .MuiOutlinedInput-input': {
        padding: '12px 14px',
      },
    }),
    // no 'large' size; use medium defaults
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root': {
    ...(size === 'small' && {
      fontSize: '0.875rem',
    }),
    ...(size === 'medium' && {
      fontSize: '1rem',
    }),
    // no 'large'
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: 4,
    ...(size === 'small' && {
      fontSize: '0.75rem',
    }),
    ...(size === 'medium' && {
      fontSize: '0.875rem',
    }),
    // no 'large'
  },
}));

/**
 * Input component with consistent styling and validation states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 *   required
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   error={hasError}
 *   helperText={errorMessage}
 * />
 * ```
 */
export const Input = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ size = 'medium', variant = 'outlined', fullWidth = true, ...props }, ref) => {
    return (
      <StyledTextField ref={ref} size={size} variant={variant} fullWidth={fullWidth} {...props} />
    );
  },
);

Input.displayName = 'Input';

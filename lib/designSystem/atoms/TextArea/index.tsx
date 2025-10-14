'use client';

import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomTextAreaProps extends Omit<TextFieldProps, 'multiline'> {
  /**
   * TextArea size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * TextArea variant
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Number of rows to display
   * @default 4
   */
  rows?: number;
  /**
   * Maximum number of rows
   */
  maxRows?: number;
  /**
   * Whether TextArea is in error state
   * @default false
   */
  error?: boolean;
  /**
   * Helper text to display below TextArea
   */
  helperText?: string;
  /**
   * Label for the TextArea
   */
  label?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether TextArea is required
   * @default false
   */
  required?: boolean;
  /**
   * Whether TextArea is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether TextArea is full width
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Whether TextArea is resizable
   * @default true
   */
  resizable?: boolean;
}

const StyledTextField = styled(TextField)<CustomTextAreaProps>(
  ({ theme, size, resizable = true }) => ({
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
      ...(size === 'large' && {
        fontSize: '1.125rem',
        '& .MuiOutlinedInput-input': {
          padding: '16px 14px',
        },
      }),
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
      ...(size === 'large' && {
        fontSize: '1.125rem',
      }),
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
      ...(size === 'large' && {
        fontSize: '1rem',
      }),
    },
    '& .MuiOutlinedInput-input': {
      resize: resizable ? 'vertical' : 'none',
      minHeight: 'auto',
    },
  })
);

/**
 * TextArea component with consistent styling and validation states
 * 
 * @example
 * ```tsx
 * <TextArea 
 *   label="Description" 
 *   placeholder="Enter your description"
 *   rows={4}
 *   required
 * />
 * 
 * <TextArea 
 *   label="Comments" 
 *   rows={6}
 *   error={hasError}
 *   helperText={errorMessage}
 *   resizable={false}
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLDivElement, CustomTextAreaProps>(
  ({ 
    size = 'medium', 
    variant = 'outlined', 
    fullWidth = true,
    rows = 4,
    resizable = true,
    ...props 
  }, ref) => {
    return (
      <StyledTextField
        ref={ref}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        multiline
        rows={rows}
        resizable={resizable}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

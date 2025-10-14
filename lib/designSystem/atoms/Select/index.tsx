'use client';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomSelectProps extends Omit<SelectProps, 'onChange' | 'size'> {
  /**
   * Select size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Select variant
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Helper text to display below select
   */
  helperText?: string;
  /**
   * Whether select is in error state
   * @default false
   */
  error?: boolean;
  /**
   * Whether select is required
   * @default false
   */
  required?: boolean;
  /**
   * Whether select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether select is full width
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Options for the select
   */
  options?: Array<{ value: string | number; label: string; disabled?: boolean }>;
  /**
   * Change handler
   */
  onChange?: (event: SelectChangeEvent<unknown>) => void;
}

const StyledFormControl = styled(FormControl)<CustomSelectProps>(({ theme, size }) => ({
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
}));

/**
 * Select component with consistent styling and validation states
 * 
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   value={country}
 *   onChange={handleCountryChange}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 * />
 * 
 * <Select
 *   label="Status"
 *   value={status}
 *   onChange={handleStatusChange}
 *   error={hasError}
 *   helperText={errorMessage}
 *   required
 * />
 * ```
 */
export const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ 
    size = 'medium', 
    variant = 'outlined', 
    fullWidth = true,
    label,
    helperText,
    error = false,
    required = false,
    disabled = false,
    options = [],
    onChange,
    children,
    ...props 
  }, ref) => {
    return (
      <StyledFormControl
        ref={ref}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        error={error}
        required={required}
        disabled={disabled}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          label={label}
          onChange={onChange}
          size={size === 'large' ? 'medium' : size}
          {...props}
        >
          {options.map((option) => (
            <MenuItem 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
          {children}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    );
  }
);

CustomSelect.displayName = 'Select';

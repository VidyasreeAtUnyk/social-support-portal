'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactNode, forwardRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> extends BoxProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Field description/helper text
   */
  description?: string;
  /**
   * Whether field is required
   * @default false
   */
  required?: boolean;
  /**
   * Field content/input component
   */
  children: ReactNode;
  /**
   * Field layout direction
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /**
   * Label width for row layout
   * @default '30%'
   */
  labelWidth?: string;
  /**
   * Whether to show asterisk for required fields
   * @default true
   */
  showRequiredIndicator?: boolean;
  /**
   * React Hook Form control
   */
  control?: Control<TFieldValues>;
  /**
   * Field name for React Hook Form
   */
  name?: FieldPath<TFieldValues>;
  /**
   * Error message to display
   */
  error?: string;
}

const StyledFormField = styled(Box)<FormFieldProps>(
  ({ theme, direction = 'column', labelWidth = '30%' }) => ({
    display: 'flex',
    flexDirection: direction,
    gap: theme.spacing(1),
    width: '100%',
    minWidth: '300px',
    ...(direction === 'row' && {
      alignItems: 'flex-start',
      '& .form-field-label': {
        width: labelWidth,
        minWidth: labelWidth,
        paddingTop: theme.spacing(1),
      },
      '& .form-field-content': {
        flex: 1,
      },
    }),
    ...(direction === 'column' && {
      '& .form-field-label': {
        width: '100%',
      },
      '& .form-field-content': {
        width: '100%',
      },
    }),
  }),
);

const LabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

const RequiredIndicator = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '1.2em',
  fontWeight: 'bold',
}));

/**
 * FormField component for consistent form field layout and labeling with React Hook Form support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FormField
 *   label="Email Address"
 *   required
 *   description="We'll never share your email"
 * >
 *   <Input type="email" placeholder="Enter your email" />
 * </FormField>
 *
 * // With React Hook Form
 * <FormField
 *   label="Name"
 *   control={control}
 *   name="personalInfo.name"
 *   required
 * >
 *   <Input placeholder="Enter your name" />
 * </FormField>
 * ```
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps<any>>(
  (
    {
      label,
      description,
      error,
      required = false,
      children,
      direction = 'column',
      labelWidth = '30%',
      showRequiredIndicator = true,
      control,
      name,
      ...props
    },
    ref,
  ) => {
    const renderField = () => {
      if (control && name) {
        return (
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
              <Box className="form-field-content">
                {React.cloneElement(children as React.ReactElement, {
                  ...field,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message || undefined,
                })}
              </Box>
            )}
          />
        );
      }

      return (
        <Box className="form-field-content">
          {children}
          {error && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {error}
            </Typography>
          )}
        </Box>
      );
    };

    return (
      <StyledFormField ref={ref} direction={direction} labelWidth={labelWidth} {...props}>
        {label && (
          <Box className="form-field-label">
            <LabelContainer>
              <Typography variant="subtitle2" color="textPrimary">
                {label}
              </Typography>
              {required && showRequiredIndicator && <RequiredIndicator>*</RequiredIndicator>}
            </LabelContainer>
            {description && (
              <Typography variant="caption" color="textSecondary">
                {description}
              </Typography>
            )}
          </Box>
        )}

        {renderField()}
      </StyledFormField>
    );
  },
);

FormField.displayName = 'FormField';

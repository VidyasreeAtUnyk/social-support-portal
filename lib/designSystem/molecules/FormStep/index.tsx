'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, forwardRef } from 'react';

export interface FormStepProps extends BoxProps {
  /**
   * Step title
   */
  title: string;
  /**
   * Step description
   */
  description?: string;
  /**
   * Step number
   */
  stepNumber: number;
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Whether step is active
   * @default false
   */
  active?: boolean;
  /**
   * Whether step is completed
   * @default false
   */
  completed?: boolean;
  /**
   * Whether step is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Step content
   */
  children: ReactNode;
  /**
   * Step variant
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'detailed';
}

interface StyledFormStepProps {
  variant?: 'default' | 'compact' | 'detailed';
}

const StyledFormStep = styled(Box)<StyledFormStepProps>(({ theme, variant = 'default' }) => ({
  width: '100%',
  ...(variant === 'compact' && {
    padding: theme.spacing(2),
  }),
  ...(variant === 'detailed' && {
    padding: theme.spacing(4),
  }),
  ...(variant === 'default' && {
    padding: theme.spacing(3),
  }),
}));

interface StepHeaderProps {
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
}

const StepHeader = styled(Box)<StepHeaderProps>(({ theme, active, completed, disabled }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${
    completed
      ? theme.palette.success.main
      : active
        ? theme.palette.primary.main
        : theme.palette.grey[300]
  }`,
  transition: 'all 0.3s ease-in-out',
  ...(disabled && {
    opacity: 0.6,
    cursor: 'not-allowed',
  }),
}));

interface StepNumberProps {
  active?: boolean;
  completed?: boolean;
}

const StepNumber = styled(Box)<StepNumberProps>(({ theme, active, completed }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '1rem',
  backgroundColor: completed
    ? theme.palette.success.main
    : active
      ? theme.palette.primary.main
      : theme.palette.grey[300],
  color: completed || active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  transition: 'all 0.3s ease-in-out',
}));

const StepContent = styled(Box)(({ theme }) => ({
  width: '100%',
}));

/**
 * FormStep component for multi-step form layout
 *
 * @example
 * ```tsx
 * <FormStep
 *   title="Personal Information"
 *   description="Please provide your basic details"
 *   stepNumber={1}
 *   totalSteps={3}
 *   active
 * >
 *   <Input label="Name" />
 *   <Input label="Email" />
 * </FormStep>
 *
 * <FormStep
 *   title="Financial Information"
 *   stepNumber={2}
 *   totalSteps={3}
 *   completed
 *   variant="compact"
 * >
 *   <Input label="Income" />
 * </FormStep>
 * ```
 */
export const FormStep = forwardRef<HTMLDivElement, FormStepProps>(
  (
    {
      title,
      description,
      stepNumber,
      totalSteps,
      active = false,
      completed = false,
      disabled = false,
      children,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <StyledFormStep ref={ref} variant={variant} {...props}>
        <StepHeader active={active} completed={completed} disabled={disabled}>
          <StepNumber active={active} completed={completed}>
            {completed ? '✓' : stepNumber}
          </StepNumber>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" color="textPrimary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            )}
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
              Step {stepNumber} of {totalSteps}
            </Typography>
          </Box>
        </StepHeader>

        <StepContent>{children}</StepContent>
      </StyledFormStep>
    );
  },
);

FormStep.displayName = 'FormStep';

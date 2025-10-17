'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { Box, BoxProps, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface StepProgressBarProps extends BoxProps {
  /**
   * Current step number (1-based)
   */
  currentStep: number;
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Step labels
   */
  stepLabels?: string[];
  /**
   * Whether to show step labels
   * @default true
   */
  showLabels?: boolean;
  /**
   * Whether to show percentage
   * @default true
   */
  showPercentage?: boolean;
  /**
   * Progress bar variant
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'detailed';
  /**
   * Progress bar color
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

interface StyledProgressContainerProps {
  variant?: 'default' | 'compact' | 'detailed';
}

const StyledProgressContainer = styled(Box)<StyledProgressContainerProps>(
  ({ theme, variant = 'default' }) => ({
    width: '100%',
    ...(variant === 'compact' && {
      padding: theme.spacing(1),
    }),
    ...(variant === 'detailed' && {
      padding: theme.spacing(3),
    }),
    ...(variant === 'default' && {
      padding: theme.spacing(2),
    }),
    maxWidth: 600,
    margin: 'auto',
  }),
);

const ProgressHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const StepIndicators = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: 1,
}));

interface StepIndicatorProps {
  active: boolean;
  completed: boolean;
  placement: number;
}

const StepIndicator = styled(Box, {
  shouldForwardProp: (prop) => !['active', 'completed', 'placement'].includes(prop as string),
})<StepIndicatorProps>(({ theme, active, completed, placement }) => ({
  position: 'absolute',
  width: 12,
  height: 12,
  borderRadius: '50%',
  left: `calc(${placement}% - 6px)`,
  top: 0,
  backgroundColor: completed
    ? theme.palette.success.main
    : active
      ? theme.palette.primary.main
      : theme.palette.grey[300],
  transition: 'all 0.3s ease-in-out',
  ...(active && {
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
  }),
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: theme.shape.borderRadius,
  },
}));

const StepLabels = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  gap: theme.spacing(1),
}));

interface StepLabelProps {
  active: boolean;
  completed: boolean;
}

const StepLabel = styled(Typography, {
  shouldForwardProp: (prop) => !['active', 'completed'].includes(prop as string),
})<StepLabelProps>(({ theme, active, completed }) => ({
  fontSize: '1rem',
  textAlign: 'center',
  color: completed
    ? theme.palette.success.main
    : active
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  transition: 'all 0.3s ease-in-out',
}));

/**
 * StepProgressBar component for showing form progress
 *
 * @example
 * ```tsx
 * <StepProgressBar
 *   currentStep={2}
 *   totalSteps={3}
 *   stepLabels={['Personal', 'Financial', 'Situation']}
 * />
 *
 * <StepProgressBar
 *   currentStep={1}
 *   totalSteps={4}
 *   variant="compact"
 *   showPercentage={false}
 * />
 * ```
 */
export const StepProgressBar = forwardRef<HTMLDivElement, StepProgressBarProps>(
  (
    {
      currentStep,
      totalSteps,
      stepLabels = [],
      showLabels = true,
      showPercentage = true,
      variant = 'default',
      color = 'primary',
      ...props
    },
    ref,
  ) => {
    const progress = (100 / (totalSteps - 1)) * (currentStep - 1);
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    const { t } = useTranslation(['common']);

    return (
      <StyledProgressContainer ref={ref} variant={variant} {...props}>
        <ProgressHeader>
          <Typography variant="subtitle1" color="textPrimary" sx={{ fontSize: '1rem', fontWeight: 600 }}>
            {t('common:progress')}
          </Typography>
          {showPercentage && (
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
              {Math.round(progress)}%
            </Typography>
          )}
        </ProgressHeader>

        <Box sx={{ position: 'relative', mb: showLabels ? 2 : 1 }}>
          <ProgressBar variant="determinate" value={progress} color={color} />

          <StepIndicators sx={{ position: 'absolute', top: -2, left: 0, right: 0 }}>
            {steps.map((step) => (
              <StepIndicator
                key={step}
                placement={(100 / (totalSteps - 1)) * (step - 1)}
                active={step === currentStep}
                completed={step < currentStep}
              />
            ))}
          </StepIndicators>
        </Box>

        {showLabels && stepLabels.length > 0 && (
          <StepLabels>
            {stepLabels.map((label, index) => (
              <StepLabel
                key={index}
                variant="caption"
                active={index + 1 === currentStep}
                completed={index + 1 < currentStep}
              >
                {label}
              </StepLabel>
            ))}
          </StepLabels>
        )}
      </StyledProgressContainer>
    );
  },
);

StepProgressBar.displayName = 'StepProgressBar';

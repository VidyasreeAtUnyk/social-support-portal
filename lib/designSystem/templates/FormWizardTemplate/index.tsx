'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { FormActions, StepProgressBar } from '@lib/designSystem/molecules';
import { designTokens } from '@lib/designSystem/tokens';
import { Box, BoxProps, Container, Paper, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface FormWizardTemplateProps extends BoxProps {
  /**
   * Form title
   */
  title: string;
  /**
   * Form subtitle/description
   */
  subtitle?: string;
  /**
   * Current step number (1-based)
   */
  currentStep: number;
  /**
   * Total number of steps
   */
  totalSteps: number;
  /**
   * Step labels for progress bar
   */
  stepLabels?: string[];
  /**
   * Form content for current step
   */
  children: ReactNode;
  /**
   * Form actions
   */
  actions?: ReactNode;
  /**
   * Previous button props
   */
  previousButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  /**
   * Next button props
   */
  nextButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  /**
   * Submit button props
   */
  submitButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  /**
   * Save button props
   */
  saveButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
  /**
   * Cancel button props
   */
  cancelButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  /**
   * Whether to show progress bar
   * @default true
   */
  showProgress?: boolean;
  /**
   * Whether to show step numbers
   * @default true
   */
  showStepNumbers?: boolean;
  /**
   * Template variant
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'detailed';
  /**
   * Maximum width of the form
   * @default 'md'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface StyledContainerProps {
  variant?: 'default' | 'compact' | 'detailed';
}

const StyledContainer = styled(Container)<StyledContainerProps>(
  ({ theme, variant = 'default' }) => ({
    paddingTop: designTokens.spacing.xxxl,
    paddingBottom: designTokens.spacing.xxxl,
    ...(variant === 'compact' && {
      paddingTop: designTokens.spacing.xl,
      paddingBottom: designTokens.spacing.xl,
    }),
    ...(variant === 'detailed' && {
      paddingTop: designTokens.spacing.xxxl * 1.5,
      paddingBottom: designTokens.spacing.xxxl * 1.5,
    }),
  }),
);

const FormHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: designTokens.spacing.xl,
  position: 'relative',
  // '&::after': {
  //   content: '""',
  //   position: 'absolute',
  //   bottom: -designTokens.spacing.md,
  //   left: '50%',
  //   transform: 'translateX(-50%)',
  //   width: designTokens.spacing.xxxl,
  //   height: 4,
  //   background: designTokens.gradients.primary,
  //   borderRadius: designTokens.borderRadius.full,
  // },
}));

const FormContent = styled(Paper)(({ theme }) => ({
  padding: designTokens.spacing.xl,
  borderRadius: designTokens.borderRadius.xl,
  boxShadow: designTokens.shadows.xl,
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: designTokens.gradients.primary,
  },
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: designTokens.spacing.sm,
  color: theme.palette.primary.main,
  padding: 0,
  fontSize: designTokens.typography.fontSize.md,
  fontWeight: designTokens.typography.fontWeight.semibold,
  marginTop: designTokens.spacing.md,
  marginBottom: 0,
}));

/**
 * FormWizardTemplate component for multi-step form layout
 *
 * @example
 * ```tsx
 * <FormWizardTemplate
 *   title="Social Support Application"
 *   subtitle="Apply for financial assistance"
 *   currentStep={2}
 *   totalSteps={3}
 *   stepLabels={['Personal', 'Financial', 'Situation']}
 *   previousButton={{
 *     text: 'Previous',
 *     onClick: handlePrevious
 *   }}
 *   nextButton={{
 *     text: 'Next',
 *     onClick: handleNext
 *   }}
 * >
 *   <Input label="Monthly Income" />
 *   <Input label="Employment Status" />
 * </FormWizardTemplate>
 * ```
 */
export const FormWizardTemplate = forwardRef<HTMLDivElement, FormWizardTemplateProps>(
  (
    {
      title,
      subtitle,
      currentStep,
      totalSteps,
      stepLabels = [],
      children,
      actions,
      previousButton,
      nextButton,
      submitButton,
      saveButton,
      cancelButton,
      showProgress = true,
      showStepNumbers = true,
      variant = 'default',
      maxWidth = 'md',
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation(['common']);

    return (
      <StyledContainer ref={ref} maxWidth={maxWidth} variant={variant}>
        <FormHeader>
          <Typography 
            variant="h2" 
            color="textPrimary" 
            sx={{ 
              mb: 2,
              fontWeight: designTokens.typography.fontWeight.bold,
              fontSize: designTokens.typography.fontSize['4xl'],
              background: designTokens.gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="h5" 
              color="textSecondary"
              sx={{
                fontWeight: designTokens.typography.fontWeight.medium,
                fontSize: designTokens.typography.fontSize.xl,
              }}
            >
              {subtitle}
            </Typography>
          )}
          {showStepNumbers && (
            <StepIndicator>{t('common:stepInfo', { currentStep, totalSteps })}</StepIndicator>
          )}
        </FormHeader>

        {showProgress && (
          <Box sx={{ mb: 4 }}>
            <StepProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={stepLabels}
              variant={variant === 'compact' ? 'compact' : 'default'}
            />
          </Box>
        )}

        <FormContent elevation={2}>
          {children}

          {actions || (
            <FormActions
              previousButton={previousButton}
              nextButton={nextButton}
              submitButton={submitButton}
              saveButton={saveButton}
              cancelButton={cancelButton}
              showDivider={true}
            />
          )}
        </FormContent>
      </StyledContainer>
    );
  },
);

FormWizardTemplate.displayName = 'FormWizardTemplate';

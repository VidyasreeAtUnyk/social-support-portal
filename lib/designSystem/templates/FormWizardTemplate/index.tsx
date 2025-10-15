'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { FormActions, StepProgressBar } from '@lib/designSystem/molecules';
import { Box, BoxProps, Container, Paper } from '@mui/material';
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

const StyledContainer = styled(Container)<FormWizardTemplateProps>(
  ({ theme, variant = 'default' }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    ...(variant === 'compact' && {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }),
    ...(variant === 'detailed' && {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    }),
  }),
);

const FormHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const FormContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  // backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius * 2,
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
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
      <StyledContainer ref={ref} maxWidth={maxWidth} variant={variant} {...props}>
        <FormHeader>
          <Typography variant="h3" color="textPrimary" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" color="textSecondary">
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

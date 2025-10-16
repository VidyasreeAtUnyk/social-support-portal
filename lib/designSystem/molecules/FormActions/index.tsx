'use client';

import { Button } from '@lib/designSystem/atoms/Button';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, forwardRef } from 'react';

export interface FormActionsProps extends BoxProps {
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
    type?: 'button' | 'submit' | 'reset';
  };
  /**
   * Submit button props
   */
  submitButton?: {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
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
   * Actions layout direction
   * @default 'row'
   */
  direction?: 'row' | 'column';
  /**
   * Actions alignment
   * @default 'space-between'
   */
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /**
   * Custom actions
   */
  children?: ReactNode;
  /**
   * Whether to show divider
   * @default true
   */
  showDivider?: boolean;
}

interface StyledFormActionsProps {
  showDivider?: boolean;
}

const StyledFormActions = styled(Box, {
  shouldForwardProp: (prop) => !['showDivider'].includes(prop as string),
})<StyledFormActionsProps>(({ theme, showDivider = true }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  ...(showDivider && {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
  }),
}));

const LeftActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const RightActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

/**
 * FormActions component for consistent form action buttons
 *
 * @example
 * ```tsx
 * <FormActions
 *   previousButton={{
 *     text: 'Previous',
 *     onClick: handlePrevious,
 *     disabled: currentStep === 1
 *   }}
 *   nextButton={{
 *     text: 'Next',
 *     onClick: handleNext,
 *     loading: isSubmitting
 *   }}
 * />
 *
 * <FormActions
 *   submitButton={{
 *     text: 'Submit Application',
 *     onClick: handleSubmit,
 *     loading: isSubmitting
 *   }}
 *   cancelButton={{
 *     text: 'Cancel',
 *     onClick: handleCancel
 *   }}
 * />
 * ```
 */
export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  (
    {
      previousButton,
      nextButton,
      submitButton,
      saveButton,
      cancelButton,
      direction = 'row',
      justifyContent = 'space-between',
      children,
      showDivider = true,
      ...props
    },
    ref,
  ) => {
    const hasLeftActions = previousButton || cancelButton || saveButton;
    const hasRightActions = nextButton || submitButton;

    return (
      <StyledFormActions
        ref={ref}
        flexDirection={direction}
        justifyContent={justifyContent}
        showDivider={showDivider}
        {...props}
      >
        {hasLeftActions && (
          <LeftActions>
            {previousButton && (
              <Button
                variant="outlined"
                onClick={previousButton.onClick}
                disabled={previousButton.disabled}
                loading={previousButton.loading}
              >
                {previousButton.text || 'Previous'}
              </Button>
            )}
            {cancelButton && (
              <Button
                variant="text"
                color="secondary"
                onClick={cancelButton.onClick}
                disabled={cancelButton.disabled}
              >
                {cancelButton.text || 'Cancel'}
              </Button>
            )}
            {saveButton && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={saveButton.onClick}
                disabled={saveButton.disabled}
                loading={saveButton.loading}
              >
                {saveButton.text || 'Save Draft'}
              </Button>
            )}
          </LeftActions>
        )}

        {children}

        {hasRightActions && (
          <RightActions>
            {nextButton && (
              <Button
                variant="contained"
                onClick={nextButton.onClick}
                disabled={nextButton.disabled}
                loading={nextButton.loading}
                type={nextButton.type || 'button'}
              >
                {nextButton.text || 'Next'}
              </Button>
            )}
            {submitButton && (
              <Button
                variant="contained"
                color="primary"
                onClick={submitButton.onClick}
                disabled={submitButton.disabled}
                loading={submitButton.loading}
                type={submitButton.type || 'button'}
              >
                {submitButton.text || 'Submit'}
              </Button>
            )}
          </RightActions>
        )}
      </StyledFormActions>
    );
  },
);

FormActions.displayName = 'FormActions';

'use client';

import { DEFAULT_NAMESPACE } from '@lib/constants';
import { useToast } from '@lib/context/ToastContext';

/**
 * Hook for showing translated toast messages
 * 
 * @example
 * ```tsx
 * const { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } = useTranslatedToast();
 * 
 * showSuccessToast('toast.success.formSubmitted');
 * showErrorToast('toast.error.submissionFailed');
 * ```
 */
export const useTranslatedToast = () => {
  const { showToast } = useToast();

  const showSuccessToast = (
    translationKey: string, 
    params?: Record<string, unknown>, 
    namespace: string = DEFAULT_NAMESPACE
  ) => {
    showToast({
      translationKey,
      translationParams: params,
      namespace,
      severity: 'success',
    });
  };

  const showErrorToast = (
    translationKey: string, 
    params?: Record<string, unknown>, 
    namespace: string = DEFAULT_NAMESPACE
  ) => {
    showToast({
      translationKey,
      translationParams: params,
      namespace,
      severity: 'error',
    });
  };

  const showWarningToast = (
    translationKey: string, 
    params?: Record<string, unknown>, 
    namespace: string = DEFAULT_NAMESPACE
  ) => {
    showToast({
      translationKey,
      translationParams: params,
      namespace,
      severity: 'warning',
    });
  };

  const showInfoToast = (
    translationKey: string, 
    params?: Record<string, unknown>, 
    namespace: string = DEFAULT_NAMESPACE
  ) => {
    showToast({
      translationKey,
      translationParams: params,
      namespace,
      severity: 'info',
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showToast, // Keep the original for custom use cases
  };
};

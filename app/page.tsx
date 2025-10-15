'use client';

import { Step1Form } from '@components/forms/Step1Form';
import { Step2Form } from '@components/forms/Step2Form';
import { Step3Form } from '@components/forms/Step3Form';
import { useToast } from '@lib/context/ToastContext';
import { FormWizardTemplate } from '@lib/designSystem/templates/FormWizardTemplate';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { setCurrentStep } from '@lib/store/formSlice';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';
import { mockSubmitForm } from '@services/form/mockSubmit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const { t, i18n } = useTranslation(['common', 'step1', 'step2', 'step3']);
  const { showToast } = useToast();

  const { form, validateStep, clearForm } = useSocialSupportForm();
  const totalSteps = 3;

  const stepLabels = useMemo(
    () => [
      t('step1:title', { ns: 'step1' }),
      t('step2:title', { ns: 'step2' }),
      t('step3:title', { ns: 'step3' }),
    ],
    [i18n.language, t],
  );

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        dispatch(setCurrentStep(currentStep + 1));
      }
    } else {
      // errors will show automatically via FormField
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      // Errors will show automatically via FormField
      return;
    }

    try {
      // Get complete form data from react-hook-form
      const formData = form.getValues();

      // Mock API call
      const response = await mockSubmitForm(formData);

      if (response.success) {
        // Show success message or toast
        console.log(response.message);
        showToast({ message: `Form submitted successfully!`, severity: 'success' });

        // Clear form
        clearForm();
      } else {
        // Handle mock error (rare here)
        console.error('Submission failed:', response.message);
        showToast({ message: `Submission failed!`, severity: 'error' });
      }
    } catch (error: any) {
      console.error('Submission error:', error.message || error);
      showToast({ message: `Submission failed!`, severity: 'error' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleClear = () => {
    clearForm();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form form={form} />;
      case 2:
        return <Step2Form form={form} />;
      case 3:
        return <Step3Form form={form} />;
      default:
        return <Step1Form form={form} />;
    }
  };

  return (
    <FormWizardTemplate
      title={t('title', { ns: 'common' })}
      subtitle={t('subtitle', { ns: 'common' })}
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabels={stepLabels}
      previousButton={{
        text: t('actions.previous', { ns: 'common' }),
        onClick: handlePrevious,
        disabled: currentStep === 1,
      }}
      nextButton={{
        text:
          currentStep === totalSteps
            ? t('actions.submit', { ns: 'common' })
            : t('actions.next', { ns: 'common' }),
        onClick: currentStep === totalSteps ? handleSubmit : handleNext,
      }}
      cancelButton={{
        text: t('actions.clearForm', { ns: 'common' }),
        onClick: handleClear,
      }}
    >
      {renderStepContent()}
    </FormWizardTemplate>
  );
}

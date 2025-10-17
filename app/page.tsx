'use client';

import { Step1Form } from '@components/forms/Step1Form';
import { Step2Form } from '@components/forms/Step2Form';
import { Step3Form } from '@components/forms/Step3Form';
import SecurityNotice from '@lib/components/SecurityNotice';
import {
  FORM_STEPS,
  getStepNamespace,
  getStepTitleKey,
  TOTAL_FORM_STEPS,
  TRANSLATION_NAMESPACES
} from '@lib/constants';
import { useToast } from '@lib/context/ToastContext';
import { FormWizardTemplate } from '@lib/designSystem/templates/FormWizardTemplate';
import { useFormEncryption } from '@lib/hooks/useFormEncryption';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { useTranslatedToast } from '@lib/hooks/useTranslatedToast';
import { setCurrentStep } from '@lib/store/formSlice';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';
import { mockSubmitForm } from '@services/form/mockSubmit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const { t, i18n } = useTranslation([
    TRANSLATION_NAMESPACES.COMMON, 
    TRANSLATION_NAMESPACES.STEP1, 
    TRANSLATION_NAMESPACES.STEP2, 
    TRANSLATION_NAMESPACES.STEP3
  ]);
  const { showToast } = useToast();
  const { showSuccessToast, showErrorToast } = useTranslatedToast();
  const { encryptData, decryptData, isSupported: encryptionSupported } = useFormEncryption();

  const { form, validateStep, clearForm } = useSocialSupportForm();
  const totalSteps = TOTAL_FORM_STEPS;

  const stepLabels = useMemo(() => {
    return [
      t(getStepTitleKey(FORM_STEPS.PERSONAL_INFO), { ns: getStepNamespace(FORM_STEPS.PERSONAL_INFO) }),
      t(getStepTitleKey(FORM_STEPS.FAMILY_INFO), { ns: getStepNamespace(FORM_STEPS.FAMILY_INFO) }),
      t(getStepTitleKey(FORM_STEPS.SITUATION_DESCRIPTION), { ns: getStepNamespace(FORM_STEPS.SITUATION_DESCRIPTION) }),
    ];
  }, [i18n.language, t]);

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

      // Encrypt sensitive data before submission
      const encryptedData = await encryptData(formData);
      
      console.log('🔒 Form data encryption status:', {
        original: formData,
        encrypted: encryptedData,
        encryptionSupported: encryptionSupported
      });

      // Mock API call with encrypted data
      const response = await mockSubmitForm(encryptedData);

      if (response.success) {
        // Show success message or toast
        console.log(response.message);
        showSuccessToast(
          encryptionSupported ? 'toast.success.formSubmittedEncrypted' : 'toast.success.formSubmittedNoEncryption'
        );

        // 🔓 DEV: Decrypt and verify data integrity
        if (encryptionSupported) {
          try {
            // Decrypt the data using the same key from the hook
            const decryptedData = await decryptData(encryptedData);
            
            console.log('🔓 DEV: Decryption verification:', {
              original: formData,
              decrypted: decryptedData,
              dataIntegrity: JSON.stringify(formData) === JSON.stringify(decryptedData) ? '✅ PASSED' : '❌ FAILED'
            });
            
            // Show field-by-field comparison
            console.log('🔍 DEV: Field-by-field verification:');
            Object.keys(formData).forEach(section => {
              const sectionData = (formData as any)[section];
              if (typeof sectionData === 'object' && sectionData !== null) {
                Object.keys(sectionData).forEach(field => {
                  const original = sectionData[field];
                  const decrypted = (decryptedData as any)[section]?.[field];
                  const match = original === decrypted ? '✅' : '❌';
                  console.log(`  ${section}.${field}: ${match} (${original} === ${decrypted})`);
                });
              }
            });
            
          } catch (decryptError) {
            console.error('❌ DEV: Decryption failed:', decryptError);
          }
        }

        // Clear form
        clearForm();
      } else {
        // Handle mock error (rare here)
        console.error('Submission failed:', response.message);
        showErrorToast('toast.error.submissionFailed');
      }
    } catch (error: unknown) {
      const message = (error as Error)?.message || String(error);
      console.error('Submission error:', message);
      showErrorToast('toast.error.submissionFailed');
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
      case FORM_STEPS.PERSONAL_INFO:
        return <Step1Form form={form} />;
      case FORM_STEPS.FAMILY_INFO:
        return <Step2Form form={form} />;
      case FORM_STEPS.SITUATION_DESCRIPTION:
        return <Step3Form form={form} />;
      default:
        return <Step1Form form={form} />;
    }
  };

  return (
    <FormWizardTemplate
      title={t('title', { ns: TRANSLATION_NAMESPACES.COMMON })}
      subtitle={t('subtitle', { ns: TRANSLATION_NAMESPACES.COMMON })}
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabels={stepLabels}
      previousButton={{
        text: t('actions.previous', { ns: TRANSLATION_NAMESPACES.COMMON }),
        onClick: handlePrevious,
        disabled: currentStep === FORM_STEPS.PERSONAL_INFO,
      }}
      nextButton={{
        text:
          currentStep === totalSteps
            ? t('actions.submit', { ns: TRANSLATION_NAMESPACES.COMMON })
            : t('actions.next', { ns: TRANSLATION_NAMESPACES.COMMON }),
        onClick: currentStep === totalSteps ? handleSubmit : handleNext,
      }}
      cancelButton={{
        text: t('actions.clearForm', { ns: TRANSLATION_NAMESPACES.COMMON }),
        onClick: handleClear,
      }}
    >
      <SecurityNotice variant="compact" />
      {renderStepContent()}
    </FormWizardTemplate>
  );
}

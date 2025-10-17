'use client';

import { Step1Form } from '@components/forms/Step1Form';
import { Step2Form } from '@components/forms/Step2Form';
import { Step3Form } from '@components/forms/Step3Form';
import SecurityNotice from '@lib/components/SecurityNotice';
import { useToast } from '@lib/context/ToastContext';
import { FormWizardTemplate } from '@lib/designSystem/templates/FormWizardTemplate';
import { useFormEncryption } from '@lib/hooks/useFormEncryption';
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
  const { encryptData, decryptData, isSupported: encryptionSupported } = useFormEncryption();

  const { form, validateStep, clearForm } = useSocialSupportForm();
  const totalSteps = 3;

  const stepLabels = useMemo(() => {
    return [
      t('step1:title', { ns: 'step1' }),
      t('step2:title', { ns: 'step2' }),
      t('step3:title', { ns: 'step3' }),
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
        showToast({ 
          message: `Form submitted successfully! ${encryptionSupported ? 'Data was encrypted.' : 'Note: Encryption not available.'}`, 
          severity: 'success' 
        });

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
              if (typeof formData[section] === 'object' && formData[section] !== null) {
                Object.keys(formData[section]).forEach(field => {
                  const original = formData[section][field];
                  const decrypted = decryptedData[section][field];
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
        showToast({ message: `Submission failed!`, severity: 'error' });
      }
    } catch (error: unknown) {
      const message = (error as Error)?.message || String(error);
      console.error('Submission error:', message);
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
      <SecurityNotice variant="compact" />
      {renderStepContent()}
    </FormWizardTemplate>
  );
}

'use client';

// import { AI_CONFIG } from '@lib/ai/aiConfig';
import { ErrorBoundary } from '@lib/components/ErrorBoundary';
import { Step3FieldConfig, situationDescriptionsForm } from '@lib/content/step3Form';
// import { useToast } from '@lib/context/ToastContext';
import { FormField, TextArea } from '@lib/designSystem';
import { HelpMeWriteBox } from '@lib/designSystem/';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Button } from '@mui/material';
// import { getAISuggestion } from '@services/ai';
// import { AISuggestionResponse } from '@services/ai/types';
import { mockAISuggestion } from '@services/ai/mockAiSuggestion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Step3FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step3Form = ({ form }: Step3FormProps) => {
  const { t, i18n } = useTranslation(['step3', 'common']);
  const isRTL = i18n.language === 'ar';
  // const { showToast } = useToast();

  const [helpBoxOpen, setHelpBoxOpen] = useState<{
    financialSituation: boolean;
    employmentCircumstances: boolean;
    reasonForApplying: boolean;
  }>({
    financialSituation: false,
    employmentCircumstances: false,
    reasonForApplying: false,
  });

  const [loadingField, setLoadingField] = useState<{
    financialSituation: boolean;
    employmentCircumstances: boolean;
    reasonForApplying: boolean;
  }>({
    financialSituation: false,
    employmentCircumstances: false,
    reasonForApplying: false,
  });

  const openHelpBox = (field: keyof typeof helpBoxOpen) => {
    setHelpBoxOpen((prev) => ({ ...prev, [field]: true }));
  };

  const closeHelpBox = (field: keyof typeof helpBoxOpen) => {
    setHelpBoxOpen((prev) => ({ ...prev, [field]: false }));
  };

  // A call to mack API requests when api key times out
  const handleRequestSuggestion = async (field: keyof typeof helpBoxOpen) => {
    try {
      setLoadingField((prev) => ({ ...prev, [field]: true }));

      const prompt = form.getValues(`situationDescriptions.${field}` as const);
      const response = await mockAISuggestion(field, prompt || `Help me write ${field}`);

      return response;
    } finally {
      setLoadingField((prev) => ({ ...prev, [field]: false }));
    }
  };

  // const handleRequestSuggestion = async (field: keyof typeof helpBoxOpen, prompt: string) => {
  //   setLoadingField((prev) => ({ ...prev, [field]: true }));

  //   try {
  //     const data: AISuggestionResponse = await getAISuggestion({
  //       fieldKey: field,
  //       prompt: prompt,
  //       config: AI_CONFIG,
  //     });
  //     // setSuggestion(data.choices[0].message.content);
  //     return data.choices?.[0]?.message?.content || '';
  //   } catch (err: any) {
  //     // setSuggestion(`Error: ${err.message}`);
  //     showToast({ message: `Error: ${err.message}`, severity: 'error' });
  //     throw err;
  //   } finally {
  //     setLoadingField((prev) => ({ ...prev, [field]: false }));
  //   }

  //   //   const response = await getAISuggestion({
  //   //     fieldKey: field,
  //   //     prompt: prompt || `Help me write ${field}`,
  //   //   });
  //   //   return response.choices?.[0]?.message?.content || '';
  //   // } finally {
  //   //   setLoadingField((prev) => ({ ...prev, [field]: false }));
  //   // }
  // };

  // const fields: Array<keyof typeof helpBoxOpen> = [
  //   'financialSituation',
  //   'employmentCircumstances',
  //   'reasonForApplying',
  // ];

  return (
    <ErrorBoundary
      fallbackType="form"
      showDebugInfo={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.error('Step3Form Error:', error, errorInfo);
      }}
    >
      <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {situationDescriptionsForm.map((field: Step3FieldConfig) => (
            <Box key={field.name} sx={{ width: '100%' }}>
              <FormField
                label={t(field.label, { ns: 'step3' })}
                required={field.required}
                control={form.control}
                name={`situationDescriptions.${field.name}`}
              >
                {({ value, onChange, error, helperText }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextArea
                      rows={6}
                      value={value}
                      onChange={onChange}
                      error={error}
                      helperText={helperText || ' '} // to maintain height
                      placeholder={t(field.placeholder, { ns: 'step3' })}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        size="small"
                        onClick={() => openHelpBox(field.name as keyof typeof helpBoxOpen)}
                      >
                        {t('common:helpMeWrite')}
                      </Button>
                    </Box>
                  </Box>
                )}
              </FormField>

              <HelpMeWriteBox
                label={t(field.label, { ns: 'step3' })}
                open={helpBoxOpen[field.name as keyof typeof helpBoxOpen]}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={form.getValues(`situationDescriptions.${field.name}` as any)}
                loading={loadingField[field.name as keyof typeof loadingField]}
                onClose={() => closeHelpBox(field.name as keyof typeof helpBoxOpen)}
                onRequestSuggestion={() =>
                  handleRequestSuggestion(field.name as keyof typeof loadingField)
                }
                onAcceptSuggestion={(val) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue(`situationDescriptions.${field.name}` as any, val, {
                    shouldValidate: true,
                  })
                }
                onValueChange={(val) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  form.setValue(`situationDescriptions.${field.name}` as any, val, {
                    shouldValidate: true,
                  })
                }
                description={t(field.description || '', {
                  ns: 'step3',
                  defaultValue: '',
                })}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

'use client';

import { AI_CONFIG } from '@lib/ai/aiConfig';
import { ErrorBoundary } from '@lib/components/ErrorBoundary';
import { LANGUAGES, STEP3_FIELDS, TRANSLATION_NAMESPACES } from '@lib/constants';
import { Step3FieldConfig, situationDescriptionsForm } from '@lib/content/step3Form';
import { useToast } from '@lib/context/ToastContext';
import { FormField, TextArea } from '@lib/designSystem';
import { HelpMeWriteBox } from '@lib/designSystem/';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { useTranslatedToast } from '@lib/hooks/useTranslatedToast';
import { Box, Button } from '@mui/material';
import { getAISuggestion } from '@services/ai';
import { AISuggestionResponse } from '@services/ai/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Step3FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step3Form = ({ form }: Step3FormProps) => {
  const { t, i18n } = useTranslation([TRANSLATION_NAMESPACES.STEP3, TRANSLATION_NAMESPACES.COMMON]);
  const isRTL = i18n.language === LANGUAGES.ARABIC;
  const { showToast } = useToast();
  const { showErrorToast } = useTranslatedToast();

  const [helpBoxOpen, setHelpBoxOpen] = useState<{
    [STEP3_FIELDS.FINANCIAL_SITUATION]: boolean;
    [STEP3_FIELDS.EMPLOYMENT_CIRCUMSTANCES]: boolean;
    [STEP3_FIELDS.REASON_FOR_APPLYING]: boolean;
  }>({
    [STEP3_FIELDS.FINANCIAL_SITUATION]: false,
    [STEP3_FIELDS.EMPLOYMENT_CIRCUMSTANCES]: false,
    [STEP3_FIELDS.REASON_FOR_APPLYING]: false,
  });

  const [loadingField, setLoadingField] = useState<{
    [STEP3_FIELDS.FINANCIAL_SITUATION]: boolean;
    [STEP3_FIELDS.EMPLOYMENT_CIRCUMSTANCES]: boolean;
    [STEP3_FIELDS.REASON_FOR_APPLYING]: boolean;
  }>({
    [STEP3_FIELDS.FINANCIAL_SITUATION]: false,
    [STEP3_FIELDS.EMPLOYMENT_CIRCUMSTANCES]: false,
    [STEP3_FIELDS.REASON_FOR_APPLYING]: false,
  });

  const openHelpBox = (field: keyof typeof helpBoxOpen) => {
    setHelpBoxOpen((prev) => ({ ...prev, [field]: true }));
  };

  const closeHelpBox = (field: keyof typeof helpBoxOpen) => {
    setHelpBoxOpen((prev) => ({ ...prev, [field]: false }));
  };

  // A call to mack API requests when api key times out
  // const handleRequestSuggestion = async (field: keyof typeof helpBoxOpen) => {
  //   try {
  //     setLoadingField((prev) => ({ ...prev, [field]: true }));

  //     const prompt = form.getValues(`situationDescriptions.${field}` as const);
  //     const response = await mockAISuggestion(field, prompt || `Help me write ${field}`);

  //     return response;
  //   } finally {
  //     setLoadingField((prev) => ({ ...prev, [field]: false }));
  //   }
  // };

  const handleRequestSuggestion = async (field: keyof typeof helpBoxOpen, prompt: string) => {
    setLoadingField((prev) => ({ ...prev, [field]: true }));

    try {
      const data: AISuggestionResponse = await getAISuggestion({
        fieldKey: field,
        prompt: prompt,
        language: i18n.language,
        config: AI_CONFIG,
      });
      // setSuggestion(data.choices[0].message.content);
      return data.choices?.[0]?.message?.content || '';
    } catch (err: any) {
      // setSuggestion(`Error: ${err.message}`);
      showErrorToast('toast.error.aiGenerationFailed');
      throw err;
    } finally {
      setLoadingField((prev) => ({ ...prev, [field]: false }));
    }

    //   const response = await getAISuggestion({
    //     fieldKey: field,
    //     prompt: prompt || `Help me write ${field}`,
    //   });
    //   return response.choices?.[0]?.message?.content || '';
    // } finally {
    //   setLoadingField((prev) => ({ ...prev, [field]: false }));
    // }
  };

  const fields: Array<keyof typeof helpBoxOpen> = [
    STEP3_FIELDS.FINANCIAL_SITUATION,
    STEP3_FIELDS.EMPLOYMENT_CIRCUMSTANCES,
    STEP3_FIELDS.REASON_FOR_APPLYING,
  ];

  return (
    <ErrorBoundary
      fallbackType="form"
      showDebugInfo={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.error('Step3Form Error:', error, errorInfo);
      }}
    >
      <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {situationDescriptionsForm.map((field: Step3FieldConfig) => (
            <Box key={field.name} sx={{ width: '100%' }}>
              <FormField
                label={t(field.label, { ns: 'step3' })}
                required={field.required}
                control={form.control}
                name={`situationDescriptions.${field.name}`}
              >
                {({ value, onChange, error, helperText }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <TextArea
                      rows={4}
                      value={value}
                      onChange={onChange}
                      error={error}
                      helperText={helperText || ' '} // to maintain height
                      placeholder={t(field.placeholder, { ns: 'step3' })}
                      maxLength={1000}
                      showCharCount={true}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.25 }}>
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
                onRequestSuggestion={(prompt) =>
                  handleRequestSuggestion(field.name as keyof typeof loadingField, prompt)
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

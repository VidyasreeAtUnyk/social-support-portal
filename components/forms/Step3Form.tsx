'use client';

// import { AI_CONFIG } from '@lib/ai/aiConfig';
import { Step3FieldConfig, situationDescriptionsForm } from '@lib/content/step3Form';
// import { useToast } from '@lib/context/ToastContext';
import { FormField, TextArea } from '@lib/designSystem';
import { HelpMeWriteBox } from '@lib/designSystem/';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Button, Grid } from '@mui/material';
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

      const prompt = form.getValues(`situationDescriptions.${field}`);
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

  const fields: Array<keyof typeof helpBoxOpen> = [
    'financialSituation',
    'employmentCircumstances',
    'reasonForApplying',
  ];

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Grid container spacing={2} direction="column">
        {situationDescriptionsForm.map((field: Step3FieldConfig) => (
          <Grid item xs={12} key={field.name}>
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
                    <Button size="small" onClick={() => openHelpBox(field.name)}>
                      {t('common:helpMeWrite')}
                    </Button>
                  </Box>
                </Box>
              )}
            </FormField>

            <HelpMeWriteBox
              label={t(field.label, { ns: 'step3' })}
              open={helpBoxOpen[field.name]}
              value={form.getValues(`situationDescriptions.${field.name}`)}
              loading={loadingField[field.name]}
              onClose={() => closeHelpBox(field.name)}
              onRequestSuggestion={(prompt) => handleRequestSuggestion(field.name, prompt)}
              onAcceptSuggestion={(val) =>
                form.setValue(`situationDescriptions.${field.name}`, val, {
                  shouldValidate: true,
                })
              }
              onChange={(val) =>
                form.setValue(`situationDescriptions.${field.name}`, val, {
                  shouldValidate: true,
                })
              }
              description={t(field.description || '', {
                ns: 'step3',
                defaultValue: '',
              })}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

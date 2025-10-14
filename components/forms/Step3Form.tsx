'use client';

import { FormField, TextArea } from '@lib/designSystem';
import { HelpMeWriteBox } from '@lib/designSystem/';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Button, Grid } from '@mui/material';
import { mockAISuggestion } from '@services/ai/mockAiSuggestion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Step3FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step3Form = ({ form }: Step3FormProps) => {
  const { t, i18n } = useTranslation(['step3', 'common']);
  const isRTL = i18n.language === 'ar';

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

  // const handleRequestSuggestion = async (field: keyof typeof helpBoxOpen) => {
  //   setLoadingField((prev) => ({ ...prev, [field]: true }));
  //   const prompt = form.getValues(`situationDescriptions.${field}`);
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
        {fields.map((field) => (
          <Grid item xs={12} key={field}>
            <FormField
              label={t(`fields.${field}`, { ns: 'step3' })}
              required={field !== 'employmentCircumstances'}
              control={form.control}
              name={`situationDescriptions.${field}`}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextArea
                  rows={6}
                  placeholder={t(`placeholders.${field}`, { ns: 'step3' })}
                  value={form.getValues(`situationDescriptions.${field}`)}
                  onChange={(e) =>
                    form.setValue(`situationDescriptions.${field}`, e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small" onClick={() => openHelpBox(field)}>
                    Help Me Write
                  </Button>
                </Box>
              </Box>
            </FormField>

            <HelpMeWriteBox
              label={t(`fields.${field}`, { ns: 'step3' })}
              open={helpBoxOpen[field]}
              value={form.getValues(`situationDescriptions.${field}`)}
              loading={loadingField[field]}
              onClose={() => closeHelpBox(field)}
              onRequestSuggestion={() => handleRequestSuggestion(field)}
              onAcceptSuggestion={(val) =>
                form.setValue(`situationDescriptions.${field}`, val, { shouldValidate: true })
              }
              onChange={(val) =>
                form.setValue(`situationDescriptions.${field}`, val, { shouldValidate: true })
              }
              description={t(`descriptions.${field}`, {
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

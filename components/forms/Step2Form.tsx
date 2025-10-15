'use client';

import { FieldConfig, currencies, familyInfoForm } from '@lib/content/step2Form';
import { FormField, Input, Select } from '@lib/designSystem';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Grid, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Step2FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step2Form = ({ form }: Step2FormProps) => {
  const { t, i18n } = useTranslation(['step2', 'common']);
  const isRTL = i18n.language === 'ar';
  const watchedValues = form.watch();

  const getOptions = (field: FieldConfig) => {
    if (field.dynamicOptions === 'currencies') {
      return currencies.map((c) => ({ value: c.code, label: `${c.symbol} - ${c.label}` }));
    }
    return field.options || [];
  };

  const isDisabled = ({
    dependsOn,
    watchedValues,
    formName,
  }: {
    dependsOn?: string;
    watchedValues: Record<string, any>;
    formName: string;
  }) => {
    return !!dependsOn && !watchedValues[formName][dependsOn];
  };

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Grid container spacing={2} direction="row" justifyContent="center">
        {familyInfoForm.map((field) => (
          <Grid item xs={12} md={field.type === 'number' ? 3 : 6} key={field.name}>
            <FormField
              label={t(field.label, { ns: 'step2' })}
              required={field.required}
              control={form.control}
              name={field.name}
            >
              {({ value, onChange, error, helperText }) =>
                field.type === 'select' ? (
                  <Select
                    fullWidth
                    value={value ?? ''}
                    onChange={onChange}
                    error={error}
                    helperText={helperText || ' '} // to maintain height
                    disabled={isDisabled({
                      dependsOn: field.dependsOn,
                      watchedValues,
                      formName: 'familyInfo',
                    })}
                  >
                    {getOptions(field).map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {t(opt.label, { ns: 'step2' })}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    fullWidth
                    type={field.type || 'text'}
                    value={value ?? ''}
                    onChange={onChange}
                    error={error}
                    helperText={helperText || ' '} // to maintain height
                    placeholder={field.placeholder ? t(field.placeholder, { ns: 'step2' }) : ''}
                  />
                )
              }
            </FormField>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

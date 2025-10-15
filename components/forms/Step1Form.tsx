'use client';

import { FieldConfig, FieldOption, personalInfoForm } from '@lib/content/step1Form';
import { FormField, Input, Select } from '@lib/designSystem';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Grid, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountryOption {
  code: string;
  name: string;
  phoneCode: string;
}

interface Step1FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step1Form = ({ form }: Step1FormProps) => {
  const { t, i18n } = useTranslation(['step1', 'countries', 'states']);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const watchedValues = form.watch();

  const isRTL = i18n.language === 'ar';

  // Load countries from translationsag
  useEffect(() => {
    const loadCountries = async () => {
      const loadedCountries =
        (t('list', { ns: 'countries', returnObjects: true }) as CountryOption[]) || [];
      setCountries(loadedCountries);
    };
    loadCountries();
  }, [i18n.language, t]);

  // Load states when country changes
  const countryCode = form.getValues('personalInfo.country');
  useEffect(() => {
    if (!countryCode) return setStates([]);

    const loadedStates = (t(countryCode, { ns: 'states', returnObjects: true }) as string[]) || [];
    setStates(loadedStates);
  }, [countryCode, countries, i18n.language, t]);

  // Helper to resolve the correct data source
  const getOptions = (field: FieldConfig): FieldOption[] => {
    if (field.dynamicOptions === 'countries') {
      return countries.map((c) => ({ value: c.code, label: c.name }));
    }
    if (field.dynamicOptions === 'states') {
      return states.map((s) => ({ value: s, label: s }));
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
  }): boolean => {
    return !!dependsOn && !watchedValues[formName][dependsOn];
  };

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 1 }}
        columnSpacing={{ xs: 1, sm: 2 }}
        direction="row"
        justifyContent="center"
      >
        {personalInfoForm.map((field, index) => (
          <Grid item xs={12} md={6} key={field.name}>
            <FormField
              label={t(field.label, { ns: 'step1' })}
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
                      formName: 'personalInfo',
                    })}
                  >
                    {getOptions(field).map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {t(opt.label, { ns: 'step1' })}
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
                    placeholder={field.placeholder ? t(field.placeholder, { ns: 'step1' }) : ''}
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

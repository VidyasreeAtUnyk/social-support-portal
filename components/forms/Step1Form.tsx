'use client';

import { ErrorBoundary } from '@lib/components/ErrorBoundary';
import { DEFAULT_ALLOWED_COUNTRIES, DEFAULT_PHONE_COUNTRY } from '@lib/config/countries';
import { FieldConfig, FieldOption, personalInfoForm } from '@lib/content/step1Form';
import { FormField, Input, Select } from '@lib/designSystem';
import { PhoneInput } from '@lib/designSystem/atoms/PhoneInput';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountryOption {
  code: string;
  name: string;
  phoneCode: string;
}

interface StateOption {
  code: string;
  name: string;
}

interface Step1FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step1Form = ({ form }: Step1FormProps) => {
  const { t, i18n } = useTranslation(['step1', 'countries', 'states']);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);
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

    const loadedStates = (t(countryCode, { ns: 'states', returnObjects: true }) as StateOption[]) || [];
    setStates(loadedStates);
  }, [countryCode, countries, i18n.language, t]);

  // Helper to resolve the correct data source
  const getOptions = (field: FieldConfig): FieldOption[] => {
    if (field.dynamicOptions === 'countries') {
      return countries.map((c) => ({ value: c.code, label: c.name }));
    }
    if (field.dynamicOptions === 'states') {
      return states.map((s) => ({ value: s.code, label: s.name }));
    }
    return field.options || [];
  };

  const isDisabled = ({
    dependsOn,
    watchedValues,
    formName,
  }: {
    dependsOn?: string;
    watchedValues: Record<string, Record<string, unknown>>;
    formName: string;
  }): boolean => {
    return !!dependsOn && !watchedValues[formName]?.[dependsOn];
  };

  return (
    <ErrorBoundary
      fallbackType="form"
      showDebugInfo={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.error('Step1Form Error:', error, errorInfo);
      }}
    >
      <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {personalInfoForm.map((field) => (
            <Box key={field.name} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
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
                        watchedValues: watchedValues as unknown as Record<
                          string,
                          Record<string, unknown>
                        >,
                        formName: 'personalInfo',
                      })}
                    >
                      {getOptions(field as FieldConfig).map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {t(opt.label, { ns: 'step1' })}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : field.type === 'tel' ? (
                    <PhoneInput
                      fullWidth
                      value={(value as string) || ''}
                      selectedCountry={form.getValues('personalInfo.phoneCountry') || DEFAULT_PHONE_COUNTRY}
                      onChange={(phoneValue, validation, country) => {
                        onChange?.(phoneValue);
                        // Store the selected phone country separately from address country
                        if (country) {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          form.setValue('personalInfo.phoneCountry' as any, country);
                        }
                      }}
                      error={error ? t('phone.errors.notValid', { ns: 'common' }) : undefined}
                      helperText={helperText || ' '} // to maintain height
                      placeholder={field.placeholder ? t(field.placeholder, { ns: 'step1' }) : ''}
                      defaultCountry={DEFAULT_PHONE_COUNTRY}
                      showCountrySelector={true}
                      formatOnChange={true}
                      allowedCountries={DEFAULT_ALLOWED_COUNTRIES}
                    />
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
            </Box>
          ))}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

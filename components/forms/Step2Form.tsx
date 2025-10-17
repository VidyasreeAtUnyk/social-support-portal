'use client';

import { ErrorBoundary } from '@lib/components/ErrorBoundary';
import { FieldConfig, currencies, familyInfoForm } from '@lib/content/step2Form';
import { FormField, Input, Select } from '@lib/designSystem';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, MenuItem } from '@mui/material';
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
    watchedValues: Record<string, Record<string, unknown>>;
    formName: string;
  }) => {
    return !!dependsOn && !watchedValues[formName]?.[dependsOn];
  };

  return (
    <ErrorBoundary
      fallbackType="form"
      showDebugInfo={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.error('Step2Form Error:', error, errorInfo);
      }}
    >
      <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {familyInfoForm.map((field) => (
            <Box
              key={field.name}
              sx={{ flex: '1 1 300px', minWidth: '300px' }}
            >
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
                        watchedValues: watchedValues as unknown as Record<
                          string,
                          Record<string, unknown>
                        >,
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
            </Box>
          ))}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

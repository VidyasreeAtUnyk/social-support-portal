'use client';

import { FormField, Input, Select } from '@lib/designSystem';
import { useSocialSupportForm } from '@lib/hooks/useSocialSupportForm';
import { Box, Grid, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CurrencyOption {
  code: string;
  label: string;
  symbol: string;
}

interface Step2FormProps {
  form: ReturnType<typeof useSocialSupportForm>['form'];
}

export const Step2Form = ({ form }: Step2FormProps) => {
  const { t, i18n } = useTranslation(['step2', 'common']);
  const isRTL = i18n.language === 'ar';

  const currencies: CurrencyOption[] = [
    { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
  ];

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Grid container spacing={2} direction="column" justifyContent="center">
        {/* Row 1: Marital Status | Dependents */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.maritalStatus', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.maritalStatus"
            >
              <Select fullWidth>
                <MenuItem value="single">{t('options.single', { ns: 'step2' })}</MenuItem>
                <MenuItem value="married">{t('options.married', { ns: 'step2' })}</MenuItem>
                <MenuItem value="divorced">{t('options.divorced', { ns: 'step2' })}</MenuItem>
                <MenuItem value="widowed">{t('options.widowed', { ns: 'step2' })}</MenuItem>
              </Select>
            </FormField>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.dependents', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.dependents"
            >
              {/* Convert string -> number for Yup */}
              <Input
                type="number"
                fullWidth
                placeholder="0"
                onChange={(e) =>
                  form.setValue(
                    'familyInfo.dependents',
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
                value={form.watch('familyInfo.dependents')}
              />
            </FormField>
          </Grid>
        </Grid>

        {/* Row 2: Employment Status | Housing Status */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.employmentStatus', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.employmentStatus"
            >
              <Select fullWidth>
                <MenuItem value="employed">{t('options.employed', { ns: 'step2' })}</MenuItem>
                <MenuItem value="self-employed">
                  {t('options.selfEmployed', { ns: 'step2' })}
                </MenuItem>
                <MenuItem value="unemployed">{t('options.unemployed', { ns: 'step2' })}</MenuItem>
                <MenuItem value="student">{t('options.student', { ns: 'step2' })}</MenuItem>
                <MenuItem value="retired">{t('options.retired', { ns: 'step2' })}</MenuItem>
              </Select>
            </FormField>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.housingStatus', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.housingStatus"
            >
              <Select fullWidth>
                <MenuItem value="owned">{t('options.owned', { ns: 'step2' })}</MenuItem>
                <MenuItem value="rented">{t('options.rented', { ns: 'step2' })}</MenuItem>
                <MenuItem value="living-with-family">
                  {t('options.livingWithFamily', { ns: 'step2' })}
                </MenuItem>
                <MenuItem value="homeless">{t('options.homeless', { ns: 'step2' })}</MenuItem>
              </Select>
            </FormField>
          </Grid>
        </Grid>

        {/* Row 3: Currency | Monthly Income */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <FormField
              label={t('fields.currency', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.currency"
            >
              <Select fullWidth>
                {currencies.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {c.symbol} - {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormField>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormField
              label={t('fields.monthlyIncome', { ns: 'step2' })}
              required
              control={form.control}
              name="familyInfo.monthlyIncome"
            >
              <Input
                type="number"
                fullWidth
                placeholder="0"
                onChange={(e) =>
                  form.setValue(
                    'familyInfo.monthlyIncome',
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
                value={form.watch('familyInfo.monthlyIncome')}
              />
            </FormField>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

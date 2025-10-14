'use client';

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
  const selectedCountry = form.getValues('personalInfo.country');
  useEffect(() => {
    if (!selectedCountry) return setStates([]);

    const countryCode = countries.find((c) => c.name === selectedCountry)?.code;
    if (!countryCode) return setStates([]);

    const loadedStates = (t(countryCode, { ns: 'states', returnObjects: true }) as string[]) || [];
    setStates(loadedStates);
  }, [selectedCountry, countries, i18n.language, t]);

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Grid container spacing={2} direction="column">
        {/* Row 1: Name | National ID */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.name', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.name"
            >
              <Input fullWidth placeholder={t('placeholders.name', { ns: 'step1' })} />
            </FormField>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.nationalId', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.nationalId"
            >
              <Input fullWidth placeholder={t('placeholders.nationalId', { ns: 'step1' })} />
            </FormField>
          </Grid>
        </Grid>

        {/* Row 2: Gender | DOB */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.gender', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.gender"
            >
              <Select fullWidth>
                <MenuItem value="male">{t('options.male', { ns: 'step1' })}</MenuItem>
                <MenuItem value="female">{t('options.female', { ns: 'step1' })}</MenuItem>
                <MenuItem value="other">{t('options.other', { ns: 'step1' })}</MenuItem>
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.dob', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.dob"
            >
              <Input fullWidth type="date" />
            </FormField>
          </Grid>
        </Grid>

        {/* Row 3: Address | City */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.address', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.address"
            >
              <Input fullWidth placeholder={t('placeholders.address', { ns: 'step1' })} />
            </FormField>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.city', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.city"
            >
              <Input fullWidth placeholder={t('placeholders.city', { ns: 'step1' })} />
            </FormField>
          </Grid>
        </Grid>

        {/* Row 4: State | Country */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.state', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.state"
            >
              <Select fullWidth disabled={!selectedCountry}>
                <MenuItem value="">{t('select')}</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={12} md={6} justifyContent="center">
            <FormField
              label={t('fields.country', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.country"
            >
              <Select fullWidth>
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormField>
          </Grid>
        </Grid>

        {/* Row 5: Email | Phone */}
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.email', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.email"
            >
              <Input fullWidth placeholder={t('placeholders.email', { ns: 'step1' })} />
            </FormField>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              label={t('fields.phone', { ns: 'step1' })}
              required
              control={form.control}
              name="personalInfo.phone"
            >
              <Input fullWidth placeholder={t('placeholders.phone', { ns: 'step1' })} />
            </FormField>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

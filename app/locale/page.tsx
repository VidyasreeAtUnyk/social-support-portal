'use client';

import { loadLocale } from '@lib/i18n/loadLocale';
import { updatePersonalInfo } from '@lib/store/formSlice';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CountryOption {
  code: string;
  name: string;
  phoneCode: string;
}

export default function ExampleI18nPage() {
  const { t, i18n } = useTranslation(['common', 'countries', 'states']);
  const dispatch = useAppDispatch();

  const { country: selectedCountry, state: selectedState } = useAppSelector(
    (state) => state.form.personalInfo,
  );

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [states, setStates] = useState<string[]>([]);

  // Load countries whenever language changes
  useEffect(() => {
    const loadTranslations = async () => {
      await Promise.all([
        loadLocale(i18n.language, 'common'),
        loadLocale(i18n.language, 'countries'),
        loadLocale(i18n.language, 'states'),
      ]);

      const loadedCountries =
        (t('list', { ns: 'countries', returnObjects: true }) as CountryOption[]) || [];
      setCountries(loadedCountries);
    };
    loadTranslations();
  }, [i18n.language, t]);

  // Load states whenever selectedCountry changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }

    // Find country code by selected country name
    const countryCode = countries.find((c) => c.name === selectedCountry)?.code;

    if (!countryCode) {
      setStates([]);
      return;
    }

    const loadedStates = (t(countryCode, { ns: 'states', returnObjects: true }) as string[]) || [];
    setStates(loadedStates);
  }, [selectedCountry, countries, i18n.language, t]);

  const isRTL = i18n.language === 'ar';

  return (
    <div className={`p-8 max-w-lg mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
      <h1 className="text-2xl font-bold mb-4">{t('greeting')}</h1>

      <label className="block mb-2">{t('country')}</label>
      <select
        className="border p-2 mb-4 w-full"
        value={selectedCountry}
        onChange={(e) => dispatch(updatePersonalInfo({ country: e.target.value, state: '' }))}
      >
        <option value="">{t('select')}</option>
        {countries.map((c) => (
          <option key={c.code} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="block mb-2">{t('state')}</label>
      <select
        className="border p-2 w-full"
        value={selectedState}
        onChange={(e) => dispatch(updatePersonalInfo({ state: e.target.value }))}
        disabled={!selectedCountry}
      >
        <option value="">{t('select')}</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Language switcher */}
      <div className="mt-4">
        <button className="mr-2" onClick={() => i18n.changeLanguage('en')}>
          English
        </button>
        <button onClick={() => i18n.changeLanguage('ar')}>العربية</button>
      </div>
    </div>
  );
}

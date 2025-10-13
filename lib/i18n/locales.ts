// lib/i18n/locales.ts

// English
import enCommon from '../../locales/en/common.json';
import enCountries from '../../locales/en/countries.json';
import enStates from '../../locales/en/states.json';
import enStep1 from '../../locales/en/step1.json';
import enStep2 from '../../locales/en/step2.json';
import enStep3 from '../../locales/en/step3.json';

// Arabic
import arCommon from '../../locales/ar/common.json';
import arCountries from '../../locales/ar/countries.json';
import arStates from '../../locales/ar/states.json';
import arStep1 from '../../locales/ar/step1.json';
import arStep2 from '../../locales/ar/step2.json';
import arStep3 from '../../locales/ar/step3.json';

export const locales = {
  en: {
    common: enCommon,
    countries: enCountries,
    states: enStates,
    step1: enStep1,
    step2: enStep2,
    step3: enStep3,
  },
  ar: {
    common: arCommon,
    countries: arCountries,
    states: arStates,
    step1: arStep1,
    step2: arStep2,
    step3: arStep3,
  },
};

export const namespaces = ['common', 'countries', 'states', 'step1', 'step2', 'step3'] as const;

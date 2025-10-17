// lib/i18n/locales.ts

import { LANGUAGES, TRANSLATION_NAMESPACES } from '@lib/constants';

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
  [LANGUAGES.ENGLISH]: {
    [TRANSLATION_NAMESPACES.COMMON]: enCommon,
    [TRANSLATION_NAMESPACES.COUNTRIES]: enCountries,
    [TRANSLATION_NAMESPACES.STATES]: enStates,
    [TRANSLATION_NAMESPACES.STEP1]: enStep1,
    [TRANSLATION_NAMESPACES.STEP2]: enStep2,
    [TRANSLATION_NAMESPACES.STEP3]: enStep3,
  },
  [LANGUAGES.ARABIC]: {
    [TRANSLATION_NAMESPACES.COMMON]: arCommon,
    [TRANSLATION_NAMESPACES.COUNTRIES]: arCountries,
    [TRANSLATION_NAMESPACES.STATES]: arStates,
    [TRANSLATION_NAMESPACES.STEP1]: arStep1,
    [TRANSLATION_NAMESPACES.STEP2]: arStep2,
    [TRANSLATION_NAMESPACES.STEP3]: arStep3,
  },
};

export const namespaces = [
  TRANSLATION_NAMESPACES.COMMON,
  TRANSLATION_NAMESPACES.COUNTRIES,
  TRANSLATION_NAMESPACES.STATES,
  TRANSLATION_NAMESPACES.STEP1,
  TRANSLATION_NAMESPACES.STEP2,
  TRANSLATION_NAMESPACES.STEP3,
] as const;

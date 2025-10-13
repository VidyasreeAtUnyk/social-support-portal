import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { locales, namespaces } from './locales';

// Detect browser language
const browserLng = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
const supportedLanguages = Object.keys(locales);
const initialLng = supportedLanguages.includes(browserLng) ? browserLng : 'en';

i18n.use(initReactI18next).init({
  lng: initialLng,
  fallbackLng: 'en',
  debug: true,
  ns: namespaces,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  resources: locales,
});

export default i18n;

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { locales, namespaces } from './locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // remove lng: initialLng
    fallbackLng: 'en',
    debug: false,
    ns: namespaces,
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    resources: locales,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

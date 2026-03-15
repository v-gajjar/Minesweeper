// i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as enCommon from './locales/en/common.json';
import * as deCommon from './locales/de/common.json';

export const defaultNS = 'common'; // Default name space
const browserLang = navigator.language.split('-')[0];

i18next
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    debug: true, // Enable debug mode (optional)
    resources: {
      en: { common: enCommon },
      de: { common: deCommon },
  },
});

export default i18next;
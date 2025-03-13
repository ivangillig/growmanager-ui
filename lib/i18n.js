import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";


const loadPath = `/locales/{{lng}}/{{ns}}.json`;

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    preload: ['es'],
    load: 'languageOnly',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      useSuspense: false,
    },

    backend: {
      loadPath,
    }
  });

export default i18n;
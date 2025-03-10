import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { i18n } from '../next-i18next.config'

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    ...i18n,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
  })

export default i18next
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from 'locales/en.json'
import detector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: translationEN
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '../../locales/en/translation.json'
import th from '../../locales/th/translation.json'
import {getCookie} from "../../core/contexts/cookieHandler"

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: getCookie('is_thai_language')==='true' ? "th" : "en",
  debug: process.env.NODE_ENV === "development",
  resources: {
    th: { common: th },
    en: { common: en },
  },
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  },
  defaultNS: 'common',
})

export default i18n
import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next, useTranslation } from "react-i18next"
import en from "../../locales/en/translation.json"
import th from "../../locales/th/translation.json"
import { getCookie } from "../../core/contexts/cookieHandler"
import { client } from "../../axiosConfig"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: getCookie("is_thai_language") === "true" ? "th" : "en",
    debug: process.env.NODE_ENV === "development",
    resources: {
      th: { common: th },
      en: { common: en },
    },
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "common",
  })

type Language = "th" | "en"

export const useLanguge = () => {
  const { i18n } = useTranslation()
  const language = i18n.language as Language

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    client.put("users/changeLanguage", { is_thai_language: lang === "th" }).catch((err) => {
      console.log(err.response.message)
    })
  }

  return { language, changeLanguage }
}

export default i18n

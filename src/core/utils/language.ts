import { useTranslation } from "react-i18next"

export type Language = "th" | "en"

export const useLanguage = () => {
  const { i18n } = useTranslation()
  return i18n.language as "th" | "en"
}

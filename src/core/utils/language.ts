import { useTranslation } from "react-i18next"

export type Language = "th" | "en"
export type nameLanguage = "name_th" | "name_en"
export type surnameLanguage = "surname_th" | "surname_en"

export const useLanguage = () => {
  const { i18n } = useTranslation()
  return i18n.language as "th" | "en"
}

export const useNameLanguage = (type: "surname" | "name") => {
  const { i18n } = useTranslation()
  if (type === "name") return ("name_" + i18n.language) as "name_th" | "name_en"
  else return ("surname_" + i18n.language) as "surname_th" | "surname_en"
}

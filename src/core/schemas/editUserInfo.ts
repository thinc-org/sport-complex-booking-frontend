import * as yup from 'yup'
import i18n from '../i18n/i18n'

export const infoSchema = yup.object().shape({
  phone: yup.string().required(i18n.t("phoneErrorMessage")),
  personal_email: yup.string().required(i18n.t("emailErrorMessage")).email(i18n.t("emailErrorMessage")),
})

export const otherInfoSchema = yup.object().shape({
  name_th: yup.string().required(i18n.t("fieldIsRequired")),
  surname_th: yup.string().required(i18n.t("fieldIsRequired")),
  name_en: yup.string().required(i18n.t("fieldIsRequired")),
  surname_en: yup.string().required(i18n.t("fieldIsRequired")),
  national_id: yup.string().required(i18n.t("fieldIsRequired")),
  marital_status: yup.string().required(i18n.t("fieldIsRequired")),
  address: yup.string().required(i18n.t("fieldIsRequired")),
  personal_email: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  home_phone: yup.string().required(i18n.t("fieldIsRequired")),
  phone: yup.string().required(i18n.t("fieldIsRequired")),
  medical_condition: yup.string(),
  contact_person: yup.object({
    contact_person_name: yup.string().required(i18n.t("fieldIsRequired")),
    contact_person_surname: yup.string().required(i18n.t("fieldIsRequired")),
    contact_person_home_phone: yup.string().required(i18n.t("fieldIsRequired")),
    contact_person_phone: yup.string().required(i18n.t("fieldIsRequired")),
  })
})
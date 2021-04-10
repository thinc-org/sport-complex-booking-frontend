import * as yup from "yup"
import i18n from "../i18n/i18n"

export const phoneValidation = (requiredMessage: string, errorMessage: string) =>
  yup
    .string()
    .required(requiredMessage)
    .matches(/^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/, errorMessage)

export const homePhoneValidation = (requiredMessage: string, errorMessage: string) =>
  yup
    .string()
    .required(requiredMessage)
    .matches(/^(((\d{2}|\d{3})-?\d{3}-?\d{4})|(-))$/, errorMessage)

export const requiredValidation = (requiredMessage: string) => yup.string().required(requiredMessage)

export const emailSchema = yup.object().shape({
  username: yup.string().required(i18n.t("emailErrorMessage")).email(i18n.t("emailErrorMessage")),
  phone: yup
    .string()
    .required("หมายเลขโทรศัพท์ไม่ถูกต้อง")
    .matches(/^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/, "หมายเลขโทรศัพท์ไม่ถูกต้อง"),
})

export const infoSchema = yup.object().shape({
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  personal_email: yup.string().required(i18n.t("emailErrorMessage")).email(i18n.t("emailErrorMessage")),
})

export const infoWithAddressSchema = yup.object().shape({
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  personal_email: yup.string().required(i18n.t("emailErrorMessage")).email(i18n.t("emailErrorMessage")),
  address: requiredValidation(i18n.t("fieldIsRequired")),
})

export const editInfoSchema = yup.object().shape({
  name_th: requiredValidation(i18n.t("fieldIsRequired")),
  surname_th: requiredValidation(i18n.t("fieldIsRequired")),
  name_en: requiredValidation(i18n.t("fieldIsRequired")),
  surname_en: requiredValidation(i18n.t("fieldIsRequired")),
  national_id: requiredValidation(i18n.t("fieldIsRequired")),
  address: requiredValidation(i18n.t("fieldIsRequired")),
  personal_email: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  home_phone: homePhoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  medical_condition: yup.string(),
  contact_person_name: requiredValidation(i18n.t("fieldIsRequired")),
  contact_person_surname: requiredValidation(i18n.t("fieldIsRequired")),
  contact_person_home_phone: homePhoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  contact_person_phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
})

export const otherInfoSchema = yup.object().shape({
  name_th: requiredValidation(i18n.t("fieldIsRequired")),
  surname_th: requiredValidation(i18n.t("fieldIsRequired")),
  name_en: requiredValidation(i18n.t("fieldIsRequired")),
  surname_en: requiredValidation(i18n.t("fieldIsRequired")),
  national_id: requiredValidation(i18n.t("fieldIsRequired")),
  marital_status: requiredValidation(i18n.t("fieldIsRequired")),
  address: requiredValidation(i18n.t("fieldIsRequired")),
  personal_email: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  home_phone: homePhoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  medical_condition: yup.string(),
  contact_person: yup.object({
    contact_person_name: requiredValidation(i18n.t("fieldIsRequired")),
    contact_person_surname: requiredValidation(i18n.t("fieldIsRequired")),
    contact_person_home_phone: homePhoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
    contact_person_phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  }),
})

export const satitInfoSchema = yup.object().shape({
  name_th: requiredValidation(i18n.t("fieldIsRequired")),
  surname_th: requiredValidation(i18n.t("fieldIsRequired")),
  name_en: requiredValidation(i18n.t("fieldIsRequired")),
  surname_en: requiredValidation(i18n.t("fieldIsRequired")),
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
})

import * as yup from "yup"
import i18n from "../i18n/i18n"
import { requiredValidation, phoneValidation } from "./editUserInfo"

export const registrationSchema = yup.object().shape({
  username: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  password: yup.string().required(i18n.t("enterNewPass")),
  repeat_password: yup
    .string()
    .required(i18n.t("enterNewPass"))
    .oneOf([yup.ref("password"), null], i18n.t("passMustMatch")),
})

export const satitRegistrationSchema = yup.object().shape({
  name_th: requiredValidation(i18n.t("fieldIsRequired")),
  surname_th: requiredValidation(i18n.t("fieldIsRequired")),
  name_en: requiredValidation(i18n.t("fieldIsRequired")),
  surname_en: requiredValidation(i18n.t("fieldIsRequired")),
  phone: phoneValidation(i18n.t("phoneErrorMessage"), i18n.t("invalidPhoneNum")),
  username: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  password: yup.string().required(i18n.t("enterNewPass")),
  repeat_password: yup
    .string()
    .required(i18n.t("enterNewPass"))
    .oneOf([yup.ref("password"), null], i18n.t("passMustMatch")),
})

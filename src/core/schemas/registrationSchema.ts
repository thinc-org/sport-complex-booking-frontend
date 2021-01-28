import * as yup from "yup"
import i18n from "../i18n/i18n"

export const registrationSchema = yup.object().shape({
  username: yup.string().required(i18n.t("fieldIsRequired")).email(i18n.t("emailErrorMessage")),
  password: yup.string().required(i18n.t("enterNewPass")),
  repeat_password: yup
    .string()
    .required(i18n.t("enterNewPass"))
    .oneOf([yup.ref("password"), null], i18n.t("passMustMatch")),
})

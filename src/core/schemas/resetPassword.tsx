import * as yup from "yup"
import i18n from "../i18n/i18n"

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(i18n.t("enterOldPass")),
  newPassword: yup
    .string()
    .required(i18n.t("enterNewPass"))
    .notOneOf([yup.ref("oldPassword"), null], i18n.t("oldNewPassMustDiff"))
    .oneOf([yup.ref("repeatNewPassword"), null], i18n.t("passMustMatch")),
  repeatNewPassword: yup
    .string()
    .required(i18n.t("enterNewPass"))
    .oneOf([yup.ref("newPassword"), null], i18n.t("passMustMatch")),
})

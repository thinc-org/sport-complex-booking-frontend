import * as yup from 'yup'
import i18n from '../i18n/i18n'

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(i18n.t("enterOldPass")),
  newPassword: yup.string().required(i18n.t("enterNewPass")).min(6, i18n.t("containMoreThan6")),
  repeatNewPassword: yup.string().required(i18n.t("enterNewPass")).min(6, i18n.t("containMoreThan6")).oneOf([yup.ref('newPassword'), null], i18n.t("passMustMatch"))
})

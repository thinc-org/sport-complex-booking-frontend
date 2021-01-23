import React from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useTranslation } from "react-i18next"
import { ErrorMsgBannerProps, ErrorMessageBannerProps } from "../../../dto/waitingRoom.dto"

export const ErrorMsgBanner: React.FC<ErrorMsgBannerProps> = ({ errorMsg, type }) => {
  const { t } = useTranslation()
  return (
    <div className="my-3">
      <div className={`alert alert-${type}  mx-auto`}>
        <h4>{t("warning")}</h4>
        <h6>{errorMsg}</h6>
      </div>
    </div>
  )
}

export const CheckValidityErrorMsg: React.FC<ErrorMessageBannerProps> = ({ show, reason, type }) => {
  const { t } = useTranslation()
  if (!show) return null
  switch (reason) {
    case "USER_NOT_FOUND":
      return <ErrorMsgBanner errorMsg={t("idDoesNotExist")} type={type} />
    case "NOT_VERIFIED":
      return <ErrorMsgBanner errorMsg={t("accountHasToVerify")} type={type} />
    case "ACCOUNT_EXPIRED":
      return <ErrorMsgBanner errorMsg={t("alreadyExpired")} type={type} />
    case "INFO_NOT_FILLED":
      return <ErrorMsgBanner errorMsg={t("haveToFillInfo")} type={type} />
    case "BANNED":
      return <ErrorMsgBanner errorMsg={t("accountBanned")} type={type} />
    case "DUPLICATE_ROOM":
      return <ErrorMsgBanner errorMsg={t("alreadyHaveWaitingRoom")} type={type} />
    default:
      return <ErrorMsgBanner errorMsg={t("errorOccured")} type={type} />
  }
}

export const CreateWaitingRoomErrorMsg: React.FC<ErrorMessageBannerProps> = ({ show, reason, type }) => {
  const { t } = useTranslation()
  if (!show) return null
  switch (reason) {
    case "UNAVAILABLE":
      return <ErrorMsgBanner errorMsg={t("chosenTimeUnavailable")} type={type} />
    case "COURT_NOT_FOUND":
      return <ErrorMsgBanner errorMsg={t("courtDoesNotExist")} type={type} />
    case "SPORT_NOT_FOUND":
      return <ErrorMsgBanner errorMsg={t("idDoesNotExist.")} type={type} />
    case "TIME_NOT_CONSECUTIVE":
      return <ErrorMsgBanner errorMsg={t("chosenTimeUnavailable")} type={type} />
    case "NOT_ENOUGH_QUOTA":
      return <ErrorMsgBanner errorMsg={t("notEnoughQuota.")} type={type} />
    case "SLOT_UNAVAILABLE":
      return <ErrorMsgBanner errorMsg={t("errorOccured.")} type={type} />
    case "INVALID_DATE":
      return <ErrorMsgBanner errorMsg={t("chosenTimeUnavailable")} type={type} />
    default:
      return <ErrorMsgBanner errorMsg={t("errorOccured")} type={type} />
  }
}

export const JoinWaitingRoomErrorMsg: React.FC<ErrorMessageBannerProps> = ({ show, reason, type }) => {
  const { t } = useTranslation()
  if (!show) return null
  switch (reason) {
    case "WRONG_CODE":
      return <ErrorMsgBanner errorMsg={t("codeIsWrong")} type={type} />
    case "NOT_ENOUGH_QUOTA":
      return <ErrorMsgBanner errorMsg={t("notEnoughQuota")} type={type} />
    default:
      return <ErrorMsgBanner errorMsg={t("errorOccured")} type={type} />
  }
}

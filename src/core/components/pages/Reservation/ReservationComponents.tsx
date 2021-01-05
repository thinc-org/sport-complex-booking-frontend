import React from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useTranslation } from "react-i18next"

export interface ErrorMsgBannerProps {
  errorMsg: string
  type: string
}

export const ErrorMsgBanner:React.FC<ErrorMsgBannerProps> = ({errorMsg, type}) => {
  const {t} = useTranslation()
  return (
    <div className="mx-3 my-3">
      <div className={`alert alert-${type} col-md-6 mx-auto`}>
        <h4>{t("warning")}</h4>
        <h6>{errorMsg}</h6>
      </div>
    </div>
  )
}

export interface ErrorMessageBannerProps {
  show: boolean
  statusCode: number
  type: string
}

export const CheckValidityErrorMsg:React.FC<ErrorMessageBannerProps> = ({show, statusCode, type}) => {
  const {t} = useTranslation()
  if (!show) return null
  switch(statusCode) {
    case 404:
      return(<ErrorMsgBanner errorMsg={t("idDoesNotExist")} type={type} />)
    case 401:
      return(<ErrorMsgBanner errorMsg={t("accountHasToVerify")} type={type} />)
    case 402:
      return(<ErrorMsgBanner errorMsg={t("alreadyExpired")} type={type} />)
    case 406:
      return(<ErrorMsgBanner errorMsg={t("haveToFillInfo")} type={type} />)
    case 403:
      return(<ErrorMsgBanner errorMsg={t("accountBanned")} type={type} />)
    case 409:
      return(<ErrorMsgBanner errorMsg={t("alreadyHaveWaitingRoom")} type={type} />)
    default: 
      return(<ErrorMsgBanner errorMsg={t("errorOccured")}  type={type} />)
  }
}

export const CreateWaitingRoomErrorMsg:React.FC<ErrorMessageBannerProps> = ({show, statusCode, type}) => {
  const {t} = useTranslation()
  if (!show) return null
  switch(statusCode) {
    case 401:
      return(<ErrorMsgBanner errorMsg={t("chosenTimeUnavailable")} type={type} />)
    case 410:
      return(<ErrorMsgBanner errorMsg={t("courtDoesNotExist")} type={type} />)
    case 404:
      return(<ErrorMsgBanner errorMsg={t("idDoesNotExist.")} type={type} />)
    default: 
      return(<ErrorMsgBanner errorMsg={t("errorOccured")}  type={type} />)
  }
}

export const JoinWaitingRoomErrorMsg:React.FC<ErrorMessageBannerProps> = ({show, statusCode, type}) => {
  const {t} = useTranslation()
  if (!show) return null
  switch(statusCode) {
    case 400:
      return(<ErrorMsgBanner errorMsg={t("codeIsWrong")} type={type} />)
    case 401:
      return(<ErrorMsgBanner errorMsg={t("notEnoughQuota")} type={type} />)
    default: 
      return(<ErrorMsgBanner errorMsg={t("errorOccured")}  type={type} />)
  }
}

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

export interface CreateWaitingRoomErrorMsg {
  show: boolean
  errorRes: string
  type: string
}

export const CreateWaitingRoomErrorMsg:React.FC<CreateWaitingRoomErrorMsg> = ({show, errorRes, type}) => {
  const {t} = useTranslation()
  if (!show) return null
  switch(errorRes) {
    case "This Id does not exist":
      return(<ErrorMsgBanner errorMsg={t("idDoesNotExist")} type={type} />)
    case "This Id does not exist.":
      return(<ErrorMsgBanner errorMsg={t("idDoesNotExist.")} type={type} />)
    case "Your account has to verify first":
      return(<ErrorMsgBanner errorMsg={t("accountHasToVerify")} type={type} />)
    case "Your account has already expired, please contact staff":
      return(<ErrorMsgBanner errorMsg={t("alreadyExpired")} type={type} />)
    case "You have to fill your info first":
      return(<ErrorMsgBanner errorMsg={t("haveToFillInfo")} type={type} />)
    case "Your account has been banned, please contact staff":
      return(<ErrorMsgBanner errorMsg={t("accountBanned")} type={type} />)
    case "You already have a waiting room":
      return(<ErrorMsgBanner errorMsg={t("alreadyHaveWaitingRoom")} type={type} />)
    case "The code is wrong":
      return(<ErrorMsgBanner errorMsg={t("codeIsWrong")} type={type} />)
    case "You do not have enough quotas":
      return(<ErrorMsgBanner errorMsg={t("notEnoughQuota")} type={type} />)
    case "This court does not exist":
      return(<ErrorMsgBanner errorMsg={t("courtDoesNotExist")} type={type} />)
    default: 
      return(<ErrorMsgBanner errorMsg={t("error")}  type={type} />)
  }
}
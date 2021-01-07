import React from "react"
import "react-datepicker/dist/react-datepicker.css"
import i18n from '../../../i18n/i18n'

export interface ErrorMsgBannerProps {
  errorMsg: string
  type: string
}

export const ErrorMsgBanner:React.FC<ErrorMsgBannerProps> = ({errorMsg, type}) => {
  return (
    <div className="mx-3 my-3">
      <div className={`alert alert-${type} col-md-6 mx-auto`}>
        <h4>{i18n.t("warning")}</h4>
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
  if (!show) return null
  switch(errorRes) {
    case "This Id does not exist":
      return(<ErrorMsgBanner errorMsg={i18n.t("idDoesNotExist")} type={type} />)
    case "This Id does not exist.":
      return(<ErrorMsgBanner errorMsg={i18n.t("idDoesNotExist.")} type={type} />)
    case "Your account has to verify first":
      return(<ErrorMsgBanner errorMsg={i18n.t("accountHasToVerify")} type={type} />)
    case "Your account has already expired, please contact staff":
      return(<ErrorMsgBanner errorMsg={i18n.t("alreadyExpired")} type={type} />)
    case "You have to fill your info first":
      return(<ErrorMsgBanner errorMsg={i18n.t("haveToFillInfo")} type={type} />)
    case "Your account has been banned, please contact staff":
      return(<ErrorMsgBanner errorMsg={i18n.t("accountBanned")} type={type} />)
    case "You already have a waiting room":
      return(<ErrorMsgBanner errorMsg={i18n.t("alreadyHaveWaitingRoom")} type={type} />)
    case "The code is wrong":
      return(<ErrorMsgBanner errorMsg={i18n.t("codeIsWrong")} type={type} />)
    case "You do not have enough quotas":
      return(<ErrorMsgBanner errorMsg={i18n.t("notEnoughQuota")} type={type} />)
    case "This court does not exist":
      return(<ErrorMsgBanner errorMsg={i18n.t("courtDoesNotExist")} type={type} />)
    default: 
      return(<ErrorMsgBanner errorMsg={i18n.t("error")}  type={type} />)
  }
}
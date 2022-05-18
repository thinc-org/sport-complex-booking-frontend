import React, { useState, useCallback, useEffect } from "react"
import QRCode from "qrcode.react"
import { useTranslation } from "react-i18next"
import { QRCodeProps } from "./PropsInterface"
import { TWO_HOURS_MILLISECOND } from "../../../../../constant"

export const QrCode: React.FC<QRCodeProps> = ({ isCheck, id, validTime, setValidTime, reservedTimeInMillisecond }) => {
  const { t } = useTranslation()

  const [counter, setCounter] = useState<number>(40)
  const [allowCheckin, setAllowCheckin] = useState<boolean>(false)

  const countDown = useCallback(() => {
    if (!isCheck) {
      setTimeout(function () {
        if (counter) {
          setCounter(counter - 1)
        } else if (counter === 0) {
          setValidTime(new Date().getTime() + 10000)
          setCounter(40)
        }
      }, 1000)
    }
  }, [counter, isCheck, setValidTime])

  useEffect(() => {
    if (!isCheck) {
      countDown()
    }
  }, [isCheck, countDown])

  useEffect(() => {
    const currentTimeInMillisecond = new Date().getTime()
    if (reservedTimeInMillisecond)
      reservedTimeInMillisecond - currentTimeInMillisecond > TWO_HOURS_MILLISECOND ? setAllowCheckin(false) : setAllowCheckin(true)
  }, [reservedTimeInMillisecond])

  if (isCheck) {
    return (
      <div className="box-container w-100 mb-5" style={{ textAlign: "center" }}>
        <h4 className="m-2" style={{ color: "lightgreen" }}>
          {t("youHaveCheckedIn")}
        </h4>
      </div>
    )
  } else if (!allowCheckin) {
    return (
      <div className="box-container w-100 mb-5" style={{ textAlign: "center" }}>
        <h4 className="m-2" style={{ color: "grey" }}>
          {t("checkinNotAllowed")}
        </h4>
      </div>
    )
  }
  if (id && allowCheckin) {
    return (
      <div className="box-container w-100 mb-5" style={{ textAlign: "center" }}>
        <h6 className="mt-2 mb-0" style={{ fontWeight: 400 }}>
          {t("qrcodeInvalid")}{" "}
        </h6>
        <div style={{ fontSize: "18px", fontWeight: 400 }}> 00:{counter >= 10 ? counter : "0" + counter} </div>
        <QRCode className="mb-4 mt-3" value={validTime + "/" + id} renderAs="svg" size={128} fgColor="#333" bgColor="#fff" />

        <h5 className="mb-2" style={{ fontWeight: 400 }}>
          {t("showQRToStaff")}
        </h5>
      </div>
    )
  }
  return <div> </div>
}

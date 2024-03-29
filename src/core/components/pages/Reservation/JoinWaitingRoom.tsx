import React, { useState, useEffect, useCallback } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { useTranslation } from "react-i18next"
import { client } from "../../../../axiosConfig"
import { CustomWaitingRoomModal } from "../../ui/Modals/WaitingRoomModals"
import { WaitingRoomAccessCode, ValidityMessage } from "../../../dto/waitingRoom.dto"
import { CheckValidityErrorMsg, JoinWaitingRoomErrorMsg } from "./ReservationComponents"

function JoinWaitingRoom() {
  const { register, handleSubmit, errors } = useForm()
  const { t } = useTranslation()
  const history = useHistory()
  const [showWrongAccessCodeModal, setShowWrongAccessCodeModal] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")
  const [showValidityWarningMessage, setShowValidityWarningMessage] = useState(false)
  const [showJoinWarningMessage, setShowJoinWarningMessage] = useState(false)
  const [invalidAccount, setInvalidAccount] = useState(true)
  const [errorType, setErrorType] = useState("danger")

  const onSubmit = (data: WaitingRoomAccessCode) => {
    client
      .post<WaitingRoomAccessCode>("/reservation/joinwaitingroom", data)
      .then(({ data }) => {
        if (data.isReservationCreated) {
          history.push({ pathname: "/hooray", state: { fromJoinWaitingRoom: true } })
        } else {
          history.push("/waitingroom")
        }
      })
      .catch((error) => {
        setShowWrongAccessCodeModal(true)
        if (error.response) {
          setErrorType("warning")
          setWarningMessage(error.response.data.reason)
          setShowJoinWarningMessage(true)
        }
      })
  }

  const fetchValidity = useCallback(() => {
    client
      .post<ValidityMessage>("/reservation/checkvalidity")
      .then(({ data }) => {
        setInvalidAccount(false)
        setErrorType("warning")
        const resMsg = data["message"]
        if (resMsg !== "Valid user") {
          const state = { msg: resMsg }
          history.push({ pathname: "/banned", state })
        }
      })
      .catch((error) => {
        setInvalidAccount(true)
        if (error.response) {
          setWarningMessage(error.response.data.reason)
          setShowValidityWarningMessage(true)
        }
      })
  }, [history])

  useEffect(() => {
    fetchValidity()
  }, [fetchValidity])

  return (
    <div className="unselectable">
      <CheckValidityErrorMsg show={showValidityWarningMessage} reason={warningMessage} type={errorType} />
      <JoinWaitingRoomErrorMsg show={showJoinWarningMessage} reason={warningMessage} type={errorType} />
      <div className="mx-auto higher">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="default-mobile-wrapper mt-4 animated-card">
            <span className="row">
              <h6 className="mx-3 mt-1 font-weight-bold">{t("waitingRoomPassword")}</h6>
            </span>
            <p className="font-weight-light">{t("waitingRoomHelp")}</p>
            <div className="mt-2">
              <input
                name="access_code"
                type="text"
                disabled={invalidAccount}
                ref={register({
                  required: t("enterCode").toString(),
                  pattern: {
                    value: /^[A-Z0-9._%+-]/i,
                    message: t("enterCode"),
                  },
                })}
                placeholder="xxxxxx"
                className="form-control"
              />
              {errors.access_code && (
                <p id="input-error" className="mb-0 pb-0 mt-1">
                  {errors.access_code.message}
                </p>
              )}
              <div className="button-group mt-2">
                <Button variant="pink" type="submit" className="mb-0 mt-3" disabled={invalidAccount}>
                  {t("joinWaitingRoom")}
                </Button>
              </div>
            </div>
          </div>
          <br />
        </form>
      </div>
      {/* Wrong Access Code Modal */}
      <CustomWaitingRoomModal type="wrongAccessCodeModal" show={showWrongAccessCodeModal} setShow={setShowWrongAccessCodeModal} />
    </div>
  )
}

export default withUserGuard(JoinWaitingRoom)

import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Other } from "../../../contexts/UsersContext"
import { useExtensionReminder } from "../../pages/AccountPages/Payment/PaymentReminder"
import { CheckValidityErrorMsg } from "../../pages/Reservation/ReservationComponents"

export interface EdittedData {
  personal_email: string
  phone: string
}

interface CustomAccountModalProps {
  type:
    | "confirmEditAccountModal"
    | "confirmEditOtherAccountModal"
    | "editAccountErrorModal"
    | "registrationSuccessModal"
    | "registrationErrorModal"
    | "paymentSuccessModal"
    | "paymentErrorModal"
    | "repeatedUsernameErrorModal"
    | "fileUploadError"
  show: boolean
  setShow: (value: boolean) => void
  mainFunction?: (data: Other) => void
  data?: EdittedData
  click?: () => void
}

export const CustomAccountModal: React.FC<CustomAccountModalProps> = ({ type, show, setShow, mainFunction, data, click }) => {
  const { t } = useTranslation()
  const message: {
    title: string
    body: string
  } = t(type, { returnObjects: true })
  if (!show) return null
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{message.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{message.body}</Modal.Body>
      <Modal.Footer>
        {data && mainFunction && (
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShow(false)
              mainFunction(data as Other)
            }}
          >
            {t("ok")}
          </Button>
        )}
        {click && (
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShow(false)
              click()
            }}
          >
            {t("ok")}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export interface ErrorModalProps {
  showErr?: boolean
  setShowErr(show: boolean): void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ showErr, setShowErr }) => {
  const { t } = useTranslation()
  if (!showErr) return null
  return (
    <Modal
      show={showErr}
      onHide={() => {
        setShowErr(false)
      }}
      backdrop="static"
      keyboard={false}
      classname="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("errorOccured")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> {t("cannotEditInfo")} </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowErr(false)
          }}
        >
          {t("ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export interface WarningMessageProps {
  show: boolean
  verification_status?: string
  account: string
}

interface WarningAlertProps {
  title: string
  message?: string
  category: string
}

const WarningAlert: React.FC<WarningAlertProps> = ({ title, message, category }) => {
  return (
    <div className={`alert alert-${category} mt-3`} role="alert">
      <h3>{title}</h3>
      <h6>{message}</h6>
    </div>
  )
}

export const WarningMessage: React.FC<WarningMessageProps> = ({ show, verification_status, account }) => {
  const { t } = useTranslation()
  const { isExpired } = useExtensionReminder()
  if (!show) return null
  if (account === "CuStudent") {
    return <CheckValidityErrorMsg show={true} reason="INFO_NOT_FILLED" type="danger" />
  }
  if ((account === "Other" || account === "SatitAndCuPersonel") && isExpired()) {
    return <WarningAlert title={t("accountExpiredTitle")} message={t("accountExpiredMessage")} category="danger" />
  }
  switch (verification_status) {
    case "NotSubmitted": {
      return <WarningAlert title={t("warning")} message={t("notSubmittedMessage")} category="warning" />
    }
    case "Rejected": {
      return <WarningAlert title={t("rejectedTitle")} message={t("rejectedMessage")} category="danger" />
    }
    case "Submitted": {
      return <WarningAlert title={t("submittedTitle")} message={t("submittedMessage")} category="info" />
    }
    case "Verified": {
      return <WarningAlert title={t("approvedTitle")} category="success" />
    }
    default: {
      return null
    }
  }
}

import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Other } from "../../../contexts/UsersContext"

export interface EdittedData {
  personal_email: string
  phone: string
}

interface CustomAccountModalProps {
  type: "confirmEditAccountModal" | "confirmEditOtherAccountModal" | "editAccountErrorModal"
  show: boolean
  setShow: (value: boolean) => void
  mainFunction?: (data: Other) => Promise<void> //(data: EdittedData) => Promise<void> | ((data: EdittedData) => void)
  data?: EdittedData
}

export const CustomAccountModal: React.FC<CustomAccountModalProps> = ({ type, show, setShow, mainFunction, data }) => {
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
        <Button
          className="btn-normal btn-secondary"
          onClick={() => {
            setShow(false)
          }}
        >
          {t("cancel")}
        </Button>
        {data && mainFunction && (
          <Button variant="pink" className="btn-normal" onClick={() => mainFunction(data as Other)}>
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
  message: string
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
  if (!show) return null
  if (account === "CuStudent") {
    return <WarningAlert title={t("warning")} message={t("pleaseSubmitRegisForm")} category="warning" />
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
      return <WarningAlert title={t("approvedTitle")} message={t("approvedMessage")} category="success" />
    }
    default: {
      return null
    }
  }
}

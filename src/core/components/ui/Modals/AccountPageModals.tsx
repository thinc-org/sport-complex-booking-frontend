import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from 'react-i18next'



export interface ConfirmModalProps {
  show?: boolean,
  setShow(show: boolean): void,
  handleSubmit(onSubmit: (data: EdittedData) => void),
  onSubmit(data: EdittedData): void
}

interface EdittedData {
  personal_email: String,
  phone: String,
  is_thai_language: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, setShow, handleSubmit, onSubmit }) => {
  const { t } = useTranslation()
  if (!show) return null
  return (
    <Modal className="modal" show={show} onHide={() => setShow(false)}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="confirmModalLabel">
            {t("confirm_submit")}
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {t("confirm_submit_msg")}
        </div>
        <div className="modal-footer">

          <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal" data-dismiss="modal">
            {t("cancel")}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="pink" className="btn-normal">
            {t("save_and_submit")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}


export interface ErrorModalProps {
  showErr?: boolean,
  setShowErr(show: boolean): void,
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
        <Modal.Title>{t("error_occured")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> {t("cannot_edit_info")} </Modal.Body>
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

interface WarningMessageProps {
  show: boolean,
  is_thai_language: boolean
}

export const WarningMessage: React.FC<WarningMessageProps> = ({ show }) => {
  const { t } = useTranslation()
  if (!show) return null
  return (
    <div className="alert alert-danger  mt-3" role="alert">
      <h3>{t("warning")}</h3>
      <h6>{t("please_submit_regis_form")}</h6>
    </div>
  )
}


export interface OtherWarningMessageProps {
  show: boolean,
  verification_status: string
}

export const OtherWarningMessage: React.FC<OtherWarningMessageProps> = ({ show, verification_status }) => {
  const { t } = useTranslation()
  if (!show) return null
  switch (verification_status) {
    case "NotSubmitted": {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{t("warning")}</h3>
          <h6>{t("not_submitted_message")}</h6>
        </div>
      )
    }
    case "Rejected": {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{t("rejected_title")}</h3>
          <h6>{t("rejected_message")}</h6>
        </div>
      )
    }
    case "Submitted": {
      return (
        <div className="alert alert-info  mt-3" role="alert">
          <h3>{t("submitted_title")}</h3>
          <h6>{t("submitted_message")}</h6>
        </div>
      )
    }
    case "Approved": {
      return (
        <div className="alert alert-info mt-3" role="alert">
          <h3>{t("approved_title")}</h3>
          <h6>
            {t("approved_message")}
          </h6>
        </div>
      )
    }
    default: {
      return <div></div>
    }
  }
}



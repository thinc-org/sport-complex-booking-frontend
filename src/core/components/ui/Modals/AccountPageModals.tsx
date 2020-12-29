import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from 'react-i18next'



export interface ConfirmModalProps {
  show?: boolean,
  setShow(show: boolean): void,
  postDataToBackend: (data)=>void,
  formData?: EdittedData
}

export interface EdittedData {
  personal_email: string,
  phone: string,
}

export const ConfirmModal:React.FC<ConfirmModalProps> = ({show, setShow, postDataToBackend, formData}) => {
    const {t} = useTranslation()  
   if(!show) return null
   return (
    <Modal  className="modal" show={show} onHide={() => setShow(false)}>
      <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">
              {t("confirmSubmit")}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {t("confirmSubmitMsg")}
          </div>
          <div className="modal-footer">

            <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal" data-dismiss="modal">
              {t("cancel")}
            </Button>
            <Button onClick={()=>postDataToBackend(formData)} variant="pink" className="btn-normal">
              {t("saveAndSubmit")}
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

export const ErrorModal:React.FC<ErrorModalProps> = ({showErr, setShowErr}) => {
    const {t} = useTranslation()  
   if(!showErr) return null
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

interface WarningMessageProps {
  show: boolean
}

export const WarningMessage:React.FC<WarningMessageProps> = ({show}) => {
  const {t} = useTranslation() 
  if(!show) return null
   return (
    <div className="alert alert-danger  mt-3" role="alert">
      <h3>{t("warning")}</h3>
      <h6>{t("pleaseSubmitRegisForm")}</h6>
    </div>
   )
}


export interface OtherWarningMessageProps {
  show: boolean,
  verification_status: string
}

export const OtherWarningMessage:React.FC<OtherWarningMessageProps> = ({show, verification_status}) => {
  const {t} = useTranslation() 
  if(!show) return null
  switch (verification_status) {
    case "NotSubmitted": {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{t("warning")}</h3>
          <h6>{t("notSubmittedMessage")}</h6>
        </div>
      )
    }
    case "Rejected": {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{t("rejectedTitle")}</h3>
          <h6>{t("rejectedMessage")}</h6>
        </div>
      )
    }
    case "Submitted": {
      return (
        <div className="alert alert-info  mt-3" role="alert">
          <h3>{t("submittedTitle")}</h3>
          <h6>{t("submittedMessage")}</h6>
        </div>
      )
    }
    case "Verified": {
      return (
        <div className="alert alert-info mt-3" role="alert">
          <h3>{t("approvedTitle")}</h3>
          <h6>
            {t("approvedMessage")}
          </h6>
        </div>
      )
    }
    default: {
      return null
    }
  }
}



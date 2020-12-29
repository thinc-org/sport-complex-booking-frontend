import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface PasswordData {
  oldPassword: string,
  newPassword: string,
  repeatNewPassword?: string
}

interface ConfirmationModalProps {
  show?: boolean,
  setShow(show: boolean): void,
  postDataToBackend(passwordData: PasswordData): void,
  passwordData?: PasswordData
}

export const ConfirmationModal:React.FC<ConfirmationModalProps> = ({show, setShow, postDataToBackend, passwordData}) => {
  const { t } = useTranslation() 
  if(!show) return null
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
          <Modal.Title>{t("confirm")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {t("confirmPasswordChange")} </Modal.Body>
        <Modal.Footer>
          <Button className="btn-normal btn-secondary" onClick={() => {setShow(false)}}>
            {t("cancel")}
          </Button>
          <Button variant="pink" className="btn-normal" onClick={()=> postDataToBackend(passwordData!)}>
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}

export interface PasswordMismatchModalProps {
  show?: boolean,
  setShowPasswordMismatch(show: boolean): void
}

export const PasswordMismatchModal:React.FC<PasswordMismatchModalProps> = ({show, setShowPasswordMismatch}) => {
  const { t } = useTranslation()  
  if(!show) return null
   return (
      <Modal
        className="modal"
        show={show}
        onHide={() => {
          setShowPasswordMismatch(false)
        }}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton>
          <Modal.Title>{t("passwordMismatch")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {t("enterAgain")} </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal btn-secondary" onClick={() => {setShowPasswordMismatch(false)}}>
            {t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}

interface PasswordChangeSuccessProps {
  show: boolean
  setShowChangeSuccess: (value: boolean)=> void
  returnToAccountPage: ()=>void
}

export const PasswordChangeSuccess:React.FC<PasswordChangeSuccessProps> = ({show, setShowChangeSuccess, returnToAccountPage}) => {
  const { t } = useTranslation()  
  if(!show) return null
   return (
      <Modal
        className="modal"
        show={show}
        onHide={()=>returnToAccountPage()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("success")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {t("passwordChanged")} </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal btn-secondary" onClick={()=>returnToAccountPage()}>
            {t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}








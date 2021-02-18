import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface PasswordData {
  oldPassword: string
  newPassword: string
  repeatNewPassword?: string
}

interface CustomPasswordModalProps {
  type: "passwordChangeConfirm" | "passwordChangeSuccess" | "passwordChangeError" | "oldPasswordMismatch"
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: PasswordData) => void | void
  data?: PasswordData
  redirect?: () => void
}

export const CustomPasswordModal: React.FC<CustomPasswordModalProps> = ({ type, show, setShow, mainFunction, data, redirect }) => {
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
        {type === "passwordChangeConfirm" && (
          <Button
            className="btn-normal btn-secondary"
            onClick={() => {
              setShow(false)
            }}
          >
            {t("cancel")}
          </Button>
        )}
        <Button variant="pink" className="btn-normal" onClick={() => (data ? mainFunction(data) : redirect ? redirect() : setShow(false))}>
          {t("ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

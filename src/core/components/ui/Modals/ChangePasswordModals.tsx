import React from 'react'
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface PasswordData {
  oldPassword: string,
  newPassword: string,
  repeatNewPassword?: string
}

interface CustomModalProps {
  type: "passwordChangeConfirm" | "passwordChangeSuccess" | "passwordChangeError"
  show: boolean
  setShow: (value: boolean) => void
  mainFunction: (value: PasswordData)=>void | void
  data?: PasswordData
}

export const CustomModal:React.FC<CustomModalProps> = ({type, show, setShow, mainFunction, data}) => {
  const { t } = useTranslation() 
  const message = t(type, { returnObjects: true })
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
        <Modal.Title>{message['title']}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{message['body']}</Modal.Body>
      <Modal.Footer>
        {(type === "passwordChangeConfirm") && <Button className="btn-normal btn-secondary" onClick={() => {setShow(false)}}>
          {t("cancel")}
        </Button>}
        <Button variant="pink" className="btn-normal" onClick={()=> mainFunction(data!)}>
          {t("ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
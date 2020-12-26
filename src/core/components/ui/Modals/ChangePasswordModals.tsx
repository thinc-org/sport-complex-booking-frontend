import React from 'react'
import { Button, Modal } from "react-bootstrap"

export interface PasswordData {
  oldPassword: String,
  newPassword: String
}

interface ConfirmationModalProps {
  show?: boolean,
  is_thai_language: boolean,
  setShow(show: boolean): void,
  postDataToBackend(passwordData: PasswordData): void,
  passwordData?: PasswordData
}

export const ConfirmationModal:React.FC<ConfirmationModalProps> = ({show, is_thai_language, setShow, postDataToBackend, passwordData}) => {
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
          <Modal.Title>{is_thai_language ? "ยืนยัน" : "Confirmation"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {is_thai_language ? "ต้องการยืนยันหารเปลี่ยนรหัสหรือไม่" : "Do you want to confirm password change?"} </Modal.Body>
        <Modal.Footer>
          <Button className="btn-normal btn-secondary" onClick={() => {setShow(false)}}>
            {is_thai_language? "ยกเลิก" : "Cancel"}
          </Button>
          <Button variant="pink" className="btn-normal" onClick={()=> postDataToBackend(passwordData!)}>
            {is_thai_language? "ส่ง" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}

export interface PasswordMismatchModalProps {
  show?: boolean,
  is_thai_language: boolean,
  setShowPasswordMismatch(show: boolean): void
}

export const PasswordMismatchModal:React.FC<PasswordMismatchModalProps> = ({show, is_thai_language, setShowPasswordMismatch}) => {
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
          <Modal.Title>{is_thai_language ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {is_thai_language ? "กรุณากรอกรหัสผ่านใหม่" : "Please enter your new password again"} </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal btn-secondary" onClick={() => {setShowPasswordMismatch(false)}}>
            {is_thai_language? "โอเค" : "Okay"}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}







import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button, Alert } from "react-bootstrap"
import { ModalAddUser, AlertAddUser } from "../interfaces/InfoInterface"

interface ModalProps {
  show: ModalAddUser
  setShow: React.Dispatch<React.SetStateAction<ModalAddUser>>
  requestAdd?: () => void
}

export const AddModal: React.FC<ModalProps> = ({ show, setShow, requestAdd }) => {
  return (
    <Modal
      show={show.showAdd}
      onHide={() => {
        setShow({ ...show, showAdd: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการเพิ่มผู้ใช้หรือไม่ </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShow({ ...show, showAdd: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={requestAdd}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ComModal: React.FC<ModalProps> = ({ show, setShow }) => {
  const history = useHistory()
  return (
    <Modal
      show={show.showCom}
      onHide={() => {
        setShow({ ...show, showCom: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เสร็จสิ้น</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> การเพิ่มผู้ใช้เสร็จสมบูรณ์ </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShow({ ...show, showCom: false })
            history.push("/staff/listOfAllUsers")
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ErrModal: React.FC<ModalProps> = ({ show, setShow }) => {
  return (
    <Modal
      show={show.showErr}
      onHide={() => {
        setShow({ ...show, showErr: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถเพิ่มผู้ใช้ได้ในขณะนี้ </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShow({ ...show, showErr: false })
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const UsernameErrModal: React.FC<ModalProps> = ({ show, setShow }) => {
  return (
    <Modal
      show={show.showUsernameErr}
      onHide={() => {
        setShow({ ...show, showUsernameErr: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> {"ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้ไปแล้ว"} </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShow({ ...show, showUsernameErr: false })
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const AlertUncom: React.FC<{ show: AlertAddUser }> = ({ show }) => {
  return (
    <Alert show={show.showAlertUncom} variant="danger" style={{ fontWeight: "lighter" }}>
      กรุณากรอกรายละเอียดให้ครบ
    </Alert>
  )
}

export const AlertInvalidUsername: React.FC<{ show: AlertAddUser }> = ({ show }) => {
  return (
    <Alert show={show.showAlertUsername} variant="danger" style={{ fontWeight: "lighter" }}>
      ชื่อผู้ใช้ (Username) ต้องมีตัวอักษรอย่างน้อย 1 ตัว
    </Alert>
  )
}

export const AlertErrorPassword: React.FC<{ show: AlertAddUser }> = ({ show }) => {
  return (
    <Alert show={show.showAlertPassword} variant="danger" style={{ fontWeight: "lighter" }}>
      รหัสผ่านไม่ตรงกัน
    </Alert>
  )
}

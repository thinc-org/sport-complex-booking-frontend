import React from "react"
import { useHistory } from "react-router-dom"
import { Alert } from "react-bootstrap"
import { ModalAddUser, AlertAddUser } from "../interfaces/InfoInterface"
import { CustomModal } from "../list-of-all-users-pages/ListOfAllUserModals"

interface ModalProps {
  show: ModalAddUser
  setShow: React.Dispatch<React.SetStateAction<ModalAddUser>>
  requestAdd?: () => void
}

export const AddModal: React.FC<ModalProps> = ({ show, setShow, requestAdd }) => {
  return (
    <CustomModal
      title={"คำเตือน"}
      show={show.showAdd}
      body={"ต้องการเพิ่มผู้ใช้หรือไม่"}
      onCancel={() => {
        setShow({ ...show, showAdd: false })
      }}
      onConfirm={requestAdd ? requestAdd : () => console.log("unavailable")}
    />
  )
}

export const ComModal: React.FC<ModalProps> = ({ show, setShow }) => {
  const history = useHistory()
  return (
    <CustomModal
      title={"เสร็จสิ้น"}
      show={show.showCom}
      body={"การเพิ่มผู้ใช้เสร็จสมบูรณ์"}
      onConfirm={() => {
        setShow({ ...show, showCom: false })
        history.push("/staff/listOfAllUsers")
      }}
    />
  )
}

export const ErrModal: React.FC<ModalProps> = ({ show, setShow }) => {
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={show.showErr}
      body={"ไม่สามารถเพิ่มผู้ใช้ได้ในขณะนี้"}
      onConfirm={() => {
        setShow({ ...show, showErr: false })
      }}
    />
  )
}

export const UsernameErrModal: React.FC<ModalProps> = ({ show, setShow }) => {
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={show.showUsernameErr}
      body={"ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้ไปแล้ว"}
      onConfirm={() => {
        setShow({ ...show, showUsernameErr: false })
      }}
    />
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

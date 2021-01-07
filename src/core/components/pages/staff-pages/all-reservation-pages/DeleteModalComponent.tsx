import React from "react"
import { UserInfo } from "../interfaces/reservationSchemas"
import { CustomModal } from "../list-of-all-users-pages/ListOfAllUserModals"

type ConfirmDelInfo = { members: UserInfo[] | undefined; requestDelete: () => void }

interface ModalInterface {
  show: boolean
  onClose: () => void
}

interface ConfirmModalInterface extends ModalInterface {
  info: ConfirmDelInfo
}

const getAllPhoneNumber = (members: UserInfo[]): string => {
  let list = members.map((member) => `- ${member.phone}`).join("\n")
  return list
}

export const ConfirmDeleteModal: React.FC<ConfirmModalInterface> = ({ show, onClose, info }) => {
  const { requestDelete, members } = info
  return (
    <CustomModal
      title={"คำเตือน"}
      show={show}
      body={`การจองดังกล่าวนี้จะถูกลบ\n\n สตาฟกรุณาโทรแจ้งผู้ใช้ตามที่ระบุก่อนกดตกลง\n ${getAllPhoneNumber(members ? members : [])}`}
      onCancel={onClose}
      onConfirm={requestDelete}
    />
  )
}

export const DeleteSuccessfulModal: React.FC<ModalInterface> = ({ show, onClose }) => {
  return <CustomModal title={"เสร็จสิ้น"} show={show} body={"ระบบได้ทำการลบการจองเรียบร้อยแล้ว"} onConfirm={onClose} />
}

export const ErrModal: React.FC<ModalInterface> = ({ show, onClose }) => {
  return <CustomModal title={"เกิดข้อผิดพลาด"} show={show} body={"ไม่สามารถกระทำการได้ในขณะนี้"} onConfirm={onClose} />
}

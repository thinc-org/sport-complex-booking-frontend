import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"
import { CustomModal } from "../list-of-all-users-pages/ListOfAllUserModals"

type ConfirmDelInfo = { members: UserInfo[]; requestDelete: () => void }

interface ModalInterface {
  showModalInfo: DeleteModal
  setShowModalInfo: React.Dispatch<React.SetStateAction<DeleteModal>>
  info?: ConfirmDelInfo
}

const getAllPhoneNumber = (members: UserInfo[]): string => {
  let list = ""
  for (let member of members) list += `- ${member.phone}\n`
  return list
}

export const ConfirmDelModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { showConfirmDel } = showModalInfo
  const { requestDelete, members } = info as ConfirmDelInfo
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showConfirmDel}
      body={`การจองดังกล่าวนี้จะถูกลบ\n\n สตาฟกรุณาโทรแจ้งผู้ใช้ตามที่ระบุก่อนกดตกลง\n ${getAllPhoneNumber(members)}`}
      onCancel={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
      }}
      onConfirm={requestDelete}
    />
  )
}

export const ComDelModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo }) => {
  const history = useHistory()
  const { pagename } = useParams<{ pagename: string; _id: string }>()
  const { showComDel } = showModalInfo
  return (
    <CustomModal
      title={"เสร็จสิ้น"}
      show={showComDel}
      body={"ระบบได้ทำการลบการจองเรียบร้อยแล้ว"}
      onConfirm={() => {
        setShowModalInfo({ ...showModalInfo, showComDel: false })
        history.push(`/staff/allReservation/${pagename}`)
      }}
    />
  )
}

export const ErrModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo }) => {
  const { showErr } = showModalInfo
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={showErr}
      body={"ไม่สามารถลบการจองได้ในขณะนี้"}
      onConfirm={() => {
        setShowModalInfo({ ...showModalInfo, showErr: false })
      }}
    />
  )
}

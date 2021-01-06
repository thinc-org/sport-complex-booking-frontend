import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"

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
  const { requestDelete, members }: ConfirmDelInfo = info!
  return (
    <Modal
      show={showConfirmDel}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="px-4 pt-4">
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4" style={{ fontWeight: "lighter", whiteSpace: "pre-line" }}>
        {"การจองดังกล่าวนี้จะถูกลบ\n\n" + "สตาฟกรุณาโทรแจ้งผู้ใช้ตามที่ระบุก่อนกดตกลง\n" + getAllPhoneNumber(members)}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="outline-danger" className="btn-normal btn-outline-red" onClick={requestDelete}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ComDelModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo }) => {
  const history = useHistory()
  const { pagename } = useParams<{ pagename: string; _id: string }>()
  const { showComDel } = showModalInfo
  return (
    <Modal
      show={showComDel}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showComDel: false })
        history.push(`/staff/allReservation/${pagename}`)
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เสร็จสิ้น</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4" style={{ fontWeight: "lighter" }}>
        ระบบได้ทำการลบการจองเรียบร้อยแล้ว
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showComDel: false })
            history.push(`/staff/allReservation/${pagename}`)
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ErrModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo }) => {
  const { showErr } = showModalInfo
  return (
    <Modal
      show={showErr}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showErr: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4" style={{ fontWeight: "lighter" }}>
        ไม่สามารถลบการจองได้ในขณะนี้
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showErr: false })
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

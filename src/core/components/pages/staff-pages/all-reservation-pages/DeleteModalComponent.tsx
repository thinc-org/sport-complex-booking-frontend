import React from "react"
import { Modal, Button } from "react-bootstrap"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"

interface ModalInterface {
  showModalInfo: DeleteModal
  setShowModalInfo: React.Dispatch<React.SetStateAction<DeleteModal>>
  info: { members: UserInfo[]; requestDelete: () => void }
}

const getAllPhoneNumber = (members: UserInfo[]): string => {
  let list = ""
  for (let member of members) list += `- ${member.phone}\n`
  return list
}

export const ConfirmDelModal: React.FC<ModalInterface> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { showConfirmDel } = showModalInfo
  let mem: UserInfo[] = [
    {
      username: "sda",
      personal_email: "sad",
      phone: "081xxxxxx",
    },
    {
      username: "sda",
      personal_email: "sad",
      phone: "081xxxxxx",
    },
    {
      username: "sda",
      personal_email: "sad",
      phone: "081xxxxxx",
    },
  ]
  return (
    <Modal
      show={showConfirmDel}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4" style={{ fontWeight: "lighter", whiteSpace: "pre-line" }}>
        {"การจองดังกล่าวนี้จะถูกลบ\n\n" + "สตาฟกรุณาโทรแจ้งผู้ใช้ตามที่ระบุก่อนกดตกลง\n" + getAllPhoneNumber(mem)}
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
        <Button variant="outline-danger" className="btn-normal btn-outline-red" onClick={info.requestDelete}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

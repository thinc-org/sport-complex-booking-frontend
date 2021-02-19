import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { CustomModal } from "../list-of-all-users-pages/ListOfAllUserModals"
import { ModalVerify } from "../interfaces/InfoInterface"

type ConReject = { requestReject: () => void }
type ConAccept = { requestAccept: () => void }
type Username = { username: string }

interface ModalProps {
  showModalInfo: ModalVerify
  setShowModalInfo: React.Dispatch<React.SetStateAction<ModalVerify>>
  info?: ConReject | ConAccept | Username
}

// Reject Modal //
export const ConfirmRejectModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestReject } = info as ConReject
  return (
    <Modal
      show={showModalInfo === "showConfirmReject"}
      onHide={() => {
        setShowModalInfo("")
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>คุณต้องการปฏิเสธการลงทะเบียนนี้ใช่หรือไม่</Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo("")
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="danger" className="btn-normal btn-outline-red" onClick={requestReject}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const UncomRejectModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showUncomReject"}
      body="กรุณาเลือกข้อมูลที่ถูกปฏิเสธ"
      onConfirm={() => setShowModalInfo("")}
    />
  )
}

export const CompleteRejectModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const history = useHistory()
  const { username } = info as Username
  return (
    <CustomModal
      title={"การปฏิเสธการลงทะเบียนสำเร็จ"}
      show={showModalInfo === "showCompleteReject"}
      body={`ปฏิเสธการลงทะเบียนของ ${username} เรียบร้อยแล้ว`}
      onConfirm={() => {
        setShowModalInfo("")
        history.push("/staff/verifyApprove")
      }}
    />
  )
}

// Accept Modal //
export const ConfirmAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestAccept } = info as ConAccept
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showConfirmAccept"}
      body="คุณต้องการยอมรับการลงทะเบียนนี้ใช่หรือไม่"
      onCancel={() => setShowModalInfo("")}
      onConfirm={requestAccept}
    />
  )
}

export const UncomAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showUncomAccept"}
      body="กรุณาระบุวันหมดอายุสมาชิกก่อนกดยอมรับ"
      onConfirm={() => setShowModalInfo("")}
    />
  )
}

export const CompleteAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { username } = info as Username
  const history = useHistory()
  return (
    <CustomModal
      title={"การยอมรับการลงทะเบียนสำเร็จ"}
      show={showModalInfo === "showCompleteAccept"}
      body={`ยอมรับการลงทะเบียนของ ${username} เรียบร้อยแล้ว`}
      onConfirm={() => {
        setShowModalInfo("")
        history.push("/staff/verifyApprove")
      }}
    />
  )
}

// Error Modal //
export const ErrorModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={showModalInfo === "showErr"}
      body="ไม่สามารถ ยอมรับ/ปฏิเสธ การลงทะเบียนได้ในขณะนี้"
      onConfirm={() => setShowModalInfo("")}
    />
  )
}

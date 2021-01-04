import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
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
      show={showModalInfo.showConfirmReject}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmReject: false })
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
            setShowModalInfo({ ...showModalInfo, showConfirmReject: false })
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
    <Modal
      show={showModalInfo.showUncomReject}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showUncomReject: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>กรุณาเลือกข้อมูลที่ถูกปฏิเสธ</Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showUncomReject: false })
          }}
        >
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const CompleteRejectModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const history = useHistory()
  const { username } = info as Username
  return (
    <Modal
      show={showModalInfo.showCompleteReject}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showCompleteReject: false })
        history.push("/staff/verifyApprove")
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>การปฏิเสธการลงทะเบียนสำเร็จ</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{"ปฏิเสธการลงทะเบียนของ " + username + " เรียบร้อยแล้ว"}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showCompleteReject: false })
            history.push("/staff/verifyApprove")
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// Accept Modal //
export const ConfirmAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestAccept } = info as ConAccept
  return (
    <Modal
      show={showModalInfo.showConfirmAccept}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmAccept: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>คุณต้องการยอมรับการลงทะเบียนนี้ใช่หรือไม่</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showConfirmAccept: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={requestAccept}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const UncomAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <Modal
      show={showModalInfo.showUncomAccept}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showUncomAccept: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>กรุณาระบุวันหมดอายุสมาชิกก่อนกดยอมรับ</Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showUncomAccept: false })
          }}
        >
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const CompleteAcceptModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { username } = info as Username
  const history = useHistory()
  return (
    <Modal
      show={showModalInfo.showCompleteAccept}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showCompleteAccept: false })
        history.push("/staff/verifyApprove")
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>การยอมรับการลงทะเบียนสำเร็จ</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{"ยอมรับการลงทะเบียนของ " + username + " เรียบร้อยแล้ว"}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showCompleteAccept: false })
            history.push("/staff/verifyApprove")
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// Error Modal //
export const ErrorModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <Modal
      show={showModalInfo.showErr}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showErr: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>ไม่สามารถ ยอมรับ/ปฏิเสธ การลงทะเบียนได้ในขณะนี้</Modal.Body>
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

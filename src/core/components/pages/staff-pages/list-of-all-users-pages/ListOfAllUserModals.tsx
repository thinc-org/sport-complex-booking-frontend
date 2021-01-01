import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalUserInfo } from "../interfaces/InfoInterface"

type delModal = { username: string; requestDelete: () => void }
type saveModal = { requestSave: () => void }
type conChangePassModal = { requestChangePassword: () => void }

interface ModalProps {
  showModalInfo: ModalUserInfo
  setShowModalInfo: React.Dispatch<React.SetStateAction<ModalUserInfo>>
  info?: delModal | { username: string } | saveModal | conChangePassModal
}

// Delete Modal //
export const DeleteModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestDelete, username } = info as delModal
  return (
    <Modal
      show={showModalInfo.showDelete}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showDelete: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter", whiteSpace: "pre-line" }}>
        {"ท่านกำลังจะลบผู้ใช้ " + username + " ออกจากระบบ\n"}
        ต้องการดำเนินการต่อหรือไม่
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showDelete: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={requestDelete}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const CompleteDeleteModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const history = useHistory()
  const { username } = info as { username: string }
  return (
    <Modal
      show={showModalInfo.showComDelete}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showComDelete: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เสร็จสิ้น</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{"ลบผู้ใช้ " + username + " ออกจากระบบเรียบร้อยแล้ว"}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showComDelete: false })
            history.push("/staff/listOfAllUsers")
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// Save Modal //
export const SaveModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestSave } = info as saveModal
  return (
    <Modal
      show={showModalInfo.showSave}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showSave: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>ต้องการบันทึกการเปลี่ยนแปลงหรือไม่</Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showSave: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={requestSave}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const CompleteSaveModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <Modal
      show={showModalInfo.showComSave}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showComSave: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เสร็จสิ้น</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว</Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showComSave: false })
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// Error Modal //
export const ErrModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
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
      <Modal.Body style={{ fontWeight: "lighter" }}>ไม่สามารถทำได้ในขณะนี้</Modal.Body>
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

export const PasswordErrModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <Modal
      show={showModalInfo.showPasswordErr}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showPasswordErr: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> รหัสผ่านเก่าไม่ถูกต้อง หรือรหัสผ่านใหม่ไม่ตรงกัน </Modal.Body>
      <Modal.Footer>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showPasswordErr: false })
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ConfirmChangePasswordModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestChangePassword } = info as conChangePassModal
  return (
    <Modal
      show={showModalInfo.showConfirmChange}
      onHide={() => {
        setShowModalInfo({ ...showModalInfo, showConfirmChange: false })
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>คำเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการเปลี่ยนรหัสผ่านหรือไม่ </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            setShowModalInfo({ ...showModalInfo, showConfirmChange: false })
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={requestChangePassword}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

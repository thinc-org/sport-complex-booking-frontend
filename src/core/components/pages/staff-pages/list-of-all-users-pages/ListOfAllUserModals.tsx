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

interface BaseModalProps {
  title: string
  show: boolean
  body: string
  onCancel?: () => void
  onConfirm: () => void
}

// Base Modal //
export const CustomModal: React.FC<BaseModalProps> = ({ title, show, body, onCancel, onConfirm }) => {
  return (
    <Modal show={show} onHide={onCancel ? onCancel : onConfirm} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="px-4 pt-4">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pt-0" style={{ fontWeight: "lighter", whiteSpace: "pre-line" }}>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {onCancel ? (
          <div>
            <Button variant="outline-secondary" className="btn-normal btn-outline-pink mr-3" onClick={onCancel}>
              ยกเลิก
            </Button>
            <Button variant="pink" className="btn-normal" onClick={onConfirm}>
              ยืนยัน
            </Button>
          </div>
        ) : (
          <Button variant="pink" className="btn-normal" onClick={onConfirm}>
            ตกลง
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

// Delete Modal //
export const DeleteModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestDelete, username } = info as delModal
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showDelete"}
      body={`ท่านกำลังจะลบผู้ใช้ ${username} ออกจากระบบ\nต้องการดำเนินการต่อหรือไม่`}
      onCancel={() => {
        setShowModalInfo("none")
      }}
      onConfirm={requestDelete}
    />
  )
}

export const CompleteDeleteModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const history = useHistory()
  const { username } = info as { username: string }
  return (
    <CustomModal
      title={"เสร็จสิ้น"}
      show={showModalInfo === "showComDelete"}
      body={`ลบผู้ใช้ ${username} ออกจากระบบเรียบร้อยแล้ว`}
      onConfirm={() => {
        setShowModalInfo("none")
        history.push("/staff/listOfAllUsers")
      }}
    />
  )
}

// Save Modal //
export const SaveModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestSave } = info as saveModal
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showSave"}
      body={"ต้องการบันทึกการเปลี่ยนแปลงหรือไม่"}
      onCancel={() => {
        setShowModalInfo("none")
      }}
      onConfirm={requestSave}
    />
  )
}

export const CompleteSaveModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"เสร็จสิ้น"}
      show={showModalInfo === "showComSave"}
      body={"บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว"}
      onConfirm={() => {
        setShowModalInfo("none")
      }}
    />
  )
}

// Error Modal //
export const ErrModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={showModalInfo === "showErr"}
      body={"ไม่สามารถทำได้ในขณะนี้"}
      onConfirm={() => {
        setShowModalInfo("none")
      }}
    />
  )
}

export const PasswordErrModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo }) => {
  return (
    <CustomModal
      title={"เกิดข้อผิดพลาด"}
      show={showModalInfo === "showPasswordErr"}
      body={"รหัสผ่านเก่าไม่ถูกต้อง หรือรหัสผ่านใหม่ไม่ตรงกัน"}
      onConfirm={() => {
        setShowModalInfo("none")
      }}
    />
  )
}

export const ConfirmChangePasswordModal: React.FC<ModalProps> = ({ showModalInfo, setShowModalInfo, info }) => {
  const { requestChangePassword } = info as conChangePassModal
  return (
    <CustomModal
      title={"คำเตือน"}
      show={showModalInfo === "showConfirmChange"}
      body={"ต้องการเปลี่ยนรหัสผ่านหรือไม่"}
      onCancel={() => {
        setShowModalInfo("none")
      }}
      onConfirm={requestChangePassword}
    />
  )
}

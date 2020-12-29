import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalUserInfo } from "../interfaces/InfoInterface"

interface propsTemplate {
  showModalInfo: ModalUserInfo
  setShowModalInfo: React.Dispatch<React.SetStateAction<ModalUserInfo>>
  info: any
}

const ModalsComponent = ({ showModalInfo, setShowModalInfo, info }: propsTemplate) => {
  const { showDelete, showComDelete, showSave, showComSave, showErr, showPasswordErr, showConfirmChange } = showModalInfo

  const history = useHistory()

  const redirectBack = () => {
    history.push("/staff/listOfAllUsers")
  }

  // Delete Modal //
  const renderDelete = (info: { username: string; handleDeleteUser: () => void }) => {
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowModalInfo({ ...showModalInfo, showDelete: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>
          {"ท่านกำลังจะลบผู้ใช้ " + info.username + " ออกจากระบบ"}
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
          <Button variant="pink" className="btn-normal" onClick={info.handleDeleteUser}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderCompleteDelete = (info: { username: string }) => {
    return (
      <Modal
        show={showComDelete}
        onHide={() => {
          setShowModalInfo({ ...showModalInfo, showComDelete: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>{"ลบผู้ใช้ " + info.username + " ออกจากระบบเรียบร้อยแล้ว"}</Modal.Body>

        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowModalInfo({ ...showModalInfo, showComDelete: false })
              redirectBack()
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  // Save Modal //
  const renderSave = (info: { requestSave: () => void }) => {
    return (
      <Modal
        show={showSave}
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
          <Button variant="pink" className="btn-normal" onClick={info.requestSave}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderCompleteSave = () => {
    return (
      <Modal
        show={showComSave}
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
  const renderErrModal = () => {
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

  const renderPasswordErrModal = () => {
    return (
      <Modal
        show={showPasswordErr}
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

  const renderConfirmChangePasswordModal = (info: { requestChangePassword: () => void }) => {
    return (
      <Modal
        show={showConfirmChange}
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
          <Button variant="pink" className="btn-normal" onClick={info.requestChangePassword}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="Modals">
      {renderDelete(info)}
      {renderCompleteDelete(info)}
      {renderSave(info)}
      {renderCompleteSave()}
      {renderErrModal()}
      {renderConfirmChangePasswordModal(info)}
      {renderPasswordErrModal()}
    </div>
  )
}

export default ModalsComponent

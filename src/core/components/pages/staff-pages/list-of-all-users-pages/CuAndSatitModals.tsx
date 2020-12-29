import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalCuAndSatit } from "../interfaces/InfoInterface"

interface propsTemplate {
  showModals: ModalCuAndSatit
  setShowModals: React.Dispatch<React.SetStateAction<ModalCuAndSatit>>
  info: any
}

const CuAndSatitModals = ({ showModals, setShowModals, info }: propsTemplate) => {
  const { showCom, showComDelete, showConfirm, showDel, showErr, showPasswordErr, showConfirmChange } = showModals
  const history = useHistory()

  const redirectBack = () => {
    history.push("/staff/listOfAllUsers")
  }

  // Modals //
  const renderConfirmModal = (info: { requestUserChange: () => void }) => {
    return (
      <Modal
        show={showConfirm}
        onHide={() => {
          setShowModals({ ...showModals, showConfirm: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการยืนยันการเปลี่ยนแปลงหรือไม่ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowModals({ ...showModals, showConfirm: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={info.requestUserChange}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderComModal = (info: { completedChange: () => void }) => {
    return (
      <Modal
        show={showCom}
        onHide={() => {
          setShowModals({ ...showModals, showCom: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> บันทึกการเปลี่ยนแปลงเรียบร้อย </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal" onClick={info.completedChange}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderDelModal = (info: { requestDelete: () => void; username: string }) => {
    return (
      <Modal
        show={showDel}
        onHide={() => {
          setShowModals({ ...showModals, showDel: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {"ท่านกำลังจะลบผู้ใช้ " + info.username + " ต้องการดำเนินการต่อหรือไม่"} </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowModals({ ...showModals, showDel: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="danger" className="btn-normal btn-outline-red" onClick={info.requestDelete}>
            ลบผู้ใช้
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderComDelModal = () => {
    return (
      <Modal
        show={showComDelete}
        onHide={() => {
          setShowModals({ ...showModals, showComDelete: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ลบผู้ใช้เรียบร้อย </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal" onClick={redirectBack}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderErrModal = () => {
    return (
      <Modal
        show={showErr}
        onHide={() => {
          setShowModals({ ...showModals, showErr: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถทำการกระทำดังกล่าวได้ในขณะนี้ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowModals({ ...showModals, showErr: false })
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
          setShowModals({ ...showModals, showPasswordErr: false })
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
              setShowModals({ ...showModals, showPasswordErr: false })
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
          setShowModals({ ...showModals, showConfirmChange: false })
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
              setShowModals({ ...showModals, showConfirmChange: false })
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
      {renderComModal(info)}
      {renderConfirmModal(info)}
      {renderDelModal(info)}
      {renderConfirmChangePasswordModal(info)}
      {renderComDelModal()}
      {renderErrModal()}
      {renderPasswordErrModal()}
    </div>
  )
}

export default CuAndSatitModals

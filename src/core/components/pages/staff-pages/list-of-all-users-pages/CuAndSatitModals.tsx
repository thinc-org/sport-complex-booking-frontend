import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalCuAndSatit } from "../interfaces/InfoInterface"

interface propsTemplate {
  show_modals: ModalCuAndSatit
  set_show_modals: React.Dispatch<React.SetStateAction<ModalCuAndSatit>>
  info: any
  props: RouteComponentProps
}

const CuAndSatitModals = ({ show_modals, set_show_modals, info, props }: propsTemplate) => {
  let { show_com, show_com_delete, show_confirm, show_del, show_err, show_password_err, show_confirm_change } = show_modals

  const redirectBack = () => {
    props.history.push({
      pathname: "/staff/listOfAllUsers",
    })
  }

  // Modals //
  const renderConfirmModal = (info: { requestUserChange: () => void }) => {
    return (
      <Modal
        show={show_confirm}
        onHide={() => {
          set_show_modals({ ...show_modals, show_confirm: false })
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
              set_show_modals({ ...show_modals, show_confirm: false })
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
        show={show_com}
        onHide={() => {
          set_show_modals({ ...show_modals, show_com: false })
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
        show={show_del}
        onHide={() => {
          set_show_modals({ ...show_modals, show_del: false })
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
              set_show_modals({ ...show_modals, show_del: false })
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
        show={show_com_delete}
        onHide={() => {
          set_show_modals({ ...show_modals, show_com_delete: false })
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
        show={show_err}
        onHide={() => {
          set_show_modals({ ...show_modals, show_err: false })
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
              set_show_modals({ ...show_modals, show_err: false })
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
        show={show_password_err}
        onHide={() => {
          set_show_modals({ ...show_modals, show_password_err: false })
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
              set_show_modals({ ...show_modals, show_password_err: false })
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
        show={show_confirm_change}
        onHide={() => {
          set_show_modals({ ...show_modals, show_confirm_change: false })
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
              set_show_modals({ ...show_modals, show_confirm_change: false })
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

import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalUserInfo } from "../interfaces/InfoInterface"

interface InfoProps {
  username?: string
  handleDeleteUser?: () => void
  handleSave?: () => void
}

interface PropsTemplate {
  show_modal_info: ModalUserInfo
  set_show_modal_info: React.Dispatch<React.SetStateAction<ModalUserInfo>>
  info: InfoProps
  rest: RouteComponentProps
}

const ModalsComponent = ({ show_modal_info, set_show_modal_info, info, rest }: PropsTemplate) => {
  const { show_delete, show_com_delete, show_save, show_com_save, show_err } = show_modal_info

  const redirectBack = () => {
    rest.history.push({
      pathname: "/listOfAllUsers",
    })
  }

  // Delete Modal //
  const renderDelete = (info: InfoProps) => {
    return (
      <Modal
        show={show_delete}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_delete: false })
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
              set_show_modal_info({ ...show_modal_info, show_delete: false })
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

  const renderCompleteDelete = (info: InfoProps) => {
    return (
      <Modal
        show={show_com_delete}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_com_delete: false })
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
              set_show_modal_info({ ...show_modal_info, show_com_delete: false })
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
  const renderSave = (info: InfoProps) => {
    return (
      <Modal
        show={show_save}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_save: false })
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
              set_show_modal_info({ ...show_modal_info, show_save: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={info.handleSave}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderCompleteSave = () => {
    return (
      <Modal
        show={show_com_save}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_com_save: false })
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
              console.log("click com save")
              set_show_modal_info({ ...show_modal_info, show_com_save: false })
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
        show={show_err}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_err: false })
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
              set_show_modal_info({ ...show_modal_info, show_err: false })
            }}
          >
            ตกลง
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
    </div>
  )
}

export default ModalsComponent

import React from "react"
import { Modal, Button } from "react-bootstrap"
import { ModalInfo } from "../interfaces/InfoInterface"

interface props {
  show_modal_info: ModalInfo
  set_show_modal_info: React.Dispatch<React.SetStateAction<ModalInfo>>
  info: any
}

const VerifyModalsComponent = ({ show_modal_info, set_show_modal_info, info }: props) => {
  let { show_confirm_accept, show_uncom_accept, show_confirm_reject, show_uncom_reject } = show_modal_info
  const renderConfirmReject = (info: { requestReject: () => void }) => {
    return (
      <Modal
        show={show_confirm_reject}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_confirm_reject: false })
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
              set_show_modal_info({ ...show_modal_info, show_confirm_reject: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="danger" className="btn-normal btn-outline-red" onClick={info.requestReject}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderUncomReject = () => {
    return (
      <Modal
        show={show_uncom_reject}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_uncom_reject: false })
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
              set_show_modal_info({ ...show_modal_info, show_uncom_reject: false })
            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderConfirmAccept = (info: { requestAccept: () => void }) => {
    return (
      <Modal
        show={show_confirm_accept}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_confirm_accept: false })
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
              set_show_modal_info({ ...show_modal_info, show_confirm_accept: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={info.requestAccept}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderUncomAccept = () => {
    return (
      <Modal
        show={show_uncom_accept}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_uncom_accept: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>กรุณาระบุสถานะ/วันหมดอายุสมาชิกก่อนกดยอมรับ</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_modal_info({ ...show_modal_info, show_uncom_accept: false })
            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="Modals">
      {renderConfirmReject(info)}
      {renderUncomReject()}
      {renderConfirmAccept(info)}
      {renderUncomAccept()}
    </div>
  )
}

export default VerifyModalsComponent

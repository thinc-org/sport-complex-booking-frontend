import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalVerify } from "../interfaces/InfoInterface"

interface InfoProps {
  requestReject?: () => void
  requestAccept?: () => void
  username?: string
}

interface propsTemplate {
  show_modal_info: ModalVerify
  set_show_modal_info: React.Dispatch<React.SetStateAction<ModalVerify>>
  info: InfoProps
  props: RouteComponentProps
}

const VerifyModalsComponent = ({ show_modal_info, set_show_modal_info, info, props }: propsTemplate) => {
  const {
    show_confirm_accept,
    show_uncom_accept,
    show_complete_accept,
    show_confirm_reject,
    show_uncom_reject,
    show_complete_reject,
    show_err,
  } = show_modal_info

  const redirectBack = () => {
    console.log(props)
    props.history.push({
      pathname: "/verifyApprove",
    })
  }

  // Reject Modal //
  const renderConfirmReject = (info: InfoProps) => {
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

  const renderCompleteReject = (info: InfoProps) => {
    return (
      <Modal
        show={show_complete_reject}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_complete_reject: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>การปฏิเสธการลงทะเบียนสำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>{"ปฏิเสธการลงทะเบียนของ " + info.username + " เรียบร้อยแล้ว"}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_modal_info({ ...show_modal_info, show_complete_reject: false })
              redirectBack()
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  // Accept Modal //
  const renderConfirmAccept = (info: InfoProps) => {
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

  const renderCompleteAccept = (info: InfoProps) => {
    return (
      <Modal
        show={show_complete_accept}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_complete_accept: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>การยอมรับการลงทะเบียนสำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>{"ยอมรับการลงทะเบียนของ " + info.username + " เรียบร้อยแล้ว"}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_modal_info({ ...show_modal_info, show_complete_accept: false })
              redirectBack()
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  // Error Modal //
  const renderError = () => {
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
        <Modal.Body style={{ fontWeight: "lighter" }}>ไม่สามารถ ยอมรับ/ปฏิเสธ การลงทะเบียนได้ในขณะนี้</Modal.Body>
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
      {renderConfirmReject(info)}
      {renderUncomReject()}
      {renderCompleteReject(info)}
      {renderConfirmAccept(info)}
      {renderUncomAccept()}
      {renderCompleteAccept(info)}
      {renderError()}
    </div>
  )
}

export default VerifyModalsComponent

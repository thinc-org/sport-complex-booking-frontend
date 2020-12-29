import React from "react"
import { useHistory } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import { ModalVerify } from "../interfaces/InfoInterface"

interface propsTemplate {
  showModalInfo: ModalVerify
  setShowModalInfo: React.Dispatch<React.SetStateAction<ModalVerify>>
  info: any
}

const VerifyModalsComponent = ({ showModalInfo, setShowModalInfo, info }: propsTemplate) => {
  const { showConfirmAccept, showUncomAccept, showCompleteAccept, showConfirmReject, showUncomReject, showCompleteReject, showErr } = showModalInfo

  const history = useHistory()

  const redirectBack = () => {
    history.push("/staff/verifyApprove")
  }

  // Reject Modal //
  const renderConfirmReject = (info: { requestReject: () => void }) => {
    return (
      <Modal
        show={showConfirmReject}
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
        show={showUncomReject}
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

  const renderCompleteReject = (info: { username: string }) => {
    return (
      <Modal
        show={showCompleteReject}
        onHide={() => {
          setShowModalInfo({ ...showModalInfo, showCompleteReject: false })
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
              setShowModalInfo({ ...showModalInfo, showCompleteReject: false })
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
  const renderConfirmAccept = (info: { requestAccept: () => void }) => {
    return (
      <Modal
        show={showConfirmAccept}
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
        show={showUncomAccept}
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

  const renderCompleteAccept = (info: { username: string }) => {
    return (
      <Modal
        show={showCompleteAccept}
        onHide={() => {
          setShowModalInfo({ ...showModalInfo, showCompleteAccept: false })
          redirectBack()
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
              setShowModalInfo({ ...showModalInfo, showCompleteAccept: false })
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

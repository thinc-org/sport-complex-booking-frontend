import React, { FunctionComponent, useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"

interface componentState {
  showAdd: boolean
  showCom: boolean
  showErr: boolean
  requestAdd()
}

const ModalsComponent: FunctionComponent<componentState> = ({ showAdd, showCom, showErr, requestAdd }) => {
  console.log(showAdd, showCom, showErr)
  const [showAdding, setShowAdding] = useState(showAdd)
  const [showComplete, setShowComplete] = useState(showCom)
  const [showError, setShowError] = useState(showErr)
  console.log(showAdding)

  useEffect(() => {
    setShowAdding(showAdd)
    console.log(showAdding)
  }, [])
  useEffect(() => {
    setShowComplete(showCom)
    console.log(showComplete)
  }, [showComplete])
  useEffect(() => {
    setShowError(showErr)
    console.log(showError)
  }, [showError])

  const renderAddModal = () => {
    return (
      <Modal
        show={showAdding}
        onHide={() => {
          setShowAdding(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการเพิ่มผู้ใช้หรือไม่ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowAdding(false)
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={requestAdd}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderComModal = () => {
    return (
      <Modal
        show={showComplete}
        onHide={() => {
          setShowComplete(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> การเพิ่มผู้ใช้เสร็จสมบูรณ์ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowComplete(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderErrModal = () => {
    return (
      <Modal
        show={showError}
        onHide={() => {
          setShowError(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถเพิ่มผู้ใช้ได้ในขณะนี้ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowError(false)
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
      {renderAddModal()}
      {renderComModal()}
      {renderErrModal()}
    </div>
  )
}

export default ModalsComponent

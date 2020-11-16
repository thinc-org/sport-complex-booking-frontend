import React, { FunctionComponent, useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"

interface props {
  showDel: boolean
  setShowDel: (isShow: boolean) => void
  showSave: boolean
  setShowSave: (isShow: boolean) => void
  showErr: boolean
  setShowErr: (isShow: boolean) => void
  info: any
}

const ModalsComponent = ({ showDel = false, setShowDel, showSave = false, setShowSave, showErr = false, setShowErr, info }: props) => {
  const renderDelModal = (info: { username: string; handleDeleteUser: () => void }) => {
    return (
      <Modal
        show={showDel}
        onHide={() => {
          setShowDel(false)
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
              setShowDel(false)
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

  const renderSaveModal = (info: { handleSave: () => void }) => {
    return (
      <Modal
        show={showSave}
        onHide={() => {
          setShowSave(false)
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
              setShowSave(false)
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

  const renderErrModal = () => {
    return (
      <Modal
        show={showErr}
        onHide={() => {
          setShowErr(false)
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
              setShowErr(false)
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
      {renderDelModal(info)}
      {renderSaveModal(info)}
      {renderErrModal()}
    </div>
  )
}

export default ModalsComponent

import React, { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { DeleteModal } from "../interfaces/reservationSchemas"

interface ModalInterface {
  showModalInfo: DeleteModal
  setShowModalInfo: React.Dispatch<React.SetStateAction<DeleteModal>>
  info: any
}

const DeleteModalComponent = ({ showModalInfo, setShowModalInfo, info }: ModalInterface) => {
  const { showConfirmDel, showComDel, showErr } = showModalInfo

  // renders //
  const renderConfirmDel = (info: { requestDelete: () => void }) => {
    return (
      <Modal
        show={showConfirmDel}
        onHide={() => {
          setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>
          คุณต้องการลบข้อมูลการจองนี้หรือไม่ หากกดยืนยัน การจองนี้จะถูกลบและจะแจ้งเตือนไปยังอีเมลของผู้ใช้โดยอัตโนมัติ
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowModalInfo({ ...showModalInfo, showConfirmDel: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="outline-danger" className="btn-normal btn-outline-red" onClick={info.requestDelete}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return <div>{renderConfirmDel(info)}</div>
}

export default DeleteModalComponent

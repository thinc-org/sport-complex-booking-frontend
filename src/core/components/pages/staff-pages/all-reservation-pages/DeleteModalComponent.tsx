import React, { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { DeleteModal } from "../interfaces/reservationSchemas"

interface ModalInterface {
  show_modal_info: DeleteModal
  set_show_modal_info: React.Dispatch<React.SetStateAction<DeleteModal>>
  info: any
}

const DeleteModalComponent = ({ show_modal_info, set_show_modal_info, info }: ModalInterface) => {
  const { show_confirm_del, show_com_del, show_err } = show_modal_info

  // renders //
  const renderConfirmDel = (info: { requestDelete: () => void }) => {
    return (
      <Modal
        show={show_confirm_del}
        onHide={() => {
          set_show_modal_info({ ...show_modal_info, show_confirm_del: false })
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
              set_show_modal_info({ ...show_modal_info, show_confirm_del: false })
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

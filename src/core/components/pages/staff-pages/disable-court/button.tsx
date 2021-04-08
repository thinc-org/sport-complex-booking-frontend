import React, { useState } from "react"
import { ErrorAlert } from "./modals"

import { Button } from "react-bootstrap"
import { DeleteButtonProps } from "../../../../dto/disableCourt.dto"

export const DeleteButton = ({ onClick, indx, type, phone }: DeleteButtonProps) => {
  const [show, setShow] = useState(false)
  const message = type === "reservation" || type === "waitingRoom" ? "ต้องการลบการจองหรือห้องรอการจองนี้หรือไม่" : "ต้องการลบการล็อคคอร์ดนี้หรือไม่"
  const phoneNum = phone ? <div>เบอร์ผู้จอง: {phone}</div> : undefined
  return (
    <>
      <ErrorAlert
        canCancel={true}
        inProp={show}
        header="กรุณายืนยันการลบ"
        message={message}
        children={phoneNum}
        handleClose={() => (onClick ? onClick(indx, type ?? "") : null)}
        onCancel={() => setShow(false)}
      />
      <Button variant="outline-transparent" style={{ color: "red" }} onClick={() => setShow(true)} className="ml-auto">
        ลบ
      </Button>
    </>
  )
}

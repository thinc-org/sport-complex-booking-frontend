import React, { useState } from "react"
import { ErrorAlert } from "./modals"

import { Button } from "react-bootstrap"
import { DeleteButtonProps } from "./disable-court-interface"

export const DeleteButton = ({ onClick, indx }: DeleteButtonProps) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <ErrorAlert
        canCancel={true}
        inProp={show}
        header="กรุณายืนยันการลบ"
        message="ต้องการลบการปิดคอร์ดนี้หรือไม่"
        handleClose={() => onClick(indx)}
        onCancel={() => setShow(false)}
      />
      <Button variant="outline-transparent" style={{ color: "red" }} onClick={() => setShow(true)} className="ml-auto">
        ลบ
      </Button>
    </>
  )
}

import React from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { getTimeArr, dayArr, getMinute, getTime } from "./mapTime"
import { CourtTable, ErrorRow } from "./disabled-court-table"
import { ModalProps, FormModalProps, TimeSlotRow, ErrorRowProps } from "../../../../dto/disableCourt.dto"
export const ErrorAlert = ({ inProp, header, message, handleClose, canCancel = false, onCancel, overlapData }: ModalProps) => {
  const data: ErrorRowProps[] = []
  if (overlapData) {
    overlapData.reservation?.forEach((element, indx) => {
      data.push({
        indx: indx,
        date: element.date,
        phone: element.list_member[0].phone,
        time_slot: element.time_slot,
      })
    })
    overlapData.waitingRoom?.forEach((element, indx) => {
      data.push({
        indx: indx,
        date: element.date,
        phone: element.list_member[0].phone,
        time_slot: element.time_slot,
      })
    })
  }
  return (
    <>
      <Modal show={inProp} onHide={onCancel ?? handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
          {overlapData && (
            <div>
              {CourtTable<ErrorRowProps>({
                data: data,
                header: ["index", "เบอร์ติดต่อ", "วันที่ทับซ้อน", "เวลาที่ทับซ้อน"],
                Row: ErrorRow,
              })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="mediumPink" onClick={handleClose}>
            ตกลง
          </Button>
          {canCancel && (
            <Button onClick={onCancel} variant="mediumPink">
              ยกเลิก
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const FormAlert = ({ inProp, handleClose, onSubmit, validate }: FormModalProps) => {
  const { register, handleSubmit, getValues, errors } = useForm<TimeSlotRow>()
  const timeArr: string[] = getTimeArr()
  return (
    <Modal show={inProp} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เลือกช่วงเวลา</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div>
            <Form.Label>วัน</Form.Label>
            <Form.Control name="day" as="select" ref={register({ required: true, validate: () => validate(getValues()) })}>
              {dayArr.map((val, indx) => (
                <option value={indx} key={val}>
                  {val}
                </option>
              ))}
            </Form.Control>
          </div>
          <div>
            <Form.Label>เวลาที่เริ่มปิด</Form.Label>
            <Form.Control name="timeSlotStart" as="select" ref={register({ required: true, validate: () => validate(getValues()) })}>
              {timeArr.map((val, indx) => (
                <option value={indx + 1} key={val}>
                  {val}
                </option>
              ))}
            </Form.Control>
          </div>
          <div>
            <Form.Label>เวลาสิ้นสุดการปิด</Form.Label>
            <Form.Control name="timeSlotEnd" as="select" ref={register({ required: true, validate: () => validate(getValues()) })}>
              {timeArr.map((val, indx) => (
                <option value={indx} key={val}>
                  {val}
                </option>
              ))}
            </Form.Control>
            <Form.Text>{errors.timeSlotEnd && "เวลาที่ใส่ไม่ถูกต้อง"}</Form.Text>
            <Form.Text>
              {(errors.timeSlotStart?.type === "required" || errors.timeSlotEnd?.type === "required" || errors.day?.type === "required") &&
                "กรุณากรอกข้อมูลให้ครบ"}
            </Form.Text>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="mediumPink">
            เพิ่ม
          </Button>
          <Button onClick={handleClose} variant="mediumPink">
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

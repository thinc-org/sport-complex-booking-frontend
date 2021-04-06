import React from "react"

import { Modal, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { getTimeArr, dayArr } from "./mapTime"
import { ModalProps, FormModalProps, TimeSlotRow } from "../../../../dto/disableCourt.dto"
export const ErrorAlert = ({ inProp, header, message, handleClose, canCancel = false, onCancel, children }: ModalProps) => {
  return (
    <>
      <Modal className="wide-modal" show={inProp} onHide={onCancel ?? handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
          {children}
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

import React from "react"
import {Button, Modal } from "react-bootstrap"

export interface SettingsCardProps {
  type: "absencePunishment" | "lateCancelPunishment" | "lateCancelDay" | "waitingRooomDuration"
  set: (value: number) => void
  value: number
  cardTitle: string
  unit: string
}

export const SettingsCard:React.FC<SettingsCardProps> = ({type, set, value, cardTitle, unit}) => {
  return (
      <div className="default-mobile-wrapper">
        <div className="card-body">
          <h5 className="card-title">{cardTitle}</h5>
          <span className="d-flex justify-content-around">
            <Button
              variant="pink"
              className="button"
              disabled = {value - 5 < 0 || (type === "waitingRooomDuration" && value -5 <=0)}
              onClick={() => {
                set(value -5)
              }}>
              -5
                </Button>
            <Button
              variant="pink"
              className="button"
              disabled = {value - 1 < 0 || (type === "waitingRooomDuration" && value -1 <=0)}
              onClick={() => {
                set(value -1)
              }}>
              -1
                </Button>
            <span className="mt-3">{value} {unit}</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                set(value +1)
              }}>
              +1
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                set(value +5)
              }}>
              +5
                </Button>
          </span>
        </div>
      </div>
  )
}


export interface EditTimeModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export const EditTime:React.FC<EditTimeModalProps> = ({show, setShow}) => {
  return (
      <Modal
        show={show}
        onHide={() => {
          setShow(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>สําเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ระบบได้ทําการเปลี่ยนเวลารียบร้อยแล้ว</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShow(false)
            }}
          >
            ตกลง
            </Button>
        </Modal.Footer>
      </Modal>
    )
}
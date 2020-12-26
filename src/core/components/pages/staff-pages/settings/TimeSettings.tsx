import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal, Card } from "react-bootstrap"
import CreateWaitingRoom from "../../Reservation/CreateWaitingRoom"
import fetch from "../interfaces/axiosTemplate"

export default function TimeSettings() {

  const [jwt, set_jwt] = useState<string>("")
  const [show_edit_time, set_show_edit_time] = useState<boolean>(false)
  const [settings, setSettings] = useState({
    waiting_room_duration: 15,
    late_cancellation_punishment: 14,
    absence_punishment: 30,
    late_cancellation_day: 2,
  })

  const createAbsence = () => {
    let { absence_punishment } = settings
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">โทษของการจองแล้วไม่มาใช้คอร์ด: แบนผู้ใช้</h5>
          <span className="d-flex justify-content-around">
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, absence_punishment: absence_punishment - 5 })
              }}>
              -5
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, absence_punishment: absence_punishment - 1 })
              }}>
              -1
                </Button>
            <span className="mt-3">{absence_punishment} วัน</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, absence_punishment: absence_punishment + 1 })
              }}>
              +1
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, absence_punishment: absence_punishment + 5 })
              }}>
              +5
                </Button>
          </span>
        </div>
      </div>
    )
  }

  const createLatePunishment = () => {
    let { late_cancellation_punishment } = settings
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">โทษของการจองแล้วยกเลิกหลังกําหนด: แบนผู้ใช้</h5>
          <span className="d-flex justify-content-around">
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_punishment: late_cancellation_punishment - 5 })
              }}>
              -5
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_punishment: late_cancellation_punishment - 1 })
              }}>
              -1
                </Button>
            <span className="mt-3">{late_cancellation_punishment} วัน</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_punishment: late_cancellation_punishment + 1 })
              }}>
              +1
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_punishment: late_cancellation_punishment + 5 })
              }}>
              +5
                </Button>
          </span>
        </div>
      </div>
    )
  }

  const createLateDay = () => {
    let { late_cancellation_day } = settings
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">อนุญาติการยกเลิกล่วงหน้าได้สูงสุด</h5>
          <span className="d-flex justify-content-around">
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_day: late_cancellation_day - 5 })
              }}>
              -5
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_day: late_cancellation_day - 1 })
              }}>
              -1
                </Button>
            <span className="mt-3">{late_cancellation_day} วัน</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_day: late_cancellation_day + 1 })
              }}>
              +1
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, late_cancellation_day: late_cancellation_day + 5 })
              }}>
              +5
                </Button>
          </span>
        </div>
      </div>
    )
  }

  const createWaiting = () => {
    let { waiting_room_duration } = settings
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">ระยะเวลาของห้องรอการจอง</h5>
          <span className="d-flex justify-content-around">
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, waiting_room_duration: waiting_room_duration - 5 })
              }}>
              -5
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, waiting_room_duration: waiting_room_duration - 1 })
              }}>
              -1
                </Button>
            <span className="mt-3">{waiting_room_duration} วัน</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, waiting_room_duration: waiting_room_duration + 1 })
              }}>
              +1
                </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setSettings({ ...settings, waiting_room_duration: waiting_room_duration + 5 })
              }}>
              +5
                </Button>
          </span>
        </div>
      </div>
    )
  }

  const editTime = () => {
    let { waiting_room_duration, late_cancellation_day, late_cancellation_punishment, absence_punishment } = settings
    if (waiting_room_duration <= 0 || late_cancellation_day <= 0 || late_cancellation_punishment <= 0 || absence_punishment <= 0) {
      return (
        <Modal
          show={show_edit_time}
          onHide={() => {
            set_show_edit_time(false)
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>คําเตือน</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontWeight: "lighter" }}>ค่าที่ใส่มาไม่ถูกต้อง กรุณาเปลี่ยนใหม่อีกครั้ง</Modal.Body>
          <Modal.Footer>
            <Button
              variant="pink"
              className="btn-normal"
              onClick={() => {
                set_show_edit_time(false)
              }}
            >
              ตกลง
              </Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return (
        <Modal
          show={show_edit_time}
          onHide={() => {
            set_show_edit_time(false)
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>สําเร็จ</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontWeight: "lighter" }}>ระบบได้ทําการเพิ่มกีฬาใหม่เข้าไปเรียบร้อยแล้ว</Modal.Body>
          <Modal.Footer>
            <Button
              variant="pink"
              className="btn-normal"
              onClick={() => {
                set_show_edit_time(false)
              }}
            >
              ตกลง
              </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">การไม่มา</h5>
        {createAbsence()}
        <div>
          <h5 className="card-title">การยกเลิก</h5>
        </div>
        {createLatePunishment()}
        {createLateDay()}
        <div>
          <h5 className="card-title">ห้องรอ</h5>
        </div>
        {createWaiting()}
      </div>
      <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            set_show_edit_time(true)
          }}>
            บันทึก
            </Button>
        </Col>
      </Row>
      {editTime()}
    </div>
  )
}


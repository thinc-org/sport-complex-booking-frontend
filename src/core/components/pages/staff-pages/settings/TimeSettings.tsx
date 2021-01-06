import { AxiosResponse } from "axios"
import React, { useState, useEffect } from "react"
import {Row, Col, Button } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { EditTime, SettingsCard } from "./TimeSettingsComponents"

export default function TimeSettings() {
  const [showEditTime, setShowEditTime] = useState<boolean>(false)
  const [waitingRoomDuration, setWaitingRoomDuration] = useState(0)
  const [lateCancellationPunishment, setLateCancellationPunishment] = useState(0)
  const [absencePunishment, setAbsencePunishment] = useState(0)
  const [lateCancellationDay, setLateCancellationDay] = useState(0)
  const fetchSettings = async () => {
    await client.get("/court-manager/setting")
    .then(({data})=> {
      console.log(data)
      setWaitingRoomDuration(data['waiting_room_duration'])
      setLateCancellationPunishment(data['late_cancelation_punishment'])
      setAbsencePunishment(data['absence_punishment'])
      setLateCancellationDay(data['late_cancelation_day'])
    })
    .catch(()=> {})
  }

  const saveSettings = async () => {
    const data = {
      waiting_room_duration: waitingRoomDuration,
      late_cancelation_punishment: lateCancellationPunishment,
      absence_punishment: absencePunishment,
      late_cancelation_day: lateCancellationDay
    }
    await client.put<AxiosResponse>("/court-manager/setting", data)
    .then((data)=> {
      console.log(data)
      setShowEditTime(true)
      fetchSettings()
    })
    .catch((err)=> {
      console.log(err)
      fetchSettings()
    })
  }

  useEffect(()=> {
    fetchSettings()
  }, [])

  return (
    <div className="default-mobile-wrapper">
      <div className="card-body">
        
        <div className="my-3">
          <h5 className="card-title font-weight-bold">การไม่มา</h5>
          <SettingsCard set={setAbsencePunishment} value={absencePunishment} cardTitle={"โทษของการจองแล้วไม่มาใช้คอร์ด: แบนผู้ใช้"} unit={"วัน"} />
        </div>
        <div>
          <h5 className="card-title font-weight-bold">การยกเลิก</h5>
        </div>
        <div className="my-3">
          <SettingsCard set={setLateCancellationPunishment} value={lateCancellationPunishment} cardTitle={"โทษของการจองแล้วยกเลิกหลังกําหนด: แบนผู้ใช้"} unit={"วัน"} />
        </div>
        <div className="my-3">
          <SettingsCard set={setLateCancellationDay} value={lateCancellationDay} cardTitle={"อนุญาติการยกเลิกล่วงหน้าได้สูงสุด"} unit={"วัน"} />
        </div>
        <div>
          <h5 className="card-title font-weight-bold">ห้องรอ</h5>
        </div>
        <div className="my-3">
          <SettingsCard set={setWaitingRoomDuration} value={waitingRoomDuration} cardTitle={"ระยะเวลาของห้องรอการจอง"} unit={"นาที"} />
        </div>
        
      </div>
      <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            saveSettings()
          }}>
            บันทึก
            </Button>
        </Col>
      </Row>
      <EditTime show={showEditTime} setShow={setShowEditTime} />
    </div>
  )
}


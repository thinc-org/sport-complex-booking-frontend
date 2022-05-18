import React, { useState, useEffect, FunctionComponent, useCallback } from "react"
import { RouteComponentProps } from "react-router-dom"
import { client } from "../../../../axiosConfig"
import { Button } from "react-bootstrap"
import { CheckinModal } from "../../ui/Modals/CheckinModal"
import QrReader from "react-qr-reader"
import { ReservationDetailResponse } from "../../../dto/reservation.dto"

const QRScannerPage: FunctionComponent<RouteComponentProps> = () => {
  const soundPath = require("../../../assets/soundEffects/DingSoundEffect.mp3")

  const [audio] = useState<HTMLAudioElement>(new Audio(soundPath))
  const [readingResult, setReadingResult] = useState<string>()
  const [messageHeader, setMessageHeader] = useState<string>("")
  const [messageBody, setMessageBody] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [currentTime, setCurrentTime] = useState<number>()
  const [formattedCurrentTime, setFormattedCurrentTime] = useState<string>("")
  const [validTime, setValidTime] = useState<number>()
  const [formattedValidTime, setFormattedValidTime] = useState<string>("")
  const [isSuccessful, setIsSuccessful] = useState<boolean>()

  const handleScan = (data: string | null) => {
    if (data) setReadingResult(data)
  }

  const handleError = (err: string | null) => {
    console.log(err)
  }

  useEffect(() => {
    if (isSuccessful && modalOpen) {
      audio.play()
    }
  }, [isSuccessful, audio, modalOpen])

  useEffect(() => {
    if (readingResult) {
      setCurrentTime(new Date().getTime())
      setValidTime(parseInt(readingResult.slice(0, readingResult.indexOf("/"))))
      setId(readingResult.slice(readingResult.indexOf("/") + 1))
    }
  }, [readingResult])

  const setCurrentAndValidTime = useCallback(() => {
    setFormattedCurrentTime(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
    validTime && setFormattedValidTime(`${new Date(validTime).toLocaleDateString()} ${new Date(validTime).toLocaleTimeString()}`)
  }, [validTime])

  const checkIn = useCallback(async (reservationId) => {
    setCurrentAndValidTime()
    try {
      const res: ReservationDetailResponse = (await client.patch("myreservation/" + reservationId)).data
      if (res.is_check) {
        setMessageHeader("เช็คอินซ้ำ")
        setIsSuccessful(false)
        setMessageBody(res.sport_id.sport_name_th + " ID: " + reservationId)
        setModalOpen(true)
        setTimeout(function () {
          setModalOpen(false)
        }, 3000)
      } else {
        setMessageHeader("เช็คอินสำเร็จ")
        setIsSuccessful(true)
        setMessageBody(res.sport_id.sport_name_th + " ID: " + reservationId)
        setModalOpen(true)
        setTimeout(function () {
          setModalOpen(false)
        }, 3000)
      }
    } catch (err) {
      setMessageHeader("เช็คอินไม่สำเร็จ")
      setMessageBody(err.message)
      setModalOpen(true)
      setTimeout(function () {
        setModalOpen(false)
      }, 3000)
    }
  }, [])

  useEffect(() => {
    if (validTime && id && currentTime) {
      if (currentTime <= validTime) checkIn(id)
      else {
        setCurrentAndValidTime()
        setMessageHeader("คิวอาร์โค้ดหมดเวลา")
        setIsSuccessful(false)
        setMessageBody("ID: " + id)
        setModalOpen(true)
        setTimeout(function () {
          setModalOpen(false)
        }, 3000)
      }
    }
  }, [validTime, id, checkIn, currentTime])

  const refresh = () => {
    setReadingResult(undefined)
    setCurrentTime(undefined)
    setValidTime(undefined)
    setId("")
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="box-container btn offset-3 col-6 btn-lightpink-lightpink pt-2 pb-2" style={{ marginBottom: "45px" }}>
            <div style={{ fontSize: "24px", textAlign: "center" }}> ประเภทกีฬา </div>
          </div>
          <div className="col-6 offset-3 mb-3">
            <div style={{ fontSize: "36px", fontWeight: 700, textAlign: "center" }}> QR CODE SCANNER </div>
          </div>
          <Button variant="pink" className="col-4 offset-4 p-0 pl-2 pr-2 mb-2" onClick={refresh}>
            Refresh
          </Button>
          <div className="box-container btn offset-1 col-10 pt-3" style={{ boxShadow: "none" }}>
            <QrReader delay={500} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
          </div>
          <CheckinModal
            modalOpen={modalOpen}
            currentTime={formattedCurrentTime}
            validTime={formattedValidTime}
            messageHeader={messageHeader}
            messageBody={messageBody}
          />
        </div>
      </div>
    </div>
  )
}

export default QRScannerPage

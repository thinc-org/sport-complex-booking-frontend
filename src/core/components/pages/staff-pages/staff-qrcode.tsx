import React, { useState, useEffect, FunctionComponent, useCallback } from "react"

import { RouteComponentProps } from "react-router-dom"
import { BrowserQRCodeReader, Result } from "@zxing/library"
import { client } from "../../../../axiosConfig"
import { Button } from "react-bootstrap"
import { CheckinModal } from "../../ui/Modals/CheckinModal"

const QRScannerPage: FunctionComponent<RouteComponentProps> = (props) => {
  const codeReader = new BrowserQRCodeReader()
  const [readingResult, setReadingResult] = useState<Result>()
  const [messageHeader, setMessageHeader] = useState<string>("")
  const [messageBody, setMessageBody] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [data, setData] = useState("")
  const [id, setId] = useState<string>()
  const [currentTime, setCurrentTime] = useState<number>()
  const [validTime, setValidTime] = useState<number>()

  codeReader
    .decodeOnceFromVideoDevice(undefined, "video")
    .then((result) => {
      setReadingResult(result)
      // TODO Property 'text' is private and only accessible within class 'Result'.
      // readingResult?.text && setData(readingResult.text)
      console.log(readingResult)
    })
    .catch((err) => console.error(err))

  useEffect(() => {
    if (readingResult.text) {
      setCurrentTime(new Date().getTime())
      setValidTime(parseInt(readingResult.text.slice(0, readingResult.text.indexOf("/"))))
      setId(readingResult.text.slice(readingResult.text.indexOf("/") + 1))
    }
  }, [readingResult])

  const checkIn = useCallback(async (reservationId) => {
    try {
      await client.patch("myreservation/" + reservationId)
      setMessageHeader("เช็คอินสำเร็จ")
      setMessageBody("ID: " + reservationId)
      setModalOpen(true)
      setTimeout(function () {
        setModalOpen(false)
        setData("")
      }, 3000)
    } catch (err) {
      console.log("Reservation ID: " + reservationId)
      console.log(err.message)
      setMessageHeader("เช็คอินไม่สำเร็จ")
      setMessageBody(err.message)
      setModalOpen(true)
      setTimeout(function () {
        setModalOpen(false)
        setData("")
      }, 3000)
    }
  }, [])

  useEffect(() => {
    if (validTime && id && currentTime) {
      console.log("current time: " + currentTime)
      console.log("valid time: " + validTime)
      console.log("id: " + id)
      if (currentTime <= validTime) checkIn(id)
      else {
        setMessageHeader("คิวอาร์โค้ดหมดเวลา")
        setMessageBody("ID: " + id)
        setModalOpen(true)
        setTimeout(function () {
          setModalOpen(false)
          setData("")
        }, 3000)
      }
    }
  }, [validTime, id, checkIn])

  const refresh = () => {
    console.log("refresh")
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
            <video id="video" width="100%" style={{ border: "1px solid gray" }}></video>
          </div>
          <CheckinModal modalOpen={modalOpen} messageHeader={messageHeader} messageBody={messageBody} />
        </div>
      </div>
    </div>
  )
}

export default QRScannerPage

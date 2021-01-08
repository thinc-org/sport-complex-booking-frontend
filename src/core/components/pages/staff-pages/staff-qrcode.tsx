import React, { useState, useEffect, FunctionComponent, useCallback } from "react"

import { RouteComponentProps } from "react-router-dom"
import { BrowserQRCodeReader } from "@zxing/library"
import { client } from "../../../../axiosConfig"
import { Button } from "react-bootstrap"
import { CheckinModal } from "../../ui/Modals/CheckinModal"

const QRScannerPage: FunctionComponent<RouteComponentProps> = (props) => {
  const codeReader = new BrowserQRCodeReader()
  const [readingResult, setReadingResult] = useState<any>([])
  const [messageHeader, setMessageHeader] = useState<string>("")
  const [messageBody, setMessageBody] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [data, setData] = useState("")

  codeReader
    .decodeOnceFromVideoDevice(undefined, "video")
    .then((result) => {
      setReadingResult(result)
      setData(readingResult.text)
    })
    .catch((err) => console.error(err))

  const checkIn = useCallback(async (reservationId) => {
    try {
      const res = await client.patch("myreservation/" + reservationId)
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
    if (data) {
      console.log("data: " + data)
      checkIn(data)
    }
  }, [data, checkIn])

  const refresh = () => {
    console.log("refresh")
    return setData("")
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
            {" "}
            Refresh{" "}
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

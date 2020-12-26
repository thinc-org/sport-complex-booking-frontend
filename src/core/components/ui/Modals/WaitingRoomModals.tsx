import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface DetailsModalProps {
  show: Boolean,
  setShow(show: boolean): void,
  is_thai_language: Boolean,
  sportName?: String, 
  details: WaitingRoomData,
  date: Date,
  times: Number[],
  formatTime(time: Number): String,
  postDataToBackend(data: WaitingRoomData): void
}

export interface WaitingRoomData {
  sport_id: string,
  court_number: number,
  time_slot: number[],
  date:Date
}


export const DetailsModal: React.FC<DetailsModalProps> = ({ show, setShow, is_thai_language, sportName, details, date, times, formatTime, postDataToBackend }) => {
  const { t } = useTranslation()
  if (!show) return null
  return (
    <Modal className="modal" show={show} onHide={setShow(false)}>
      <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">
              {is_thai_language ? "คุณต้องการสร้างห้องรอการจองหรือไม่" : "Do you want to create a reservation waiting room?"}
            </h5>
            <button type="button" className="close" onClick={() => setShow(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h4>Reservation Details</h4>
            <ul>
              <li>{is_thai_language ? "กีฬา" : "Sport"}: {sportName}</li>
              <li>{is_thai_language ? "หมายเลขสนาม" : "Court"}: {details.court_number}</li>
              <li>{is_thai_language ? "วันที่" : "Date"}: {date.toString().substring(0,10)}</li>
              <li>{is_thai_language ? "เวลา" : "Time"}: <ul>{times.map(element => {
                return (<li key={element.toString()}>{formatTime(element)}</li>)
              })}</ul></li>
            </ul> 
          </div>
          <div className="modal-footer">
            <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal">
              {is_thai_language ? "ยกเลิก" : "Cancel"}
            </Button>
            <Button onClick={()=> postDataToBackend(details)} variant="pink" className="btn-normal">
              {is_thai_language ? "สร้าง" : "Create"}
            </Button>
          </div>
        </div>
    </Modal>
  )
}

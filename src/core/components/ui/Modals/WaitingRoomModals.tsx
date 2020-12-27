import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface DetailsModalProps {
  show: boolean,
  setShow(show: boolean): void,
  sportName?: string, 
  details: WaitingRoomData,
  date: Date,
  times: number[],
  formatTime(time: number): string,
  postDataToBackend(data: WaitingRoomData): void
}

export interface WaitingRoomData {
  sport_id: string,
  court_number: number,
  time_slot: number[],
  date:Date
}


export const DetailsModal: React.FC<DetailsModalProps> = ({ show, setShow, sportName, details, date, times, formatTime, postDataToBackend }) => {
  const { t } = useTranslation()
  if (!show) return null
  return (
    <Modal className="modal" show={show} onHide={setShow(false)}>
      <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">
              {t("wantToCreateWaitingRoom")}
            </h5>
            <button type="button" className="close" onClick={() => setShow(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h4>{t("reservation_details")}</h4>
            <ul>
              <li>{t("sport")}: {sportName}</li>
              <li>{t("court")}: {details.court_number}</li>
              <li>{t("bookingDate")}: {date.toString().substring(0,10)}</li>
              <li>{t("bookingTime")}: <ul>{times.map(element => {
                return (<li key={element.toString()}>{formatTime(element)}</li>)
              })}</ul></li>
            </ul> 
          </div>
          <div className="modal-footer">
            <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal">
              {t("cancel")}
            </Button>
            <Button onClick={()=> postDataToBackend(details)} variant="pink" className="btn-normal">
              {t("create")}
            </Button>
          </div>
        </div>
    </Modal>
  )
}

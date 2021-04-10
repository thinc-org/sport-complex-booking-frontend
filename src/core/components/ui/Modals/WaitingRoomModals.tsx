import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export interface DetailsModalProps {
  show: boolean
  setShow(show: boolean): void
  sportName?: string
  details: WaitingRoomData
  date: Date
  times: number[]
  formatTime(time: number): string
  postDataToBackend(data: WaitingRoomData): void
}

export interface WaitingRoomData {
  sport_id: string
  court_number: number
  time_slot: number[]
  date: Date
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ show, setShow, sportName, details, date, times, formatTime, postDataToBackend }) => {
  const { t } = useTranslation()

  if (!show) return null
  return (
    <Modal className="modal" show={show} onHide={() => setShow(false)}>
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
          <h4>{t("reservationDetails")}</h4>
          <ul>
            <li>
              {t("sport")}: {sportName}
            </li>
            <li>
              {t("court")}: {details["court_number"]}
            </li>
            <li>
              {t("bookingDate")}: {date.toLocaleDateString()}
            </li>
            <li>
              {t("bookingTime")}:{" "}
              {formatTime(times[0]).toString().substring(0, 5) +
                " - " +
                formatTime(times[times.length - 1])
                  .toString()
                  .substring(7, 13)}
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal">
            {t("cancel")}
          </Button>
          <Button onClick={() => postDataToBackend(details)} variant="pink" className="btn-normal">
            {t("create")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

interface CustomWaitingRoomModalProps {
  type: "wrongAccessCodeModal" | "cantCreateWaitingRoomModal"
  show: boolean
  setShow: (value: boolean) => void
}

export const CustomWaitingRoomModal: React.FC<CustomWaitingRoomModalProps> = ({ type, show, setShow }) => {
  const { t } = useTranslation()
  const message: {
    title: string
    body: string
  } = t(type, { returnObjects: true })
  if (!show) return null
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{message.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{message.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="pink" className="btn-normal" onClick={() => setShow(false)}>
          {t("ok")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

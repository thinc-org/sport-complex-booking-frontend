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
  const handlePostData = ()=> {
    postDataToBackend(details!)
    setShow(false)
  }
  if (!show) return null
  return (
    <Modal className="modal" show={show} onHide={()=>setShow(false)}>
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
              <li>{t("sport")}: {sportName}</li>
              <li>{t("court")}: {details['court_number']}</li>
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
            <Button onClick={handlePostData} variant="pink" className="btn-normal">
              {t("create")}
            </Button>
          </div>
        </div>
    </Modal>
  )
}

interface WrongAccessCodeProps{
  show: boolean
  setShowWrongAccessCodeModal: (value: boolean)=> void
}

export const WrongAccessCode:React.FC<WrongAccessCodeProps> = ({show, setShowWrongAccessCodeModal}) => {
  const { t } = useTranslation()  
  if(!show) return null
   return (
      <Modal
        className="modal"
        show={show}
        onHide={()=>{setShowWrongAccessCodeModal(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("wrongAccessCode")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {t("wrongAccessCodeMsg")} </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal btn-secondary" onClick={()=>setShowWrongAccessCodeModal(false)}>
            {t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}

interface CantCreateWaitingRoomProps{
  show: boolean
  setShowCantCreateWaitingRoomModal: (value: boolean)=> void
}

export const CantCreateWaitingRoom:React.FC<CantCreateWaitingRoomProps> = ({show, setShowCantCreateWaitingRoomModal}) => {
  const { t } = useTranslation()  
  if(!show) return null
   return (
      <Modal
        className="modal"
        show={show}
        onHide={()=>{setShowCantCreateWaitingRoomModal(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("createWaitingRoomUnsuccessful")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {t("createWaitingRoomUnsuccessfulMsg")} </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal btn-secondary" onClick={()=>setShowCantCreateWaitingRoomModal(false)}>
            {t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>
   )
}
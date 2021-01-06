import React from "react"
import {  Form, Row, Col, Button, Modal } from "react-bootstrap"
import TimePicker from 'react-time-picker';
import { useForm } from "react-hook-form"

export interface NoCourtsModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export  const NoCourtsModal: React.FC<NoCourtsModalProps> = ({show, setShow}) => {
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
        <Modal.Title>คําเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>ไม่พบข้อมูลของคอร์ดสําหรับกีฬาชนิดนี้</Modal.Body>
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

export interface CourtData {
    court_num?: number
    open_time?: number
    close_time?:number
    _id?: string
  }

export interface EditCourtProps {
  show: boolean
  setShow: (value: boolean) => void
  openTime: string
  closeTime: string
  onChangeOpenTime: (value: string) => void
  onChangeCloseTime: (value: string) => void,
  courts: CourtData[]
  currentCourt: CourtData | undefined
  currentSportName: string | undefined
  currentSportId: string
  updateCourt: (value: string)=> void
}

export const EditCourt:React.FC<EditCourtProps> = ({show, setShow, openTime, closeTime, onChangeOpenTime, onChangeCloseTime, courts, currentCourt, currentSportName, currentSportId, updateCourt}) => {
  const { register, handleSubmit} = useForm()
  const onSubmitEditCourt = (data: CourtData) => {
    console.log(data)
    const formattedOpenTime = (parseInt(openTime.substring(0,2))*2 + 1) + (Math.floor(parseInt(openTime.substring(3,5))/30))
    const formattedCloseTime = (parseInt(closeTime.substring(0,2))*2 + 1) + (Math.floor(parseInt(closeTime.substring(3,5))/30))
    const newCourt = {...data, court_num: currentCourt!['court_num'], open_time: formattedOpenTime, close_time: formattedCloseTime}
    courts.forEach((court, i) => {
      if (court['court_num'] === currentCourt!['court_num']) {
        courts[i] = newCourt
      }
    })
    updateCourt(currentSportId)
  }
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={handleSubmit(onSubmitEditCourt)}>
      <Modal.Header closeButton>
        <Modal.Title>รายละเอียดคอร์ด</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>
        <p className="font-weight-bold">เลขคอร์ด</p>
        <h5>{currentCourt!['court_num']}</h5>
        <p className="font-weight-bold">ประเภทกีฬา</p>
        <h5>{currentSportName}</h5>
        <Row>
          <Col>
            <p className="font-weight-bold">เวลาเปิด</p>
            <TimePicker className="time-picker mb-5" value={openTime} onChange={onChangeOpenTime} disableClock={true} type="number" ref={register} name="open_time"/>
          </Col>
          <Col>
            <p className="font-weight-bold">เวลาปิด</p>
            <TimePicker className="time-picker mb-5"  value={closeTime} onChange={onChangeCloseTime} disableClock={true} type="number" ref={register} name="close_time"/>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-pink"
          className="btn-normal"
          onClick={() => {
            setShow(false)
          }}
        >
          ยกเลิก
      </Button>
        <Button
          type="submit"
          variant="pink"
          className="btn-normal"
          onClick={() => {
            setShow(false)
          }}
        >
          บันทึก
      </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export interface DeleteCourtModalProps {
  show: boolean
  setShow: (value: boolean) => void
  deleteCourt: (value1: string, value2: string) => void
  currentCourt: CourtData
  currentSportId: string
}

export const DeleteCourtModal:React.FC<DeleteCourtModalProps> =({show, setShow, deleteCourt, currentCourt, currentSportId}) => {
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
        <Modal.Title>คําเตือน</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบคอร์ดนี้ออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-pink"
          className="btn-normal"
          onClick={() => {
            setShow(false)
          }}
        >
          ยกเลิก
        </Button>
        <Button
          variant="pink"
          className="btn-normal"
          onClick={() => {
            deleteCourt(currentCourt['_id']!, currentSportId)
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export interface AddCourtFuncProps {
  show: boolean
  setShow: (value: boolean) => void
  onChangeOpenTime: (e) => void
  onChangeCloseTime: (e) => void
  openTime: string
  closeTime: string
  courts: CourtData[]
  updateCourt: (value: string)=> void
  currentSportId: string
}

export const AddCourtFunc:React.FC<AddCourtFuncProps> = ({show, setShow, onChangeOpenTime, onChangeCloseTime, openTime, closeTime, courts, updateCourt, currentSportId}) => {
  const { register, handleSubmit, errors} = useForm()
  const onSubmitAddCourt = (data: CourtData) => {
    console.log(data)
    const formattedOpenTime = (parseInt(openTime.substring(0,2))*2 + 1) + (Math.floor(parseInt(openTime.substring(3,5))/30))
    const formattedCloseTime = (parseInt(closeTime.substring(0,2))*2 + 1) + (Math.floor(parseInt(closeTime.substring(3,5))/30))
    const newCourt = {...data, court_num: parseInt(data.court_num+''), open_time: formattedOpenTime, close_time: formattedCloseTime}
    courts.push(newCourt)
    updateCourt(currentSportId)
  }
  
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
        <Modal.Title>รายละเอียดของคอร์ด</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmitAddCourt)}>
      <div className="m-4">
          <Form.Group>
            <Row className="mx-1">
              <Form.Label>เลขคอร์ด</Form.Label>
              <Form.Control id="court_num" type="number" ref={register({
                required: "กรุณากรอกข้อมูล"
              })} name="court_num" placeholder="ตัวอย่าง 1" />
            </Row>
            {errors.court_num && <p id="input-error">{errors.court_num.message}</p>}
            <Row className="mt-3 mx-1">
              <Col className="p-0">
                <p className="font-weight-bold">เวลาเปิด</p>
                <TimePicker className="time-picker mb-5" value={openTime} onChange={onChangeOpenTime} disableClock={true} type="number" ref={register} name="open_time"/>
              </Col>
              <Col className="p-0">
                <p className="font-weight-bold">เวลาปิด</p>
                <TimePicker className="time-picker mb-5" value={closeTime} onChange={onChangeCloseTime} disableClock={true} type="number" ref={register} name="close_time"/>
              </Col>
            </Row>
          </Form.Group>
      </div>
      <Modal.Footer>
        <Button
          variant="outline-pink"
          className="btn-normal"
          onClick={() => {
            setShow(false)
          }}
        >
          ยกเลิก
        </Button>
        <Button
          type="submit"
          variant="pink"
          className="btn-normal"
        >
          ตกลง
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}
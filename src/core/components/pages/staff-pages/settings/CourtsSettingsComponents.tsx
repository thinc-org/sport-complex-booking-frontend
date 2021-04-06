import React, { useState } from "react"
import { Form, Row, Col, Button, Modal } from "react-bootstrap"
import TimePicker from "react-time-picker"
import { Control, useForm, useWatch } from "react-hook-form"
import { NormalModalProps, EditCourtProps, DeleteCourtModalProps, AddCourtFuncProps, ConflictModalProps } from "../../../../dto/settings.dto"
import { ErrorAlert } from "../disable-court/modals"
import { OverlapDataTable } from "../disable-court/disabled-court-table"

import { Court } from "../../../../dto/sport.dto"
import { formatOverlapData } from "../disable-court/conflictManager"
import { client } from "../../../../../axiosConfig"

const invalidTime = (openTime: string, closeTime: string): boolean => {
  return !["00"].includes(openTime.slice(openTime.length - 2)) || !["00"].includes(closeTime.slice(closeTime.length - 2))
}
const openAfterClose = (formattedOpenTime: number, formattedCloseTime: number): boolean => {
  if (formattedOpenTime > formattedCloseTime) return true
  else return false
}

const formatOpenTime = (openTime: string) => {
  return parseInt(openTime.substring(0, 2)) + 1
}

const formatCloseTime = (closeTime: string) => {
  return parseInt(closeTime.substring(0, 2))
}

export const NoCourtsModal: React.FC<NormalModalProps> = ({ show, setShow }) => {
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

export const EditCourt: React.FC<EditCourtProps> = ({
  show,
  setShow,
  openTime,
  closeTime,
  onChangeOpenTime,
  onChangeCloseTime,
  courts,
  currentCourt,
  currentSportName,
  currentSportId,
  updateCourt,
}) => {
  const { register, handleSubmit, control } = useForm()
  const onSubmitEditCourt = (data: Court) => {
    if (!currentCourt) return null
    const formattedOpenTime = formatOpenTime(openTime)
    const formattedCloseTime = formatCloseTime(closeTime)
    const newCourt = { ...data, court_num: currentCourt["court_num"], open_time: formattedOpenTime, close_time: formattedCloseTime }
    courts.forEach((court, i) => {
      if (court["court_num"] === currentCourt["court_num"]) {
        courts[i] = newCourt
      }
    })
    updateCourt(currentSportId)
  }

  function OpenTimeWatched({ control }: { control: Control }) {
    const open = useWatch({
      control,
      name: "open_time",
      defaultValue: openTime,
    })
    return <input ref={register} readOnly={true} className="invisible" name="open_time" value={open} />
  }

  function CloseTimeWatched({ control }: { control: Control }) {
    const close = useWatch({
      control,
      name: "close_time",
      defaultValue: closeTime,
    })
    return <input ref={register} readOnly={true} className="invisible" name="close_time" value={close} />
  }

  if (!currentCourt) return null
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
          <h5>{currentCourt["court_num"]}</h5>
          <p className="font-weight-bold">ประเภทกีฬา</p>
          <h5>{currentSportName}</h5>
          <Row>
            <Col>
              <p className="font-weight-bold">เวลาเปิด</p>
              <TimePicker
                className="time-picker mb-5"
                value={openTime}
                onChange={(value) => onChangeOpenTime(value ? value.toString() : "00:00")}
                disableClock={true}
                name="open_time"
              />
              <OpenTimeWatched control={control} />
            </Col>
            <Col>
              <p className="font-weight-bold">เวลาปิด</p>
              <TimePicker
                className="time-picker mb-5"
                value={closeTime}
                onChange={(value) => onChangeCloseTime(value ? value.toString() : "00:00")}
                disableClock={true}
                name="close_time"
              />
              <CloseTimeWatched control={control} />
            </Col>
          </Row>
          {invalidTime(openTime, closeTime) && <p className="input-error">กรุณากำหนดเวลาเป็นช่วงละ 1 ชั่วโมง</p>}
          {openAfterClose(formatOpenTime(openTime), formatCloseTime(closeTime)) && <p className="input-error">กรุณากำหนดเวลาปิดหลังเวลาเปิด</p>}
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
            disabled={invalidTime(openTime, closeTime) || openAfterClose(formatOpenTime(openTime), formatCloseTime(closeTime))}
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

export const DeleteCourtModal: React.FC<DeleteCourtModalProps> = ({ show, setShow, deleteCourt, currentCourt, currentSportId }) => {
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
            deleteCourt(currentCourt["_id"], currentSportId)
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const AddCourtFunc: React.FC<AddCourtFuncProps> = ({
  show,
  setShow,
  onChangeOpenTime,
  onChangeCloseTime,
  openTime,
  closeTime,
  courts,
  updateCourt,
  currentSportId,
}) => {
  const { register, handleSubmit, errors, control, getValues } = useForm()
  const [showRepeatCourt, setShowRepeatCourt] = useState(false)
  const formattedOpenTime = formatOpenTime(openTime)
  const formattedCloseTime = formatCloseTime(closeTime)
  const onSubmitAddCourt = (data: Court) => {
    function repeatedCourtNum(num: number) {
      let repeatExists = false
      courts.forEach((court) => {
        if (court.court_num === num) {
          setShowRepeatCourt(true)
          repeatExists = true
        }
      })
      setShowRepeatCourt(false)
      return repeatExists
    }
    const continueSubmission = !repeatedCourtNum(parseInt(getValues("court_num")))
    if (continueSubmission) {
      setShowRepeatCourt(false)
      const newCourt = { ...data, court_num: parseInt(data.court_num + ""), open_time: formattedOpenTime, close_time: formattedCloseTime }
      courts.push(newCourt)
      updateCourt(currentSportId)
    } else {
      setShowRepeatCourt(true)
    }
  }
  function OpenTimeWatched({ control }: { control: Control }) {
    const open = useWatch({
      control,
      name: "open_time",
      defaultValue: openTime,
    })
    return <input ref={register} readOnly={true} className="invisible" name="open_time" value={open} />
  }

  function CloseTimeWatched({ control }: { control: Control }) {
    const close = useWatch({
      control,
      name: "close_time",
      defaultValue: closeTime,
    })
    return <input ref={register} readOnly={true} className="invisible" name="close_time" value={close} />
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
              <Form.Control
                id="court_num"
                type="number"
                ref={register({
                  min: 0,
                  required: "กรุณากรอกข้อมูล",
                })}
                name="court_num"
                placeholder="ตัวอย่าง 1"
              />
            </Row>
            {errors.court_num && errors.court_num.type === "min" && <p id="input-error">ไม่สามารถตั้งหมายเลขคอร์ดเป็นเลขติดลบได้</p>}
            {showRepeatCourt && (
              <p id="input-error" className="m-1">
                ไม่สามารถกำหนดหมายเลขสนามซ้ำได้
              </p>
            )}
            {errors.court_num && (
              <p id="input-error" className="m-1">
                {errors.court_num.message}
              </p>
            )}
            <Row className="mt-3 mx-1">
              <Col className="p-0">
                <p className="font-weight-bold">เวลาเปิด</p>
                <TimePicker
                  className="time-picker mb-5"
                  value={openTime}
                  onChange={(value) => onChangeOpenTime(value ? value.toString() : "00:00")}
                  disableClock={true}
                  name="open_time"
                />
                <OpenTimeWatched control={control} />
              </Col>
              <Col className="p-0">
                <p className="font-weight-bold">เวลาปิด</p>
                <TimePicker
                  className="time-picker mb-5"
                  value={closeTime}
                  onChange={(value) => onChangeCloseTime(value ? value.toString() : "00:00")}
                  disableClock={true}
                  name="close_time"
                />
                <CloseTimeWatched control={control} />
              </Col>
            </Row>
            {invalidTime(openTime, closeTime) && <p className="input-error">กรุณากำหนดเวลาเป็นช่วงละ 1 ชั่วโมง</p>}
            {openAfterClose(formattedOpenTime, formattedCloseTime) && <p className="input-error">กรุณากำหนดเวลาปิดหลังเวลาเปิด</p>}
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
            disabled={invalidTime(openTime, closeTime) || openAfterClose(formattedOpenTime, formattedCloseTime)}
            className="btn-normal"
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export const ConflictModal: React.FC<ConflictModalProps> = ({ overlapData, inProp, handleClose }) => {
  const waitingRoomConflict = formatOverlapData(overlapData?.waitingRoom, "waitingRoom")
  const reservationConflict = formatOverlapData(overlapData?.reservation, "reservation")
  const onDeleteBatch = () => {
    overlapData?.disableCourt?.forEach((disableCourt) => {
      client
        .delete("/courts/disable-courts", { data: { sport_id: disableCourt.sport_id, court_num: disableCourt.court_num } })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })
  }
  return (
    <ErrorAlert inProp={inProp} handleClose={handleClose} header="พบการชนกันกับการลบครั้งนี้" message="">
      <div>
        {waitingRoomConflict.length !== 0 && (
          <div>
            <h5>ห้องรอที่ชน</h5>
            <OverlapDataTable data={waitingRoomConflict} />
          </div>
        )}
        {reservationConflict.length !== 0 && (
          <div>
            <h5>การจองที่ชน</h5>
            <OverlapDataTable data={reservationConflict} />
          </div>
        )}
        {overlapData?.disableCourt && (
          <div className="d-flex flex-column">
            <h5>จำนวนการปิดคอร์ดที่ชน: {overlapData.disableCourt.length}</h5>
            <Button variant="pink" style={{ color: "red" }} onClick={onDeleteBatch}>
              ลบการปิดคอร์ดทั้งหมด
            </Button>
          </div>
        )}
      </div>
    </ErrorAlert>
  )
}

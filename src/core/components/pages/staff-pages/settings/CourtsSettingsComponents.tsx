import React from "react"
import { Form, Row, Col, Button, Modal } from "react-bootstrap"
import TimePicker from "react-time-picker"
import { Control, useForm, useWatch } from "react-hook-form"
import { NoCourtsModalProps, EditCourtProps, DeleteCourtModalProps, AddCourtFuncProps } from "../../../../dto/settings.dto"
import { Court } from "../../../../dto/sport.dto"

const OpenTimeCalculation = (time: string) => {
  const equation: number = parseInt(time.substring(0, 2)) * 2 + 1 + Math.floor(parseInt(time.substring(3, 5)) / 30)
  return equation
}

const CloseTimeCalculation = (time: string) => {
  const equation: number = parseInt(time.substring(0, 2)) * 2 + 1 + Math.floor(parseInt(time.substring(3, 5)) / 30)
  return equation - 1
}

const invalidTime = (openTime: string, closeTime: string): boolean => {
  return !["00", "30"].includes(openTime.slice(openTime.length - 2)) || !["00", "30"].includes(closeTime.slice(closeTime.length - 2))
}
const openAfterClose = (formattedOpenTime: number, formattedCloseTime: number): boolean => {
  if (formattedOpenTime >= formattedCloseTime) return true
  else return false
}

const formatOpenTime = (openTime: string) => {
  return parseInt(openTime.substring(0, 2)) * 2 + 1 + Math.floor(parseInt(openTime.substring(3, 5)) / 30)
}

const formatCloseTime = (closeTime: string) => {
  return parseInt(closeTime.substring(0, 2)) * 2 + Math.floor(parseInt(closeTime.substring(3, 5)) / 30)
}

export const NoCourtsModal: React.FC<NoCourtsModalProps> = ({ show, setShow }) => {
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
    const formattedOpenTime = formatOpenTime(openTime)
    const formattedCloseTime = formatCloseTime(closeTime)
    const newCourt = { ...data, court_num: currentCourt!["court_num"], open_time: formattedOpenTime, close_time: formattedCloseTime }
    courts.forEach((court, i) => {
      if (court["court_num"] === currentCourt!["court_num"]) {
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
          <h5>{currentCourt!["court_num"]}</h5>
          <p className="font-weight-bold">ประเภทกีฬา</p>
          <h5>{currentSportName}</h5>
          <Row>
            <Col>
              <p className="font-weight-bold">เวลาเปิด</p>
              <TimePicker
                className="time-picker mb-5"
                value={openTime}
                onChange={(value) => onChangeOpenTime(value.toString())}
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
                onChange={(value) => onChangeCloseTime(value.toString())}
                disableClock={true}
                name="close_time"
              />
              <CloseTimeWatched control={control} />
            </Col>
          </Row>
          {invalidTime(openTime, closeTime) && <p className="input-error">กรุณากำหนดเวลาเป็นช่วงละครึ่งชั่วโมง</p>}
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
            deleteCourt(currentCourt["_id"]!, currentSportId)
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
  const { register, handleSubmit, errors, control } = useForm()
  const formattedOpenTime = OpenTimeCalculation(openTime)
  const formattedCloseTime = CloseTimeCalculation(closeTime)
  const onSubmitAddCourt = (data: Court) => {
    const newCourt = { ...data, court_num: parseInt(data.court_num + ""), open_time: formattedOpenTime, close_time: formattedCloseTime }
    courts.push(newCourt)
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
                  min: 1,
                  required: "กรุณากรอกข้อมูล",
                })}
                name="court_num"
                placeholder="ตัวอย่าง 1"
              />
            </Row>
            {errors.court_num && errors.court_num.type === "min" && <p id="input-error">ไม่สามารถตั้งหมายเลขคอร์ดเป็นเลขติดลบได้</p>}
            {errors.court_num && <p id="input-error">{errors.court_num.message}</p>}
            <Row className="mt-3 mx-1">
              <Col className="p-0">
                <p className="font-weight-bold">เวลาเปิด</p>
                <TimePicker
                  className="time-picker mb-5"
                  value={openTime}
                  onChange={(value) => onChangeOpenTime(value.toString())}
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
                  onChange={(value) => onChangeCloseTime(value.toString())}
                  disableClock={true}
                  name="close_time"
                />
                <CloseTimeWatched control={control} />
              </Col>
            </Row>
            {invalidTime(openTime, closeTime) && <p className="input-error">กรุณากำหนดเวลาเป็นช่วงละครึ่งชั่วโมง</p>}
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

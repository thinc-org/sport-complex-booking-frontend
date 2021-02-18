import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from "react"
import { Form, Row, Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { DeleteSportProps, AddSportProps, NormalModalProps, EditSportProps } from "../../../../dto/settings.dto"
import { addSportSchema } from "../../../../schemas/addSportSchema"

export const DeleteSport: React.FC<DeleteSportProps> = ({ show, setShow, mainFunction, data }) => {
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
      <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบกีฬาออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
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
            mainFunction(data)
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const AddSport: React.FC<AddSportProps> = ({ show, setShow, onSubmitAddSport }) => {
  const { register, handleSubmit, getValues, setValue, errors } = useForm({ resolver: yupResolver(addSportSchema) })
  const [reservationTime, setReservationTime] = useState(60)
  const [minMembers, setMinMembers] = useState(5)
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={true}
    >
      <form onSubmit={handleSubmit(onSubmitAddSport)}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มกีฬา</Modal.Title>
        </Modal.Header>
        <div className="mx-4 p-3">
          <Form.Group>
            <Row>
              <Form.Label>ประเภทกีฬา (ภาษาไทย)</Form.Label>
              <input type="text" placeholder="ประเภทกีฬาภาษาไทย" ref={register} name="sport_name_th" className="form-control" />
            </Row>
            {errors.sport_name_th && <p id="input-error">{errors.sport_name_th.message}</p>}
            <Row>
              <Form.Label>ประเภทกีฬา (ภาษาอังกฤษ)</Form.Label>
              <input type="text" placeholder="ประเภทกีฬาภาษาอังกฤษ" ref={register} name="sport_name_en" className="form-control" />
            </Row>
            {errors.sport_name_en && <p id="input-error">{errors.sport_name_en.message}</p>}
          </Form.Group>
        </div>

        <div className="card mx-4">
          <h5 className="card-header">เวลาการจองมากที่สุด (นาที)</h5>
          <div className="card-body">
            <span className="d-flex justify-content-between">
              <Button
                variant="pink"
                className="button"
                disabled={reservationTime <= 60}
                onClick={() => {
                  setValue("quota", parseInt(getValues("quota")) - 60)
                  setReservationTime(reservationTime - 60)
                }}
              >
                -60
              </Button>
              <input type="number" readOnly={true} ref={register} name="quota" defaultValue={60} className="form-control square-input" />
              <Button
                variant="pink"
                className="button"
                onClick={() => {
                  setValue("quota", parseInt(getValues("quota")) + 60)
                  setReservationTime(reservationTime + 60)
                }}
              >
                +60
              </Button>
            </span>
          </div>
        </div>

        <div className="card mx-4 mt-4">
          <h5 className="card-header">จํานวนผู้จองขั้นต่ำ (คน)</h5>
          <div className="card-body">
            <span className="d-flex justify-content-between">
              <Button
                variant="pink"
                className="button"
                disabled={minMembers <= 6}
                onClick={() => {
                  setValue("required_user", parseInt(getValues("required_user")) - 5)
                  setMinMembers(minMembers - 5)
                }}
              >
                -5
              </Button>
              <Button
                variant="pink"
                className="button"
                disabled={minMembers <= 2}
                onClick={() => {
                  setValue("required_user", parseInt(getValues("required_user")) - 1)
                  setMinMembers(minMembers - 1)
                }}
              >
                -1
              </Button>
              <input type="number" readOnly={true} ref={register} name="required_user" defaultValue="5" className="form-control square-input" />
              <Button
                variant="pink"
                className="button"
                onClick={() => {
                  setValue("required_user", parseInt(getValues("required_user")) + 1)
                  setMinMembers(minMembers + 1)
                }}
              >
                +1
              </Button>
              <Button
                variant="pink"
                className="button"
                onClick={() => {
                  setValue("required_user", parseInt(getValues("required_user")) + 5)
                  setMinMembers(minMembers + 5)
                }}
              >
                +5
              </Button>
            </span>
          </div>
        </div>

        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              setShow(false)
            }}
          >
            {" "}
            ยกเลิก
          </Button>
          <Button type="submit" variant="pink" className="btn-normal">
            เพิ่ม
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export const HandleError: React.FC<NormalModalProps> = ({ show, setShow, message }) => {
  if (!show) return null
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
        <Modal.Title>คําเตือน: เกิดเหตุขัดข้อง</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "lighter" }}>{message ? message : "กรุณาลองใหม่อีกครั้ง"}</Modal.Body>
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

export const EditSport: React.FC<EditSportProps> = ({ show, setShow, setCurrentSport, sendEdittedSportInfo, currentSport }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>ประเภทกีฬา: {currentSport["sport_name_th"]}</Modal.Title>
      </Modal.Header>
      <div className="card">
        <h5 className="card-header">เวลาการจองมากที่สุด</h5>
        <div className="card-body">
          <span className="d-flex justify-content-between">
            <Button
              variant="pink"
              className="button"
              disabled={currentSport["quota"] <= 1}
              onClick={() => {
                setCurrentSport({ ...currentSport, quota: currentSport["quota"] - 1 })
              }}
            >
              -60
            </Button>
            <span className="mt-3">{currentSport["quota"] * 60} นาที</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setCurrentSport({ ...currentSport, quota: currentSport["quota"] + 1 })
              }}
            >
              +60
            </Button>
          </span>
        </div>
      </div>

      <div className="card">
        <h5 className="card-header">จํานวนผู้จองขั้นต่ำ</h5>
        <div className="card-body">
          <span className="d-flex justify-content-between">
            <Button
              variant="pink"
              className="button"
              disabled={currentSport["required_user"] <= 3}
              onClick={() => {
                setCurrentSport({ ...currentSport, required_user: currentSport["required_user"] - 2 })
              }}
            >
              -2
            </Button>
            <Button
              variant="pink"
              className="button"
              disabled={currentSport["required_user"] <= 2}
              onClick={() => {
                setCurrentSport({ ...currentSport, required_user: currentSport["required_user"] - 1 })
              }}
            >
              -1{" "}
            </Button>
            <span className="mt-3">{currentSport["required_user"]} คน</span>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setCurrentSport({ ...currentSport, required_user: currentSport["required_user"] + 1 })
              }}
            >
              +1
            </Button>
            <Button
              variant="pink"
              className="button"
              onClick={() => {
                setCurrentSport({ ...currentSport, required_user: currentSport["required_user"] + 2 })
              }}
            >
              +2
            </Button>
          </span>
        </div>
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
          variant="pink"
          className="btn-normal"
          onClick={() => {
            sendEdittedSportInfo(currentSport)
          }}
        >
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

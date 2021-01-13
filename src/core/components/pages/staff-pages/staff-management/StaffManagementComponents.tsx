import React from "react"
import { Form, Row, Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordSchema } from "./StaffManagementSchema"
import { DeleteStaffModalProps, EditStaffModalProps, AddStaffModalProps, HandleErrorModalProps } from "../../../../dto/staffManagement.dto"

export const DeleteStaffModal: React.FC<DeleteStaffModalProps> = ({ show, setShow, mainFunction, data }) => {
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
      <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบพนักงานออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
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

export const EditStaffModal: React.FC<EditStaffModalProps> = ({ show, setShow }) => {
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
      <Modal.Body style={{ fontWeight: "lighter" }}>{"ท่านได้ทําการเปลี่ยนสถานะของพนักงาน กรุณากด'ตกลง'เพื่อการดําเนินต่อ"}</Modal.Body>
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

export const AddStaffModal: React.FC<AddStaffModalProps> = ({ show, setShow, onSubmitAddStaff }) => {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(passwordSchema) })
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
      backdrop="static"
      keyboard={true}
    >
      <form onSubmit={handleSubmit(onSubmitAddStaff)}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มพนักงาน</Modal.Title>
        </Modal.Header>
        <div className="m-4">
          <Form.Group>
            <Row>
              <Form.Label>ชื่อ</Form.Label>
              <input type="text" ref={register} name="name" className="form-control" />
            </Row>
            {errors.name && <p id="input-error">{errors.name.message}</p>}
            <Row>
              <Form.Label>นามสกุล</Form.Label>
              <input type="text" ref={register} name="surname" className="form-control" />
            </Row>
            {errors.surname && <p id="input-error">{errors.surname.message}</p>}
            <Row>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <input type="text" ref={register} name="username" className="form-control" />
            </Row>
            {errors.username && <p id="input-error">{errors.username.message}</p>}
            <Row>
              <Form.Label>รหัสผ่าน</Form.Label>
              <input type="password" ref={register} name="password" className="form-control" />
            </Row>
            {errors.password && <p id="input-error">{errors.password.message}</p>}
            <Row>
              <Form.Label>กรอกรหัสผ่านอีกครั้ง</Form.Label>
              <input type="password" ref={register} name="recheckpassword" className="form-control" />
            </Row>
            {errors.recheckpassword && <p id="input-error">{errors.recheckpassword.message}</p>}
            <Row>
              <Form.Label>ประเภท</Form.Label>
              <Form.Control as="select" custom ref={register} name="is_admin">
                <option disabled value="ประเภท">
                  ประเภท
                </option>
                <option value="สตาฟ">สตาฟ</option>
                <option value="แอดมิน">แอดมิน</option>
              </Form.Control>
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

export const HandleErrorModal: React.FC<HandleErrorModalProps> = ({ show, setShow }) => {
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
      <Modal.Body style={{ fontWeight: "lighter" }}>กรุณาลองใหม่อีกครั้ง</Modal.Body>
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

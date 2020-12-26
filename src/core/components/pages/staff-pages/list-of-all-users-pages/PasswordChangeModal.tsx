import React, { FunctionComponent, useState } from "react"
import { Modal, Form, InputGroup, Button } from "react-bootstrap"
import { PasswordToggle } from "../interfaces/InfoInterface"

interface propsInterface {
  show_change: boolean
  set_show_change: React.Dispatch<React.SetStateAction<boolean>>
  set_new_password: React.Dispatch<React.SetStateAction<string>>
  set_confirm_password: React.Dispatch<React.SetStateAction<string>>
  info: {
    handleChangePassword: () => void
    handleChange: (e) => void
  }
}

const PasswordChangeModal: FunctionComponent<propsInterface> = ({ show_change, set_show_change, set_new_password, set_confirm_password, info }) => {
  // page state
  const [show_password, set_show_password] = useState<PasswordToggle>({
    old_password: false,
    new_password: false,
    confirm_password: false,
  })

  return (
    <Modal
      show={show_change}
      onHide={() => {
        set_show_change(false)
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton />
      <Modal.Body style={{ fontWeight: "lighter" }}>
        <Form>
          <Form.Group>
            <Form.Label>รหัสผ่านเก่า</Form.Label>
            <InputGroup>
              <Form.Control id="password" type={show_password.old_password ? "text" : "password"} onChange={info.handleChange} />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    set_show_password({ ...show_password, old_password: !show_password.old_password })
                  }}
                >
                  {show_password.old_password ? "Hide" : "Show"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>รหัสผ่านใหม่</Form.Label>
            <InputGroup>
              <Form.Control
                type={show_password.new_password ? "text" : "password"}
                onChange={(e) => {
                  set_new_password(e.target.value)
                }}
              />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    set_show_password({ ...show_password, new_password: !show_password.new_password })
                  }}
                >
                  {show_password.new_password ? "Hide" : "Show"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>กรอกรหัสผ่านใหม่อีกครั้ง</Form.Label>
            <InputGroup>
              <Form.Control
                type={show_password.confirm_password ? "text" : "password"}
                onChange={(e) => {
                  set_confirm_password(e.target.value)
                }}
              />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    set_show_password({ ...show_password, confirm_password: !show_password.confirm_password })
                  }}
                >
                  {show_password.confirm_password ? "Hide" : "Show"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          className="btn-normal btn-outline-pink"
          onClick={() => {
            set_show_change(false)
          }}
        >
          ยกเลิก
        </Button>
        <Button variant="pink" className="btn-normal" onClick={info.handleChangePassword}>
          ตกลง
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PasswordChangeModal

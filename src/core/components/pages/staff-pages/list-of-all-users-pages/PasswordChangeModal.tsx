import React, { FunctionComponent, useState } from "react"
import { Modal, Form, InputGroup, Button } from "react-bootstrap"
import { PasswordToggle } from "../interfaces/InfoInterface"

interface propsInterface {
  showChange: boolean
  setShowChange: React.Dispatch<React.SetStateAction<boolean>>
  setNewPassword: React.Dispatch<React.SetStateAction<string>>
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
  info: {
    handleChangePassword: () => void
    handleChange: (e) => void
  }
}

const PasswordChangeModal: FunctionComponent<propsInterface> = ({ showChange, setShowChange, setNewPassword, setConfirmPassword, info }) => {
  // page state
  const [showPassword, setShowPassword] = useState<PasswordToggle>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  return (
    <Modal
      show={showChange}
      onHide={() => {
        setShowChange(false)
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
              <Form.Control id="password" type={showPassword.oldPassword ? "text" : "password"} onChange={info.handleChange} />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })
                  }}
                >
                  {showPassword.oldPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>รหัสผ่านใหม่</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.newPassword ? "text" : "password"}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })
                  }}
                >
                  {showPassword.newPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>กรอกรหัสผ่านใหม่อีกครั้ง</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.confirmPassword ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
              <InputGroup.Append>
                <Button
                  className="btn-normal btn-outline-black"
                  variant="secondary"
                  onClick={() => {
                    setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
                  }}
                >
                  {showPassword.confirmPassword ? "Hide" : "Show"}
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
            setShowChange(false)
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

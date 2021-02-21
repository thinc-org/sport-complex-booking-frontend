import React, { FunctionComponent, useState } from "react"
import { Modal, Form, InputGroup, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ModalUserInfo } from "../interfaces/InfoInterface"

interface propsInterface {
  showModals: ModalUserInfo
  setShowModals: React.Dispatch<React.SetStateAction<ModalUserInfo>>
  setNewPassword: React.Dispatch<React.SetStateAction<string>>
}

interface passwordFormInfo {
  newPassword: string
  confirmPassword: string
}

interface PasswordToggle {
  newPassword: boolean
  confirmPassword: boolean
}

const PasswordChangeModal: FunctionComponent<propsInterface> = ({ showModals, setShowModals, setNewPassword }) => {
  // page state
  const [showPassword, setShowPassword] = useState<PasswordToggle>({
    newPassword: false,
    confirmPassword: false,
  })

  const { register, handleSubmit } = useForm()

  // handle //
  const handleChangePassword = (data: passwordFormInfo) => {
    const { newPassword, confirmPassword } = data
    if (newPassword !== confirmPassword) setShowModals("showPasswordErr")
    else {
      setNewPassword(data.newPassword)
      setShowModals("showConfirmChange")
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleChangePassword)}>
      <Modal
        show={showModals === "showChangePassword"}
        onHide={() => {
          setShowModals("none")
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton />
        <Modal.Body style={{ fontWeight: "lighter" }}>
          <Form.Group>
            <Form.Label>รหัสผ่านใหม่</Form.Label>
            <InputGroup>
              <Form.Control ref={register} name="newPassword" type={showPassword.newPassword ? "text" : "password"} defaultValue="" />
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
              <Form.Control ref={register} name="confirmPassword" type={showPassword.confirmPassword ? "text" : "password"} defaultValue="" />
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowModals("none")
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" type="submit" onClick={handleSubmit(handleChangePassword)}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}

export default PasswordChangeModal

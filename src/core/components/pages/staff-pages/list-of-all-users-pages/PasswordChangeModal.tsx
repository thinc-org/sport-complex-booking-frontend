import React, { FunctionComponent, useState } from "react"
import { Modal, Form, InputGroup, Button } from "react-bootstrap"
// import {useParams} from "react-router-dom"
import { useForm } from "react-hook-form"
import { PasswordToggle, ModalUserInfo } from "../interfaces/InfoInterface"
// import {client} from "../../../../../axiosConfig"

interface propsInterface {
  showModals: ModalUserInfo
  setShowModals: React.Dispatch<React.SetStateAction<ModalUserInfo>>
  oldPassword: string
  setNewPassword: React.Dispatch<React.SetStateAction<string>>
}

interface passwordFormInfo {
  password: string
  newPassword: string
  confirmPassword: string
}

const PasswordChangeModal: FunctionComponent<propsInterface> = ({ showModals, setShowModals, oldPassword, setNewPassword }) => {
  // page state
  const [showPassword, setShowPassword] = useState<PasswordToggle>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const { register, handleSubmit } = useForm()

  // handle //
  const handleChangePassword = (data: passwordFormInfo) => {
    console.log(data)
    const { password, newPassword, confirmPassword } = data
    if (password !== oldPassword || newPassword !== confirmPassword) setShowModals({ ...showModals, showPasswordErr: true })
    else {
      setNewPassword(data.newPassword)
      setShowModals({ ...showModals, showConfirmChange: true })
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleChangePassword)}>
      <Modal
        show={showModals.showChangePassword}
        onHide={() => {
          setShowModals({ ...showModals, showChangePassword: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton />
        <Modal.Body style={{ fontWeight: "lighter" }}>
          <Form.Group>
            <Form.Label>รหัสผ่านเก่า</Form.Label>
            <InputGroup>
              <Form.Control ref={register} name="password" type={showPassword.oldPassword ? "text" : "password"} defaultValue="" />
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
              setShowModals({ ...showModals, showChangePassword: false })
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

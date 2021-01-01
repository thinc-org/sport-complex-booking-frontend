import React, { useState } from "react"
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap"

interface ChangePasswordProps {
  selectingSatit: boolean
  newPass: string
  conPass: string
  info: { handleChange: (e) => void; setConfirmPassword: React.Dispatch<React.SetStateAction<string>> }
}

const ChangePasswordComponent: React.FC<ChangePasswordProps> = ({ selectingSatit, newPass, conPass, info }) => {
  // states //
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConPassword, setShowConPassword] = useState<boolean>(false)

  const { handleChange, setConfirmPassword } = info
  return (
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>{selectingSatit ? "รหัสผ่าน" : "รหัสผ่าน (เบอร์โทรศัพท์)"}</Form.Label>
          <InputGroup>
            <Form.Control id="password" type={showPassword ? "text" : "password"} onChange={handleChange} value={newPass} />
            <InputGroup.Append>
              <Button
                className="btn-normal btn-outline-black"
                variant="secondary"
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>กรอกรหัสผ่านอีกครั้ง</Form.Label>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              value={conPass}
              type={showConPassword ? "text" : "password"}
            />
            <InputGroup.Append>
              <Button
                className="btn-normal btn-outline-black"
                variant="secondary"
                onClick={() => {
                  setShowConPassword(!showConPassword)
                }}
              >
                {showConPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Col>
    </Row>
  )
}

export default ChangePasswordComponent

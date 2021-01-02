import React, { useState } from "react"
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap"
import { AddUserComponentInfo } from "../interfaces/InfoInterface"

interface ChangePasswordProps {
  selectingSatit: boolean
  info: { handleAdd: (data: AddUserComponentInfo) => void; register: any; handleSubmit: any }
}

const ChangePasswordComponent: React.FC<ChangePasswordProps> = ({ selectingSatit, info }) => {
  // states //
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConPassword, setShowConPassword] = useState<boolean>(false)

  const { handleAdd, register, handleSubmit } = info
  return (
    <Form onSubmit={handleSubmit(handleAdd)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>{selectingSatit ? "รหัสผ่าน" : "รหัสผ่าน (เบอร์โทรศัพท์)"}</Form.Label>
            <InputGroup>
              <Form.Control ref={register} name="password" type={showPassword ? "text" : "password"} defaultValue={""} />
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
              <Form.Control ref={register} name="confirmPassword" defaultValue={""} type={showConPassword ? "text" : "password"} />
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
    </Form>
  )
}

export default ChangePasswordComponent

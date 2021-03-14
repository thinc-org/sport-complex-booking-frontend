import React, { FunctionComponent, useState } from "react"
import { Form, Card, Row, Col, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import { AddInfo, ModalAddUser, AlertAddUser, AddUserComponentInfo } from "../interfaces/InfoInterface"
import { client } from "../../../../../axiosConfig"
import ChangePasswordComponent from "./AddUserPasswordComponent"
import { AddModal, ComModal, ErrModal, UsernameErrModal, AlertUncom, AlertErrorPassword, AlertInvalidUsername } from "./AddUserModalAndAlert"
import { yupResolver } from "@hookform/resolvers/yup"
import { emailSchema } from "../../../../schemas/editUserInfo"

const AddUser: FunctionComponent = () => {
  // Modals & Alerts //
  const [showModals, setShowModals] = useState<ModalAddUser>("none")
  const [showAlerts, setShowAlerts] = useState<AlertAddUser>("none")

  // User states //
  const [user, setUser] = useState<AddInfo>({
    membership_type: "นักเรียนสาธิตจุฬา / บุคลากรจุฬา",
    is_thai_language: true,
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    username: "",
    password: "",
    personal_email: "",
    phone: "",
  })

  const methods = useForm({ resolver: yupResolver(emailSchema) })
  const { register, handleSubmit, errors } = methods
  const history = useHistory()

  // functions //
  const validCheck = (s: string) => {
    if (s !== "") return s.match(/.*([A-z])+.*/g)
    return false
  }

  const handleAdd = (data: AddUserComponentInfo) => {
    const { confirmPassword, ...rest } = data
    const { username, name_th, surname_th, name_en, surname_en, phone, password, is_thai_language } = rest
    const newUser = {
      ...rest,
      membership_type: "นักเรียนสาธิตจุฬา / บุคลากรจุฬา",
      personal_email: username,
      is_thai_language: is_thai_language ? true : false,
    }
    setUser(newUser)
    if (!validCheck(username)) setShowAlerts("showAlertUsername")
    else if (password !== confirmPassword) setShowAlerts("showAlertPassword")
    else if (
      username !== "" &&
      password !== "" &&
      name_th !== "" &&
      surname_th !== "" &&
      name_en !== "" &&
      surname_en !== "" &&
      username !== "" &&
      phone !== ""
    )
      setShowModals("showAdd")
    else setShowAlerts("showAlertUncom")
  }

  // requests //
  const requestAdd = () => {
    client({
      method: "POST",
      url: "/list-all-user/SatitUser",
      data: user,
    })
      .then(() => {
        setShowModals("showCom")
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 400) setShowModals("showUsernameErr")
        else if (response && response.data.statusCode === 401) history.push("/staff")
        else setShowModals("showErr")
      })
  }

  // renders //
  const renderSatitForm = () => {
    const { name_th, surname_th, name_en, surname_en, phone, username, is_thai_language } = user
    return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleAdd)}>
          <Form.Group>
            <Form.Label>ภาษา</Form.Label>
            <Form.Control ref={register} name="is_thai_language" className="m-0" as="select" defaultValue={is_thai_language ? 1 : 0}>
              <option value={1}>ภาษาไทย</option>
              <option value={0}>English</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>ชื่อ (ภาษาไทย)</Form.Label>
                <Form.Control ref={register} name="name_th" defaultValue={name_th} />
              </Col>
              <Col>
                <Form.Label>นามสกุล (ภาษาไทย)</Form.Label>
                <Form.Control ref={register} name="surname_th" defaultValue={surname_th} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>ชื่อ (ภาษาอังกฤษ)</Form.Label>
                <Form.Control ref={register} name="name_en" defaultValue={name_en} />
              </Col>
              <Col>
                <Form.Label>นามสกุล (ภาษาอังกฤษ)</Form.Label>
                <Form.Control ref={register} name="surname_en" defaultValue={surname_en} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Label>ชื่อผู้ใช้ (อีเมล)</Form.Label>
                <Form.Control ref={register} name="username" defaultValue={username} />
                {errors.username && (
                  <span role="alert" style={{ fontWeight: "lighter", color: "red" }}>
                    {errors.username.message}
                  </span>
                )}
              </Col>
              <Col>
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control ref={register} name="phone" defaultValue={phone} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <ChangePasswordComponent />
            <AlertInvalidUsername show={showAlerts} />
            <AlertErrorPassword show={showAlerts} />
          </Form.Group>
        </Form>
      </FormProvider>
    )
  }

  const renderModals = () => {
    return (
      <div>
        <AddModal show={showModals} setShow={setShowModals} requestAdd={requestAdd} />
        <ComModal show={showModals} setShow={setShowModals} />
        <ErrModal show={showModals} setShow={setShowModals} />
        <UsernameErrModal show={showModals} setShow={setShowModals} />
      </div>
    )
  }

  return (
    <div className="addUser">
      <Card body border="light" className="shadow px-3 py-3 mb-5 mt-4 mr-4">
        {renderSatitForm()}
        <AlertUncom show={showAlerts} />
        <Row className="pt-5">
          <Col className="text-right">
            <Link to="/staff/listOfAllUsers">
              <Button size="lg" variant="outline-secondary" className="mr-2 btn-normal btn-outline-pink">
                ยกเลิก
              </Button>
            </Link>
            <Button size="lg" variant="pink" className="btn-normal" onClick={handleSubmit(handleAdd)}>
              เพิ่ม
            </Button>
          </Col>
        </Row>
      </Card>
      {renderModals()}
    </div>
  )
}

export default AddUser

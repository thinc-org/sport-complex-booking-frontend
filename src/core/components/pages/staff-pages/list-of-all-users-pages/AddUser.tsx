import React, { FunctionComponent, useState } from "react"
import { Form, Card, Row, Col, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import { AddInfo, ModalAddUser, AlertAddUser, AddUserComponentInfo } from "../interfaces/InfoInterface"
import { client } from "../../../../../axiosConfig"
import ChangePasswordComponent from "./AddUserPasswordComponent"
import { AddModal, ComModal, ErrModal, UsernameErrModal, AlertUncom, AlertErrorPassword, AlertInvalidUsername } from "./AddUserModalAndAlert"

const AddUser: FunctionComponent = () => {
  // Page states //
  const [selectingSatit, setSelectingSatit] = useState<boolean>(false)
  // Modals & Alerts //
  const [showModals, setShowModals] = useState<ModalAddUser>({
    showAdd: false,
    showCom: false,
    showErr: false,
    showUsernameErr: false,
  })
  const [showAlerts, setShowAlerts] = useState<AlertAddUser>({
    showAlertUncom: false,
    showAlertUsername: false,
    showAlertPassword: false,
  })

  // User states //
  const [user, setUser] = useState<AddInfo>({
    membership_type: "",
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

  const methods = useForm()
  const { register, handleSubmit, errors } = methods
  const history = useHistory()

  // functions //
  const validCheck = (s: string) => {
    if (s !== "") return s.match(/.*([A-z])+.*/g)
    return false
  }

  // renders //
  const renderSelector = (option: number) => {
    return (
      <Form.Group>
        <Form.Label>ประเภท</Form.Label>
        <Form.Control className="m-0" as="select" onChange={handleChangeType} defaultValue={option}>
          <option value={0} disabled>
            เลือกประเภทสมาชิก
          </option>
          <option>สมาชิกสามัญ ก (staff membership)</option>
          <option>สมาชิกสามัญ ข (student membership)</option>
          <option>สมาชิกสามัญสมทบ ก (staff-spouse membership)</option>
          <option>สมาชิกสามัญสมทบ ข (alumni membership)</option>
          <option>สมาชิกวิสามัญ (full membership)</option>
          <option>สมาชิกวิสามัญสมทบ (full membership-spouse and children)</option>
          <option>สมาชิกวิสามัญเฉพาะสนามกีฬาในร่ม (indoor stadium)</option>
          <option>สมาชิกวิสามัญสมทบเฉพาะสนามกีฬาในร่ม (indoor stadium-spouse and children)</option>
          <option>สมาชิกรายเดือนสนามกีฬาในร่ม (monthly membership-indoor stadium)</option>
          <option>นักเรียนสาธิตจุฬา / บุคลากรจุฬา</option>
        </Form.Control>
      </Form.Group>
    )
  }

  const renderNormalForm = () => {
    return (
      <Form onSubmit={handleSubmit(handleAdd)}>
        {renderSelector(0)}
        <Form.Group>
          <Form.Label>ชื่อผู้ใช้ (อีเมล)</Form.Label>
          <Form.Control ref={register} name="username" defaultValue={user.username} />
        </Form.Group>
        <AlertInvalidUsername show={showAlerts} />
        <ChangePasswordComponent selectingSatit={selectingSatit} />
        <AlertErrorPassword show={showAlerts} />
      </Form>
    )
  }

  const renderSatitForm = () => {
    const { name_th, surname_th, name_en, surname_en, phone, username, is_thai_language } = user
    return (
      <Form onSubmit={handleSubmit(handleAdd)}>
        {renderSelector(9)}
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
              <Form.Control
                ref={register({
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                name="username"
                defaultValue={username}
              />
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
          <Row className="mb-3">
            <Col>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control ref={register} name="username" defaultValue={username} />
            </Col>
          </Row>
          <ChangePasswordComponent selectingSatit={selectingSatit} />
          <AlertInvalidUsername show={showAlerts} />
          <AlertErrorPassword show={showAlerts} />
        </Form.Group>
      </Form>
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

  // handles //
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, membership_type: e.target.value })
    if (e.target.value === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || user.membership_type === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา")
      setSelectingSatit(!selectingSatit)
  }

  const handleAdd = (data: AddUserComponentInfo) => {
    const { confirmPassword, ...rest } = data
    const { username, name_th, surname_th, name_en, surname_en, personal_email, phone, password } = rest
    const newUser = data.is_thai_language ? { ...rest, membership_type: user.membership_type } : { ...user, username: data.username }
    setUser(newUser)
    if (!validCheck(username)) setShowAlerts({ showAlertPassword: false, showAlertUncom: false, showAlertUsername: true })
    else if (password !== confirmPassword) setShowAlerts({ showAlertUncom: false, showAlertUsername: false, showAlertPassword: true })
    else if (user.membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && user.membership_type && username !== "" && password !== "")
      setShowModals({ ...showModals, showAdd: true })
    else if (
      user.membership_type &&
      username !== "" &&
      password !== "" &&
      name_th !== "" &&
      surname_th !== "" &&
      name_en !== "" &&
      surname_en !== "" &&
      personal_email !== "" &&
      phone !== ""
    )
      setShowModals({ ...showModals, showAdd: true })
    else setShowAlerts({ showAlertPassword: false, showAlertUsername: false, showAlertUncom: true })
  }

  // requests //
  const requestAdd = () => {
    let url = "/list-all-user/"
    let data = {}
    const { membership_type, username, password, personal_email } = user
    if (membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
      url += "OtherUser"
      data = {
        membership_type,
        personal_email,
        username,
        password,
      }
    } else {
      url += "SatitUser"
      data = user
    }
    client({
      method: "POST",
      url,
      data,
    })
      .then(() => {
        setShowModals({ ...showModals, showAdd: false, showCom: true })
      })
      .catch(({ response }) => {
        console.log(response)
        if (response && response.data.statusCode === 400) setShowModals({ ...showModals, showAdd: false, showUsernameErr: true })
        else if (response && response.data.statusCode === 401) history.push("/staff")
        else setShowModals({ ...showModals, showAdd: false, showErr: true })
      })
  }

  return (
    <div className="addUser">
      <Card body border="light" className="shadow px-3 py-3 mb-5 mt-4 mr-4">
        {selectingSatit ? renderSatitForm() : renderNormalForm()}
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

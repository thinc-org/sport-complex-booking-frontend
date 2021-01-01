import React, { FunctionComponent, useState } from "react"
import { Form, Card, Row, Col, Button, Modal, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AddInfo, ModalAddUser, AlertAddUser } from "../interfaces/InfoInterface"
import { client } from "../../../../../axiosConfig"
import ChangePasswordComponent from "./AddUserPasswordComponent"
import { AddModal, ComModal, ErrModal, UsernameErrModal } from "./AddUserModal"

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

  const [confirmPassword, setConfirmPassword] = useState<string>("")
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

  // functions //

  const validCheck = (s: string) => {
    return s.match(/.*([A-z])+.*/g)
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
      <Form>
        {renderSelector(0)}
        <Form.Group>
          <Form.Label>ชื่อผู้ใช้ (อีเมล)</Form.Label>
          <Form.Control id="username" onChange={handleChange} value={user.username} />
        </Form.Group>
        {renderAlertInvalidUsername()}
        {renderPasswordSection()}
        {renderAlertErrorPassword()}
      </Form>
    )
  }

  const renderSatitForm = () => {
    const { name_th, surname_th, name_en, surname_en, personal_email, phone, username, is_thai_language } = user
    return (
      <Form>
        {renderSelector(9)}
        <Form.Group>
          <Form.Label>ภาษา</Form.Label>
          <Form.Control className="m-0" as="select" id="is_thai_language" onChange={handleChange} value={is_thai_language ? 1 : 0}>
            <option value={1}>ภาษาไทย</option>
            <option value={0}>English</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>ชื่อ (ภาษาไทย)</Form.Label>
              <Form.Control id="name_th" onChange={handleChange} value={name_th} />
            </Col>
            <Col>
              <Form.Label>นามสกุล (ภาษาไทย)</Form.Label>
              <Form.Control id="surname_th" onChange={handleChange} value={surname_th} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>ชื่อ (ภาษาอังกฤษ)</Form.Label>
              <Form.Control id="name_en" onChange={handleChange} value={name_en} />
            </Col>
            <Col>
              <Form.Label>นามสกุล (ภาษาอังกฤษ)</Form.Label>
              <Form.Control id="surname_en" onChange={handleChange} value={surname_en} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>อีเมล</Form.Label>
              <Form.Control id="personal_email" onChange={handleChange} value={personal_email} />
            </Col>
            <Col>
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control id="phone" onChange={handleChange} value={phone} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control id="username" onChange={handleChange} value={username} />
            </Col>
          </Row>
          {renderPasswordSection()}
          {renderAlertInvalidUsername()}
          {renderAlertErrorPassword()}
        </Form.Group>
      </Form>
    )
  }

  const renderPasswordSection = () => {
    return (
      <ChangePasswordComponent
        selectingSatit={selectingSatit}
        newPass={user.password}
        conPass={confirmPassword}
        info={{ handleChange, setConfirmPassword }}
      />
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

  const renderAlert = () => {
    return (
      <Alert show={showAlerts.showAlertUncom} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  const renderAlertInvalidUsername = () => {
    return (
      <Alert show={showAlerts.showAlertUsername} variant="danger" style={{ fontWeight: "lighter" }}>
        ชื่อผู้ใช้ (Username) ต้องมีตัวอักษรอย่างน้อย 1 ตัว
      </Alert>
    )
  }

  const renderAlertErrorPassword = () => {
    return (
      <Alert show={showAlerts.showAlertPassword} variant="danger" style={{ fontWeight: "lighter" }}>
        รหัสผ่านไม่ตรงกัน
      </Alert>
    )
  }

  // handles //
  const handleChangeType = (e) => {
    setUser({ ...user, membership_type: e.target.value })
    if (e.target.value === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || user.membership_type === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา")
      setSelectingSatit(!selectingSatit)
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const handleAdd = (e) => {
    // if form has been completed -> request add //
    setShowAlerts({ showAlertPassword: false, showAlertUncom: false, showAlertUsername: false })
    let { membership_type, username, password, name_th, surname_th, name_en, surname_en, personal_email, phone } = user
    if (!validCheck(username)) setShowAlerts({ ...showAlerts, showAlertUsername: true })
    else if (password !== confirmPassword) setShowAlerts({ ...showAlerts, showAlertPassword: true })
    else if (membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && membership_type !== "" && username !== "" && password !== "")
      setShowModals({ ...showModals, showAdd: true })
    else if (
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
    else setShowAlerts({ ...showAlerts, showAlertUncom: true })
  }

  // requests //
  const requestAdd = () => {
    setShowModals({ ...showModals, showAdd: false })
    let url = "/list-all-user/"
    let data = {}
    let { membership_type, username, password } = user
    if (membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
      url += "OtherUser"
      data = {
        membership_type: membership_type,
        username: username,
        password: password,
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
      .then(({ data }) => {
        // if complete -> pop up "complete" //
        // else -> pop up "incomplete" //
        // go back to list-of-all-users page
        setShowModals({ ...showModals, showCom: true })
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data.statusCode === 400) setShowModals({ ...showModals, showUsernameErr: true })
        else setShowModals({ ...showModals, showErr: true })
      })
  }

  return (
    <div className="addUser">
      <Card body border="light" onSubmit={handleAdd} className="shadow px-3 py-3 mb-5 mt-4">
        {selectingSatit ? renderSatitForm() : renderNormalForm()}
        {renderAlert()}
        <Row className="pt-5">
          <Col className="text-right">
            <Link to="/staff/listOfAllUsers">
              <Button size="lg" variant="outline-secondary" className="mr-2 btn-normal btn-outline-pink">
                ยกเลิก
              </Button>
            </Link>
            <Button size="lg" variant="pink" className="btn-normal" onClick={handleAdd}>
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

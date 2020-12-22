import React, { FunctionComponent, useState, useEffect } from "react"
import { Form, InputGroup, Card, Row, Col, Button, Modal, Alert } from "react-bootstrap"
import { RouteComponentProps, Link } from "react-router-dom"
import fetch from "../interfaces/axiosTemplate"
import { AddInfo } from "../interfaces/InfoInterface"

const AddUser: FunctionComponent<RouteComponentProps> = (props) => {
  // Page states //
  const [jwt, setJwt] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmRjYTMxNjZhNDMwOTQyOWM5MmI4MjkiLCJpc1N0YWZmIjp0cnVlLCJpYXQiOjE2MDg3MzYxMTEsImV4cCI6MTYwOTM0MDkxMX0.NxmksdEUKg_2EU8ukKcO-vjisYY79a4TrJRGAibPvVQ"
  )
  const [selectingSatit, setSelectingSatit] = useState<boolean>(false)
  // Modals & Alerts //
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [showCom, setShowCom] = useState<boolean>(false)
  const [showErr, setShowErr] = useState<boolean>(false)
  const [showUsernameErr, setShowUsernameErr] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showAlertUsername, setShowAlertUsername] = useState<boolean>(false)
  const [showAlertPassword, setShowAlertPassword] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConPassword, setShowConPassword] = useState<boolean>(false)
  // User states //
  const [confirm_password, set_confirm_password] = useState<string>("")
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
  // const [tempUser, setTempUser] = useState()

  // functions //
  useEffect(() => {
    fetch({
      method: "GET",
      url: "/account_info/testing/adminToken",
    })
      .then(({ data }) => {
        setJwt(data.token.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const backToListPage = () => {
    props.history.push({
      pathname: "/listOfAllUsers",
    })
  }

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

  const renderPasswordSection = () => {
    return (
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>{selectingSatit ? "รหัสผ่าน" : "รหัสผ่าน (เบอร์โทรศัพท์)"}</Form.Label>
            <InputGroup>
              <Form.Control id="password" type={showPassword ? "text" : "password"} onChange={handleChange} value={user.password} />
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
                  set_confirm_password(e.target.value)
                }}
                value={confirm_password}
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

  const renderAddModal = () => {
    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการเพิ่มผู้ใช้หรือไม่ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowAdd(false)
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={requestAdd}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderComModal = () => {
    return (
      <Modal
        show={showCom}
        onHide={() => {
          setShowCom(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> การเพิ่มผู้ใช้เสร็จสมบูรณ์ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowCom(false)
              backToListPage()
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderErrModal = () => {
    return (
      <Modal
        show={showErr}
        onHide={() => {
          setShowErr(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถเพิ่มผู้ใช้ได้ในขณะนี้ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowErr(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderUsernameErrModal = () => {
    return (
      <Modal
        show={showUsernameErr}
        onHide={() => {
          setShowUsernameErr(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> {"ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้ไปแล้ว"} </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowUsernameErr(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderAlert = () => {
    return (
      <Alert show={showAlert} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  const renderAlertInvalidUsername = () => {
    return (
      <Alert show={showAlertUsername} variant="danger" style={{ fontWeight: "lighter" }}>
        ชื่อผู้ใช้ (Username) ต้องมีตัวอักษรอย่างน้อย 1 ตัว
      </Alert>
    )
  }

  const renderAlertErrorPassword = () => {
    return (
      <Alert show={showAlertPassword} variant="danger" style={{ fontWeight: "lighter" }}>
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
    setShowAlert(false)
    setShowAlertUsername(false)
    setShowAlertPassword(false)
    let { membership_type, username, password, name_th, surname_th, name_en, surname_en, personal_email, phone } = user
    if (!validCheck(username)) setShowAlertUsername(true)
    else if (password !== confirm_password) setShowAlertPassword(true)
    else if (membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && membership_type !== "" && username !== "" && password !== "") setShowAdd(true)
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
      setShowAdd(true)
    else setShowAlert(true)
  }

  // requests //
  const requestAdd = () => {
    setShowAdd(false)
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
    fetch({
      method: "POST",
      url,
      headers: {
        Authorization: "bearer " + jwt,
      },
      data,
    })
      .then(({ data }) => {
        // if complete -> pop up "complete" //
        // else -> pop up "incomplete" //
        // go back to list-of-all-users page
        setShowCom(true)
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data.statusCode === 400) setShowUsernameErr(true)
        else setShowErr(true)
      })
  }

  return (
    <div className="addUser">
      <Card body border="light" onSubmit={handleAdd} className="shadow px-3 py-3 mb-5 mt-4">
        {selectingSatit ? renderSatitForm() : renderNormalForm()}
        {renderAlert()}
        <Row className="pt-5">
          <Col className="text-right">
            <Link to="/listOfAllUsers">
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
      {renderAddModal()}
      {renderComModal()}
      {renderErrModal()}
      {renderUsernameErrModal()}
    </div>
  )
}

export default AddUser

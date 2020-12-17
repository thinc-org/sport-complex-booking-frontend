import React, { FunctionComponent, useState, useEffect } from "react"
import { Form, Card, Row, Col, Button, Modal, Alert } from "react-bootstrap"
import { RouteComponentProps, Link } from "react-router-dom"
import fetch from "../interfaces/axiosTemplate"
import { AddInfo } from "../interfaces/InfoInterface"

const AddUser: FunctionComponent<RouteComponentProps> = (props) => {
  // Page states //
  const [jwt, setJwt] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmQyNjY3YjU2ZWVjMDBlZTY3MDQ5NmQiLCJpc1N0YWZmIjp0cnVlLCJpYXQiOjE2MDc2MjQzMTUsImV4cCI6MTYwODIyOTExNX0.ejaYqHHmkB2qC5Ds59nYhtV1ryWeLlxEB-MNsuIpquY"
  )
  const [selectingSatit, setSelectingSatit] = useState<boolean>(false)
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [showCom, setShowCom] = useState<boolean>(false)
  const [showErr, setShowErr] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
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
  // const [tempUser, setTempUser] = useState()

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
    let { username, password } = user
    return (
      <Form>
        {renderSelector(0)}
        <Form.Group>
          <Form.Label>ชื่อผู้ใช้ (อีเมล)</Form.Label>
          <Form.Control id="username" onChange={handleChange} value={username} />
        </Form.Group>
        <Form.Group>
          <Form.Label>รหัสผ่าน (เบอร์โทรศัพท์)</Form.Label>
          <Form.Control id="password" onChange={handleChange} value={password} />
        </Form.Group>
      </Form>
    )
  }

  const renderSatitForm = () => {
    let { name_th, surname_th, name_en, surname_en, personal_email, phone, username, password, is_thai_language } = user
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
          <Row>
            <Col>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control id="username" onChange={handleChange} value={username} />
            </Col>
            <Col>
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control id="password" onChange={handleChange} value={password} />
            </Col>
          </Row>
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

  const renderAlert = () => {
    return (
      <Alert show={showAlert} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  const handleChangeType = (e) => {
    setUser({ ...user, membership_type: e.target.value })
    if (e.target.value === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || user.membership_type === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
      // setUser({...user, membership_type: e.target.value})
      setSelectingSatit(!selectingSatit)
      // this.setState({
      //   accountType: e.target.value,
      //   user: user,
      //   selectingSatit: !this.state.selectingSatit,
      // })
    }
    // else {
    //   this.setState({
    //     accountType: e.target.value,
    //     user: user,
    //   })
    // }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
    // user[e.target.id] = e.target.value
    // this.setState({
    //   user: user,
    // })
  }

  const handleAdd = (e) => {
    // if form has been completed -> request add //
    let { membership_type, username, password, name_th, surname_th, name_en, surname_en, personal_email, phone } = user
    if (membership_type !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && membership_type !== "" && username !== "" && password !== "") {
      setShowAdd(true)
    } else if (
      username !== "" &&
      password !== "" &&
      name_th !== "" &&
      surname_th !== "" &&
      name_en !== "" &&
      surname_en !== "" &&
      personal_email !== "" &&
      phone !== ""
    ) {
      setShowAdd(true)
    } else {
      setShowAlert(true)
    }
  }

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
      .catch((err) => {
        console.log(err)
        setShowErr(true)
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
    </div>
  )
}

export default AddUser

import React, { useState, useEffect, FunctionComponent } from "react"
import { Row, Col, Button, Form, Card, Modal, Alert } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import fetch from "../interfaces/axiosTemplate"

interface userState {
  account_type: Account
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  personal_email: string
  phone: string
  is_penalize: boolean
  expired_penalize_date: Date
  is_first_login: boolean
}

enum Account {
  CuStudent,
  SatitAndCuPersonel,
  Other,
}

const UserInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page states
  const [is_editing, set_editing] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showCom, setShowCom] = useState<boolean>(false)
  const [showErr, setShowErr] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  // const [_id, setId] = useState<number>()
  const [jwt, setJwt] = useState<string>("")

  // user states
  const [user, setUser] = useState<userState>({
    account_type: Account.CuStudent,
    is_thai_language: true,
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    username: "",
    personal_email: "",
    phone: "",
    is_penalize: false,
    expired_penalize_date: new Date(),
    is_first_login: true,
  })
  const [temp_user, set_temp_user] = useState<userState>(user)

  useEffect(() => {
    fetch({
      method: "GET",
      url: "/testing/adminToken",
      headers: {
        Authorization: "bearer " + jwt,
      },
    }).then(({ data }) => {
      setJwt(data.token.token)
    })
  }, [])
  useEffect(() => {
    getInfo()
  }, [jwt])

  const getInfo = () => {
    // console.log(this.props);
    fetch({
      method: "GET",
      url: "/users",
      headers: {
        Authorization: "bearer " + jwt,
      },
      params: {
        username: props.match.params._id,
      },
    })
      .then(({ data }) => {
        // need review
        user: data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Modals & Alert //
  const renderConfirmModal = () => {
    return (
      <Modal
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คำเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> ต้องการยืนยันการเปลี่ยนแปลงหรือไม่ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="btn-normal btn-outline-pink"
            onClick={() => {
              setShowConfirm(false)
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={requestUserChange}>
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
        <Modal.Body style={{ fontWeight: "lighter" }}> บันทึกการเปลี่ยนแปลงเรียบร้อย </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal" onClick={completedChange}>
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
        <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถบันทึกการเปลี่ยนแปลงได้ </Modal.Body>
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

  // handles //
  const handleChange = (e) => {
    let new_user: userState = { ...temp_user }
    if (e.target.id === "is_penalize") {
      if (e.target.value === "OK") new_user[e.target.id] = false
      else new_user[e.target.id] = true
    } else if (e.target.id === "expired_penalize_date") {
      let date: Date = new Date(e.target.value)
      if (date < new Date()) date = new Date()
      new_user[e.target.id] = date
    } else {
      new_user[e.target.id] = e.target.value
    }
    set_temp_user(new_user)
    // if (e.target.id === "is_penalize") this.forceUpdate()
  }
  const handleEdit = () => {
    set_editing(true)
    set_temp_user(user)
  }
  const handleCancelChange = () => {
    // need to undo changes
    set_editing(false)
    setShowAlert(false)
  }
  const handleConfirmChange = () => {
    // if some input is blank -> alert //
    // else -> try change //
    let { name_th, surname_th, name_en, surname_en, personal_email, phone } = temp_user
    if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "") setShowConfirm(true)
    else setShowAlert(true)
  }

  const requestUserChange = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    setShowConfirm(false)
    setShowAlert(false)
    fetch({
      method: "PUT",
      url: "/account_info",
      headers: {
        Authorization: "bearer " + jwt,
      },
      data: {
        user: temp_user,
      },
    })
      .then(({ data }) => {
        setUser(temp_user)
        setShowCom(true)
      })
      .catch((err) => {
        console.log(err)
        setShowErr(true)
      })
  }

  const completedChange = () => {
    // run after pop up "complete"
    set_editing(false)
    setShowCom(false)
  }

  const renderForm = () => {
    let date: Date = user.expired_penalize_date
    let expired_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    return (
      <div className="userInformation">
        <Row>
          <Col className="py-3">
            <p>ประเภท</p>
            <p className="font-weight-bold mb-0">{Account[user.account_type]}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (อังกฤษ)</p>
            <p className="font-weight-bold mb-0">{user.name_en}</p>
          </Col>
          <Col className="py-3">
            <p>นามสกุล (อังกฤษ)</p>
            <p className="font-weight-bold mb-0">{user.surname_en}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (ไทย)</p>
            <p className="font-weight-bold mb-0">{user.name_th}</p>
          </Col>
          <Col className="py-3">
            <p>นามสกุล (ไทย)</p>
            <p className="font-weight-bold mb-0">{user.surname_th}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อผู้ใช้</p>
            <p className="font-weight-bold mb-0">{user.username}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>อีเมลส่วนตัว</p>
            <p className="font-weight-bold mb-0">{user.personal_email}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>เบอร์โทร</p>
            <p className="font-weight-bold mb-0">{user.phone}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>สถานะการแบน</p>
            <p className="font-weight-bold mb-0">{user.is_penalize ? "โดนแบน" : "ปกติ"}</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            {/* <p>ชื่อ (ไทย)</p>
                                    <p className="font-weight-bold mb-0">{user.name_th}</p> */}
            <Form.Label>สิ้นสุดการแบน</Form.Label>
            <Form.Control style={{ width: "40%" }} disabled type="date" value={user.is_penalize ? expired_date : ""} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/listOfAllUsers">
              <Button variant="outline-secondary" className="btn-normal btn-outline-pink">
                กลับ
              </Button>
            </Link>
          </Col>
          <Col className="text-right">
            <Button variant="pink" className="btn-normal" onClick={handleEdit}>
              แก้ไข
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  const renderEditingForm = () => {
    let date: Date = temp_user.expired_penalize_date
    let expired_date: string =
      String(date.getFullYear()) +
      "-" +
      String(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
      "-" +
      String(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    return (
      <div className="userInformation">
        <Row>
          <Col className="py-3">
            <p>ประเภทบัญชี</p>
            <Form.Label className="font-weight-bold">{Account[user.account_type]}</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (อังกฤษ)</p>
            <Form.Control id="name_en" onChange={handleChange} value={temp_user.name_en} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (อังกฤษ)</p>
            <Form.Control id="surname_en" onChange={handleChange} value={temp_user.surname_en} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (ไทย)</p>
            <Form.Control id="name_th" onChange={handleChange} value={temp_user.name_th} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (ไทย)</p>
            <Form.Control id="surname_th" onChange={handleChange} value={temp_user.surname_th} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อผู้ใช้</p>
            <Form.Label className="font-weight-bold">{temp_user.username}</Form.Label>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>อีเมลส่วนตัว</p>
            <Form.Control id="personal_email" onChange={handleChange} value={temp_user.personal_email} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>เบอร์โทร</p>
            <Form.Control id="phone" onChange={handleChange} value={temp_user.phone} />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สถานะการแบน</Form.Label>
            <Form.Control as="select" id="is_penalize" onChange={handleChange} value={temp_user.is_penalize ? "Banned" : "OK"}>
              <option value="OK">ปกติ</option>
              <option value="Banned">โดนแบน</option>
            </Form.Control>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สิ้นสุดการแบน</Form.Label>
            <Form.Control
              style={{ width: "40%" }}
              disabled={temp_user.is_penalize ? false : true}
              id="expired_penalize_date"
              type="date"
              onChange={handleChange}
              value={temp_user.is_penalize ? expired_date : ""}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="text-right">
            <Button className="mr-4 btn-normal btn-outline-pink" variant="outline-secondary" onClick={handleCancelChange}>
              ยกเลิก
            </Button>
            <Button variant="pink" className="btn-normal" onClick={handleConfirmChange}>
              บันทึก
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className="UserInfo">
      <Card body border="light" className="justify-content-center px-3 ml-1 mr-3 my-4 shadow">
        <Row className="pb-3">
          <Col>{is_editing ? renderEditingForm() : renderForm()}</Col>
        </Row>
        {renderAlert()}
      </Card>
      {renderConfirmModal()}
      {renderComModal()}
      {renderErrModal()}
    </div>
  )
}

export default UserInfo

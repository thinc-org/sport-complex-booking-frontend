import userEvent from "@testing-library/user-event"
import Axios from "axios"
import React, { Component } from "react"
import { Row, Col, Button, Form, Card, Modal, Alert } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"

interface TParams {
  username: string
}

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

interface stateTemplate {
  is_editing: boolean
  showConfirm: boolean
  showCom: boolean
  showErr: boolean
  showAlert: boolean
  user: userState
  temp_user: userState
}

enum Account {
  CuStudent,
  SatitAndCuPersonel,
  Other,
}

class UserInfo extends Component<RouteComponentProps<TParams>, {}> {
  // class UserInfo extends Component<RouteComponentProps<TParams, any, userState[]>, {}> {
  state: stateTemplate = {
    is_editing: false,
    showConfirm: false,
    showCom: false,
    showErr: false,
    showAlert: false,
    user: {
      account_type: Account.CuStudent,
      is_thai_language: true,
      name_th: "ไก่",
      surname_th: "กา",
      name_en: "chicky",
      surname_en: "crowy",
      username: "123",
      personal_email: "email",
      phone: "191",
      is_penalize: false,
      expired_penalize_date: new Date(),
      is_first_login: true,
    },
    temp_user: {
      account_type: Account.CuStudent,
      is_thai_language: true,
      name_th: "ไก่",
      surname_th: "กา",
      name_en: "chicky",
      surname_en: "crowy",
      username: "123",
      personal_email: "email",
      phone: "191",
      is_penalize: false,
      expired_penalize_date: new Date(),
      is_first_login: true,
    },
  }

  componentDidMount = () => {
    this.getInfo() //set state with incoming values
  }

  getInfo = () => {
    // console.log(this.props);
    axios({
      method: "get",
      url: "url..",
      params: {
        username: this.props.match.params.username,
      },
    })
      .then((res) => {
        // let user = res.data ......
        // this.setState({ ['user']: user })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Modals & Alert //
  renderConfirmModal = () => {
    return (
      <Modal
        show={this.state.showConfirm}
        onHide={() => {
          this.setState({ showConfirm: false })
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
              this.setState({ showConfirm: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={this.requestUserChange}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  renderComModal = () => {
    return (
      <Modal
        show={this.state.showCom}
        onHide={() => {
          this.setState({ showCom: false })
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}> บันทึกการเปลี่ยนแปลงเรียบร้อย </Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal" onClick={this.completedChange}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  renderErrModal = () => {
    return (
      <Modal
        show={this.state.showErr}
        onHide={() => {
          this.setState({ showErr: false })
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
              this.setState({ showErr: false })
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  renderAlert = () => {
    return (
      <Alert show={this.state.showAlert} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  // handles //
  handleChange = (e) => {
    let new_user: userState = { ...this.state.temp_user }
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
    this.setState({
      temp_user: new_user,
    })
    // console.log(this.state)
    if (e.target.id === "is_penalize") this.forceUpdate()
  }
  handleEdit = () => {
    this.setState({
      is_editing: true,
      temp_user: this.state.user,
    })
    // console.log(this.state)
  }
  handleCancelChange = () => {
    // need to undo changes
    this.setState({
      is_editing: false,
      showAlert: false,
    })
  }
  handleConfirmChange = () => {
    // if some input is blank -> alert //
    // else -> try change //
    let { name_th, surname_th, name_en, surname_en, personal_email, phone } = this.state.temp_user
    if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "") {
      this.setState({ showConfirm: true })
    } else {
      this.setState({ showAlert: true })
    }
  }

  requestUserChange = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    this.setState({
      showConfirm: false,
      showAlert: false,
    })
    axios({
      method: "PUT",
      url: "url ...",
      data: {
        user: this.state.temp_user, // ???
      },
    })
      .then((res) => {
        this.setState({
          user: this.state.temp_user,
          showCom: true,
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ showErr: true })
      })
  }

  completedChange = () => {
    // run after pop up "complete"
    this.setState({
      showCom: false,
      is_editing: false,
    })
  }

  renderForm = () => {
    let user = this.state.user
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
            <Button variant="pink" className="btn-normal" onClick={this.handleEdit}>
              แก้ไข
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  renderEditingForm = () => {
    let user: userState = this.state.user
    let temp_user: userState = this.state.temp_user
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
            <Form.Control id="name_en" onChange={this.handleChange} value={temp_user.name_en} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (อังกฤษ)</p>
            <Form.Control id="surname_en" onChange={this.handleChange} value={temp_user.surname_en} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (ไทย)</p>
            <Form.Control id="name_th" onChange={this.handleChange} value={temp_user.name_th} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (ไทย)</p>
            <Form.Control id="surname_th" onChange={this.handleChange} value={temp_user.surname_th} />
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
            <Form.Control id="personal_email" onChange={this.handleChange} value={temp_user.personal_email} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>เบอร์โทร</p>
            <Form.Control id="phone" onChange={this.handleChange} value={temp_user.phone} />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สถานะการแบน</Form.Label>
            <Form.Control as="select" id="is_penalize" onChange={this.handleChange} value={temp_user.is_penalize ? "Banned" : "OK"}>
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
              onChange={this.handleChange}
              value={temp_user.is_penalize ? expired_date : ""}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="text-right">
            <Button className="mr-4 btn-normal btn-outline-pink" variant="outline-secondary" onClick={this.handleCancelChange}>
              ยกเลิก
            </Button>
            <Button variant="pink" className="btn-normal" onClick={this.handleConfirmChange}>
              บันทึก
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <div className="UserInfo">
        <Card body border="light" className="justify-content-center px-3 ml-1 mr-3 my-4 shadow">
          <Row className="pb-3">
            <Col>{this.state.is_editing ? this.renderEditingForm() : this.renderForm()}</Col>
          </Row>
          {this.renderAlert()}
        </Card>
        {this.renderConfirmModal()}
        {this.renderComModal()}
        {this.renderErrModal()}
      </div>
    )
  }
}

export default UserInfo

import React, { Component } from "react"
import { Form, Card, Row, Col, Button, Modal, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
// import ModalsComponent from "./ModalsComponent"

interface stateTemplate {
  selectingSatit: boolean
  showAdd: boolean
  showCom: boolean
  showErr: boolean
  showAlert: boolean
  user: {
    accountType: string
    username: string
    password: string
    language: string
    name: string
    surname: string
    email: string
    phone: string
  }
}

class AddUser extends Component {
  state: stateTemplate = {
    selectingSatit: false,
    showAdd: false,
    showCom: false,
    showErr: false,
    showAlert: false,
    user: {
      accountType: "สมาชิกสามัญ ก (staff membership)",
      username: "",
      password: "",
      language: "ภาษาไทย",
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  }

  // shouldComponentUpdate(nextProp, nextState) {
  //   let { accountType } = this.state.user
  //   if (accountType !== nextState.user.accountType) return true
  //   return false
  // }

  renderSelector = (option: number) => {
    return (
      <Form.Group>
        <Form.Label>ประเภท</Form.Label>
        <Form.Control as="select" onChange={this.handleChangeType} defaultValue={option}>
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

  renderNormalForm = () => {
    let { username, password } = this.state.user
    return (
      <Form>
        {this.renderSelector(0)}
        <Form.Group>
          <Form.Label>ชื่อผู้ใช้ (อีเมล)</Form.Label>
          <Form.Control id="username" onChange={this.handleChange} value={username} />
        </Form.Group>
        <Form.Group>
          <Form.Label>รหัสผ่าน (เบอร์โทรศัพท์)</Form.Label>
          <Form.Control id="password" onChange={this.handleChange} value={password} />
        </Form.Group>
      </Form>
    )
  }

  renderSatitForm = () => {
    let { language, name, surname, email, phone, username, password } = this.state.user
    return (
      <Form>
        {this.renderSelector(9)}
        <Form.Group>
          <Form.Label>ภาษา</Form.Label>
          <Form.Control as="select" id="language" onChange={this.handleChange} value={language}>
            <option value="ภาษาไทย">ภาษาไทย</option>
            <option value="English">English</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control id="name" onChange={this.handleChange} value={name} />
            </Col>
            <Col>
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control id="surname" onChange={this.handleChange} value={surname} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>อีเมล</Form.Label>
              <Form.Control id="email" onChange={this.handleChange} value={email} />
            </Col>
            <Col>
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control id="phone" onChange={this.handleChange} value={phone} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control id="username" onChange={this.handleChange} value={username} />
            </Col>
            <Col>
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control id="password" onChange={this.handleChange} value={password} />
            </Col>
          </Row>
        </Form.Group>
      </Form>
    )
  }

  renderAddModal = () => {
    return (
      <Modal
        show={this.state.showAdd}
        onHide={() => {
          this.setState({ showAdd: false })
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
              this.setState({ showAdd: false })
            }}
          >
            ยกเลิก
          </Button>
          <Button variant="pink" className="btn-normal" onClick={this.requestAdd}>
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
        <Modal.Body style={{ fontWeight: "lighter" }}> การเพิ่มผู้ใช้เสร็จสมบูรณ์ </Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              this.setState({ showCom: false })
            }}
          >
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
        <Modal.Body style={{ fontWeight: "lighter" }}> ไม่สามารถเพิ่มผู้ใช้ได้ในขณะนี้ </Modal.Body>
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

  handleChangeType = (e) => {
    let { user } = this.state
    let { accountType } = this.state.user
    if (e.target.value === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || accountType === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
      user.accountType = e.target.value
      this.setState({
        user: user,
        ["selectingSatit"]: !this.state.selectingSatit,
      })
    } else {
      user.accountType = e.target.value
      this.setState({
        user: user,
      })
    }
  }

  handleChange = (e) => {
    let { user } = this.state
    user[e.target.id] = e.target.value
    this.setState({
      user: user,
    })
  }

  handleAdd = (e) => {
    // if form has been completed -> request add //
    let { accountType, username, password, language, name, surname, email, phone } = this.state.user
    if (accountType !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && username !== "" && password !== "") {
      this.setState({ showAdd: true })
    } else if (username !== "" && password !== "" && language !== "" && name !== "" && surname !== "" && email !== "" && phone !== "") {
      this.setState({ showAdd: true })
    } else {
      this.setState({ showAlert: true })
    }
  }

  requestAdd = () => {
    console.log(this.state)
    this.setState({ showAdd: false })
    axios
      .post("url", this.state.user)
      .then((res) => {
        // if complete -> pop up "complete" //
        // else -> pop up "incomplete" //
        // go back to list-of-all-users page???
        // this.setState({ showCom: true })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ showErr: true })
      })
  }

  render() {
    // console.log("re-render")
    let { showAdd, showCom, showErr } = this.state
    // console.log(showAdd)
    return (
      <div className="addUser">
        <Card body border="light" onSubmit={this.handleAdd} className="shadow px-3 py-3 mb-5 mt-4">
          {this.state.selectingSatit ? this.renderSatitForm() : this.renderNormalForm()}
          {this.renderAlert()}
          <Row className="pt-5">
            <Col className="text-right">
              <Link to="/listOfAllUsers">
                <Button size="lg" variant="outline-secondary" className="mr-2 btn-normal btn-outline-pink">
                  ยกเลิก
                </Button>
              </Link>
              <Button size="lg" variant="pink" className="btn-normal" onClick={this.handleAdd}>
                เพิ่ม
              </Button>
            </Col>
          </Row>
        </Card>
        {this.renderAddModal()}
        {this.renderComModal()}
        {this.renderErrModal()}
        {/* <ModalsComponent showAdd={showAdd} showCom={showCom} showErr={showErr} requestAdd={this.requestAdd} /> */}
      </div>
    )
  }
}

export default AddUser

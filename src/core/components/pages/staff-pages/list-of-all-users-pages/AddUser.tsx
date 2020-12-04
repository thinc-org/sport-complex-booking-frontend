import React, { Component } from "react"
import { Form, Card, Row, Col, Button, Modal, Alert } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
// import axios from "axios"
import fetch from "../interfaces/axiosTemplate"
// import ModalsComponent from "./ModalsComponent"

interface stateTemplate {
  selectingSatit: boolean
  jwt: string
  showAdd: boolean
  showCom: boolean
  showErr: boolean
  showAlert: boolean
  accountType: string
  user: {
    username: string
    password: string
    is_thai_language: boolean
    name_th: string
    surname_th: string
    name_en: string
    surname_en: string
    personal_email: string
    phone: string
  }
}

class AddUser extends Component<RouteComponentProps, {}> {
  state: stateTemplate = {
    selectingSatit: false,
    jwt: "",
    showAdd: false,
    showCom: false,
    showErr: false,
    showAlert: false,
    accountType: "สมาชิกสามัญ ก (staff membership)",
    user: {
      username: "",
      password: "",
      is_thai_language: true,
      name_th: "",
      surname_th: "",
      name_en: "",
      surname_en: "",
      personal_email: "",
      phone: "",
    },
  }

  // shouldComponentUpdate(nextProp, nextState) {
  //   let { accountType } = this.state.user
  //   if (accountType !== nextState.user.accountType) return true
  //   return false
  // }

  componentDidMount() {
    fetch({
      method: "GET",
      url: "/account_info/testing/adminToken",
    })
      .then(({ data }) => {
        this.setState({ jwt: data.token.token })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  backToListPage = () => {
    this.props.history.push({
      pathname: "/listOfAllUsers",
    })
  }

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
    let { name_th, surname_th, name_en, surname_en, personal_email, phone, username, password, is_thai_language } = this.state.user
    return (
      <Form>
        {this.renderSelector(9)}
        <Form.Group>
          <Form.Label>ภาษา</Form.Label>
          <Form.Control as="select" id="is_thai_language" onChange={this.handleChange} value={is_thai_language ? 1 : 0}>
            <option value={1}>ภาษาไทย</option>
            <option value={0}>English</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>ชื่อ (ภาษาไทย)</Form.Label>
              <Form.Control id="name_th" onChange={this.handleChange} value={name_th} />
            </Col>
            <Col>
              <Form.Label>นามสกุล (ภาษาไทย)</Form.Label>
              <Form.Control id="surname_th" onChange={this.handleChange} value={surname_th} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>ชื่อ (ภาษาอังกฤษ)</Form.Label>
              <Form.Control id="name_en" onChange={this.handleChange} value={name_en} />
            </Col>
            <Col>
              <Form.Label>นามสกุล (ภาษาอังกฤษ)</Form.Label>
              <Form.Control id="surname_en" onChange={this.handleChange} value={surname_en} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>อีเมล</Form.Label>
              <Form.Control id="personal_email" onChange={this.handleChange} value={personal_email} />
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
              this.backToListPage()
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
    let { user, accountType } = this.state
    if (e.target.value === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || accountType === "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
      this.setState({
        accountType: e.target.value,
        user: user,
        selectingSatit: !this.state.selectingSatit,
      })
    } else {
      this.setState({
        accountType: e.target.value,
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
    let { accountType } = this.state
    let { username, password, name_th, surname_th, name_en, surname_en, personal_email, phone } = this.state.user
    if (accountType !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" && username !== "" && password !== "") {
      this.setState({ showAdd: true })
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
      this.setState({ showAdd: true })
    } else {
      this.setState({ showAlert: true })
    }
  }

  requestAdd = () => {
    console.log(this.state)
    this.setState({ showAdd: false })
    let data = {}
    if (this.state.accountType !== "นักเรียนสาธิตจุฬา / บุคลากรจุฬา")
      data = {
        membership_type: this.state.accountType,
        username: this.state.user.username,
        password: this.state.user.password,
      }
    else data = this.state.user
    fetch({
      method: "POST",
      url: "/add-user/User/",
      headers: {
        Authorization: "bearer " + this.state.jwt,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(({ data }) => {
        // if complete -> pop up "complete" //
        // else -> pop up "incomplete" //
        // go back to list-of-all-users page
        this.setState({ showCom: true })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ showErr: true })
      })
  }

  render() {
    console.log("adduser re-render")
    // let { showAdd, showCom, showErr } = this.state
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
      </div>
    )
  }
}

export default AddUser

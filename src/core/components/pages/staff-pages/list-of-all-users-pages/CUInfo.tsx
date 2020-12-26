import React, { useState, useEffect, FunctionComponent } from "react"
import { Row, Col, Button, Form, Card, Modal, Alert, InputGroup } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { CuAndSatitInfo, ThaiLangAccount, Account, ModalCuAndSatit } from "../interfaces/InfoInterface"
import PasswordChangeModal from "./PasswordChangeModal"
import CuAndSatitModals from "./CuAndSatitModals"

const UserInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page states
  const [is_editing, set_editing] = useState<boolean>(false)
  const [new_password, set_new_password] = useState<string>("")
  const [confirm_password, set_confirm_password] = useState<string>("")

  // Modals & Alert //
  const [show_change_password, set_show_change_password] = useState<boolean>(false)
  const [show_modals, set_show_modals] = useState<ModalCuAndSatit>({
    show_confirm: false,
    show_com: false,
    show_del: false,
    show_com_delete: false,
    show_err: false,
    show_password_err: false,
    show_confirm_change: false,
  })
  // Alert //
  const [showAlert, setShowAlert] = useState<boolean>(false)

  // user states
  const [_id] = useState<string>(props.match.params._id)
  const [user, setUser] = useState<CuAndSatitInfo>({
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
    password: "",
  })
  const [temp_user, set_temp_user] = useState<CuAndSatitInfo>(user)

  // useEffects //
  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {
    client({
      method: "GET",
      url: "/list-all-user/findById/" + _id,
    })
      .then(({ data }) => {
        setUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Alerts & Modals //
  const renderAlert = () => {
    return (
      <Alert show={showAlert} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  // handles //
  const handleChange = (e) => {
    if (e.target.id === "is_penalize") {
      if (e.target.value === "1") set_temp_user({ ...temp_user, [e.target.id]: true })
      else set_temp_user({ ...temp_user, [e.target.id]: false })
    } else if (e.target.id === "expired_penalize_date") {
      let date: Date = new Date(e.target.value)
      if (date < new Date()) date = new Date()
      set_temp_user({ ...temp_user, expired_penalize_date: date })
    } else {
      set_temp_user({ ...temp_user, [e.target.id]: e.target.value })
    }
  }

  const handleEdit = () => {
    set_editing(true)
    set_temp_user({ ...user })
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
    if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "")
      set_show_modals({ ...show_modals, show_confirm: true })
    else setShowAlert(true)
  }

  const handleChangePassword = () => {
    if (temp_user.password !== user.password || new_password !== confirm_password) set_show_modals({ ...show_modals, show_password_err: true })
    else set_show_modals({ ...show_modals, show_confirm_change: true })
  }

  // requests //
  const requestUserChange = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    const { name_th, surname_th, name_en, surname_en, personal_email, phone, is_penalize, expired_penalize_date } = temp_user
    set_show_modals({ ...show_modals, show_confirm: false })
    setShowAlert(false)
    client({
      method: "PATCH",
      url: "/list-all-user/" + _id,
      data: {
        name_th,
        name_en,
        surname_th,
        surname_en,
        phone,
        personal_email,
        is_penalize,
        expired_penalize_date,
      },
    })
      .then(({ data }) => {
        setUser(temp_user)
        set_show_modals({ ...show_modals, show_confirm: false, show_com: true })
      })
      .catch((err) => {
        console.log(err)
        set_show_modals({ ...show_modals, show_confirm: false, show_err: true })
      })
  }

  const requestDelete = () => {
    set_show_modals({ ...show_modals, show_del: false })
    setShowAlert(false)
    client({
      method: "DELETE",
      url: "/list-all-user/User/" + _id,
    })
      .then(({ data }) => {
        set_show_modals({ ...show_modals, show_com_delete: true })
      })
      .catch(({ response }) => {
        console.log(response)
        set_show_modals({ ...show_modals, show_err: true })
      })
  }

  const requestChangePassword = () => {
    client({
      method: "PATCH",
      url: "/list-all-user/" + _id,
      data: {
        password: new_password,
      },
    })
      .then(({ data }) => {
        setUser({ ...user, password: data.password })
        set_show_modals({ ...show_modals, show_confirm_change: false })
        set_show_change_password(false)
      })
      .catch((err) => {
        console.log(err)
        set_show_modals({ ...show_modals, show_err: true })
      })
  }

  // other functions //
  const completedChange = () => {
    // run after pop up "complete"
    set_editing(false)
    set_show_modals({ ...show_modals, show_com: false })
  }

  // renders //
  const renderModals = () => {
    const { username } = user
    if (show_modals.show_confirm)
      return <CuAndSatitModals show_modals={show_modals} set_show_modals={set_show_modals} info={{ requestUserChange }} props={props} />
    else if (show_modals.show_com)
      return <CuAndSatitModals show_modals={show_modals} set_show_modals={set_show_modals} info={{ completedChange }} props={props} />
    else if (show_modals.show_del)
      return <CuAndSatitModals show_modals={show_modals} set_show_modals={set_show_modals} info={{ requestDelete, username }} props={props} />
    else if (show_modals.show_confirm_change)
      return <CuAndSatitModals show_modals={show_modals} set_show_modals={set_show_modals} info={{ requestChangePassword }} props={props} />
    else return <CuAndSatitModals show_modals={show_modals} set_show_modals={set_show_modals} info={{}} props={props} />
  }

  const renderPasswordChangeModal = () => (
    <PasswordChangeModal
      show_change={show_change_password}
      set_show_change={set_show_change_password}
      set_new_password={set_new_password}
      set_confirm_password={set_confirm_password}
      info={{ handleChange, handleChangePassword }}
    />
  )

  const renderForm = () => {
    let date: Date = new Date(user.expired_penalize_date)
    let expired_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    return (
      <div className="userInformation">
        <Row>
          <Col className="py-3">
            <p>ประเภท</p>
            <p className="font-weight-bold mb-0">{ThaiLangAccount[Account[user.account_type]]}</p>
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
            <Form.Label>สิ้นสุดการแบน</Form.Label>
            <Form.Control style={{ width: "40%" }} disabled type="date" value={user.is_penalize ? expired_date : ""} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/staff/listOfAllUsers">
              <Button variant="outline-secondary" className="btn-normal btn-outline-pink">
                กลับ
              </Button>
            </Link>
          </Col>
          <Col className="text-right">
            <Button
              variant="outline-danger"
              className="btn-normal btn-outline-red mr-3"
              onClick={() => {
                set_show_modals({ ...show_modals, show_del: true })
              }}
            >
              ลบผู้ใช้
            </Button>
            <Button variant="pink" className="btn-normal" onClick={handleEdit}>
              แก้ไข
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  const renderEditingForm = () => {
    let date: Date = new Date(temp_user.expired_penalize_date)
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
            <Form.Label className="font-weight-bold">{ThaiLangAccount[Account[user.account_type]]}</Form.Label>
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
            <Form.Control className="m-0" as="select" id="is_penalize" onChange={handleChange} value={temp_user.is_penalize ? 1 : 0}>
              <option value={0}>ปกติ</option>
              <option value={1}>โดนแบน</option>
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
          {String(user.account_type) !== Account[Account.CuStudent] ? (
            <Col className="text-left">
              <Button
                variant="pink"
                className="btn-normal"
                onClick={() => {
                  set_temp_user({ ...temp_user, password: "" })
                  set_new_password("")
                  set_confirm_password("")
                  set_show_change_password(true)
                }}
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            </Col>
          ) : null}
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
      {renderModals()}
      {renderPasswordChangeModal()}
    </div>
  )
}

export default UserInfo

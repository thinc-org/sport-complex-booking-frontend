import React, { useState, useEffect, FunctionComponent } from "react"
import { Row, Col, Button, Form, Card, Modal, Alert, InputGroup } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { CuAndSatitInfo, ThaiLangAccount, Account, ModalCuAndSatit } from "../interfaces/InfoInterface"
import format from "date-fns/format"
import PasswordChangeModal from "./PasswordChangeModal"
import CuAndSatitModals from "./CuAndSatitModals"
import { isValid } from "date-fns"

const UserInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page states
  const [isEditing, setEditing] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  // Modals & Alert //
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false)
  const [showModals, setShowModals] = useState<ModalCuAndSatit>({
    showConfirm: false,
    showCom: false,
    showDel: false,
    showComDelete: false,
    showErr: false,
    showPasswordErr: false,
    showConfirmChange: false,
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
  const [tempUser, setTempUser] = useState<CuAndSatitInfo>(user)

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
        setUser({
          account_type: data.account_type,
          is_thai_language: data.is_thai_language,
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
          username: data.username,
          personal_email: data.personal_email,
          phone: data.phone,
          is_penalize: data.is_penalize,
          expired_penalize_date: data.expired_penalize_date ? data.expired_penalize_date : new Date(),
          is_first_login: data.is_first_login,
          password: "",
        })
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
      // set is_penalize
      if (e.target.value === "1") setTempUser({ ...tempUser, [e.target.id]: true })
      else setTempUser({ ...tempUser, [e.target.id]: false })
    } else if (e.target.id === "expired_penalize_date") {
      // set date
      let incom: Date = new Date(e.target.value)
      let old: Date = new Date(tempUser.expired_penalize_date)
      let date: Date = new Date(incom.getFullYear(), incom.getMonth(), incom.getDate(), old.getHours(), old.getMinutes())
      if (date < new Date()) date = new Date()
      setTempUser({ ...tempUser, expired_penalize_date: date })
    } else if (e.target.id === "expiredPenalizeTime") {
      // set time
      let date: Date = new Date(tempUser.expired_penalize_date)
      let hour: number = parseInt(e.target.value.slice(0, 2))
      let minute: number = parseInt(e.target.value.slice(3, 5))
      let newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0)
      if (newDate < new Date()) newDate = new Date()
      setTempUser({ ...tempUser, expired_penalize_date: newDate })
    } else setTempUser({ ...tempUser, [e.target.id]: e.target.value })
  }

  const handleEdit = () => {
    setEditing(true)
    setTempUser(user)
  }

  const handleCancelChange = () => {
    // need to undo changes
    setEditing(false)
    setShowAlert(false)
  }

  const handleConfirmChange = () => {
    // if some input is blank -> alert //
    // else -> try change //
    let { name_th, surname_th, name_en, surname_en, personal_email, phone } = tempUser
    if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "")
      setShowModals({ ...showModals, showConfirm: true })
    else setShowAlert(true)
  }

  const handleChangePassword = () => {
    if (temp_user.password !== user.password || new_password !== confirm_password) set_show_modals({ ...show_modals, show_password_err: true })
    else set_show_modals({ ...show_modals, show_confirm_change: true })
  }

  const handleChangePassword = () => {
    if (tempUser.password !== user.password || newPassword !== confirmPassword) setShowModals({ ...showModals, showPasswordErr: true })
    else setShowModals({ ...showModals, showConfirmChange: true })
  }

  // requests //
  const requestUserChange = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    const { name_th, surname_th, name_en, surname_en, personal_email, phone, is_penalize, expired_penalize_date } = tempUser
    setShowModals({ ...showModals, showConfirm: false })
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
        setUser(tempUser)
        setShowModals({ ...showModals, showConfirm: false, showCom: true })
      })
      .catch((err) => {
        console.log(err)
        setShowModals({ ...showModals, showConfirm: false, showErr: true })
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

  const requestDelete = () => {
    setShowModals({ ...showModals, showDel: false })
    setShowAlert(false)
    client({
      method: "DELETE",
      url: "/list-all-user/User/" + _id,
    })
      .then(({ data }) => {
        setShowModals({ ...showModals, showComDelete: true })
      })
      .catch(({ response }) => {
        console.log(response)
        setShowModals({ ...showModals, showErr: true })
      })
  }

  const requestChangePassword = () => {
    client({
      method: "PATCH",
      url: "/list-all-user/" + _id,
      data: {
        password: newPassword,
      },
    })
      .then(({ data }) => {
        setUser({ ...user, password: data.password })
        setShowModals({ ...showModals, showConfirmChange: false })
        setShowChangePassword(false)
      })
      .catch((err) => {
        console.log(err)
        setShowModals({ ...showModals, showErr: true })
      })
  }

  // other functions //
  const completedChange = () => {
    // run after pop up "complete"
    setEditing(false)
    setShowModals({ ...showModals, showCom: false })
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

  // renders //
  const renderModals = () => {
    const { username } = user
    if (showModals.showConfirm) return <CuAndSatitModals showModals={showModals} setShowModals={setShowModals} info={{ requestUserChange }} />
    else if (showModals.showCom) return <CuAndSatitModals showModals={showModals} setShowModals={setShowModals} info={{ completedChange }} />
    else if (showModals.showDel) return <CuAndSatitModals showModals={showModals} setShowModals={setShowModals} info={{ requestDelete, username }} />
    else if (showModals.showConfirmChange)
      return <CuAndSatitModals showModals={showModals} setShowModals={setShowModals} info={{ requestChangePassword }} />
    else return <CuAndSatitModals showModals={showModals} setShowModals={setShowModals} info={{}} />
  }

  const renderPasswordChangeModal = () => (
    <PasswordChangeModal
      showChange={showChangePassword}
      setShowChange={setShowChangePassword}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      info={{ handleChange, handleChangePassword }}
    />
  )

  const renderForm = () => {
    let date: Date = new Date(user.expired_penalize_date)
    return (
      <div className="userInformation">
        <Row className="py-3">
          <Col>
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
        <Row className="py-3">
          <Col>
            <p>ชื่อผู้ใช้</p>
            <p className="font-weight-bold mb-0">{user.username}</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>อีเมลส่วนตัว</p>
            <p className="font-weight-bold mb-0">{user.personal_email}</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>เบอร์โทร</p>
            <p className="font-weight-bold mb-0">{user.phone}</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>สถานะการแบน</p>
            <p className="font-weight-bold mb-0">{user.is_penalize ? "โดนแบน" : "ปกติ"}</p>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สิ้นสุดการแบน</Form.Label>
            <Row>
              <Col sm={4}>
                <Form.Control disabled type="date" value={user.is_penalize && isValid(date) ? format(date, "yyyy-MM-dd") : ""} />
              </Col>
              <Col>
                <Form.Control disabled style={{ width: "25%" }} type="time" value={user.is_penalize && isValid(date) ? format(date, "HH:mm") : ""} />
              </Col>
            </Row>
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
                setShowModals({ ...showModals, showDel: true })
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
    let date: Date = new Date(tempUser.expired_penalize_date)
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
            <Form.Control id="name_en" onChange={handleChange} value={tempUser.name_en} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (อังกฤษ)</p>
            <Form.Control id="surname_en" onChange={handleChange} value={tempUser.surname_en} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อ (ไทย)</p>
            <Form.Control id="name_th" onChange={handleChange} value={tempUser.name_th} />
          </Col>
          <Col className="py-3">
            <p>นามสกุล (ไทย)</p>
            <Form.Control id="surname_th" onChange={handleChange} value={tempUser.surname_th} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>ชื่อผู้ใช้</p>
            <Form.Label className="font-weight-bold">{tempUser.username}</Form.Label>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <p>อีเมลส่วนตัว</p>
            <Form.Control id="personal_email" onChange={handleChange} value={tempUser.personal_email} />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p>เบอร์โทร</p>
            <Form.Control id="phone" onChange={handleChange} value={tempUser.phone} />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สถานะการแบน</Form.Label>
            <Form.Control className="m-0" as="select" id="is_penalize" onChange={handleChange} value={tempUser.is_penalize ? 1 : 0}>
              <option value={0}>ปกติ</option>
              <option value={1}>โดนแบน</option>
            </Form.Control>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Form.Label>สิ้นสุดการแบน</Form.Label>
            <Row>
              <Col sm={4}>
                <Form.Control
                  disabled={tempUser.is_penalize ? false : true}
                  id="expired_penalize_date"
                  type="date"
                  onChange={handleChange}
                  value={tempUser.is_penalize && isValid(date) ? format(date, "yyyy-MM-dd") : ""}
                />
              </Col>
              <Col>
                <Form.Control
                  style={{ width: "25%" }}
                  disabled={tempUser.is_penalize ? false : true}
                  id="expiredPenalizeTime"
                  type="time"
                  onChange={handleChange}
                  value={tempUser.is_penalize && isValid(date) ? format(date, "HH:mm") : ""}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          {String(user.account_type) !== Account[Account.CuStudent] ? (
            <Col className="text-left">
              <Button
                variant="pink"
                className="btn-normal"
                onClick={() => {
                  setTempUser({ ...tempUser, password: "" })
                  setNewPassword("")
                  setConfirmPassword("")
                  setShowChangePassword(true)
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
          <Col>{isEditing ? renderEditingForm() : renderForm()}</Col>
        </Row>
        {renderAlert()}
      </Card>
      {renderModals()}
      {renderPasswordChangeModal()}
    </div>
  )
}

export default UserInfo

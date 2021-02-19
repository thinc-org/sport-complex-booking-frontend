import React, { useState, useEffect, FunctionComponent, useCallback } from "react"
import { Row, Col, Button, Form, Card, Alert } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import format from "date-fns/format"
import { useForm } from "react-hook-form"
import { client } from "../../../../../axiosConfig"
import { CuSatitComponentInfo, ModalUserInfo } from "../interfaces/InfoInterface"
import { renderLoading } from "./ListOfAllUsers"
import { CuStudent, SatitCuPersonel } from "../../../../contexts/UsersContext"
import PasswordChangeModal from "./PasswordChangeModal"
import {
  DeleteModal,
  SaveModal,
  CompleteDeleteModal,
  CompleteSaveModal,
  ErrModal,
  PasswordErrModal,
  ConfirmChangePasswordModal,
} from "./ListOfAllUserModals"
import { isValid } from "date-fns"
import { useTranslation } from "react-i18next"
import { Account } from "../../../../dto/account.dto"
import { infoSchema } from "../../../../schemas/editUserInfo"
import { yupResolver } from "@hookform/resolvers/yup"

type CuSatitType = CuStudent | SatitCuPersonel

const UserInfo: FunctionComponent = () => {
  // page states
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")

  // Modals & Alert //
  const [showModals, setShowModals] = useState<ModalUserInfo>({
    showSave: false,
    showComSave: false,
    showDelete: false,
    showComDelete: false,
    showErr: false,
    showPasswordErr: false,
    showConfirmChange: false,
    showChangePassword: false,
  })
  // Alert //
  const [showAlert, setShowAlert] = useState<boolean>(false)

  // user states
  const [user, setUser] = useState<CuSatitType>({
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
    is_first_login: false,
  })
  const [tempUser, setTempUser] = useState<CuSatitType>(user)

  // react router dom //
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(infoSchema) })
  const history = useHistory()
  const { accType, _id } = useParams<{ accType: string; _id: string }>()
  const { t } = useTranslation()

  const getInfo = useCallback(() => {
    client
      .get<CuSatitType>(`/list-all-user/id/${_id}`)
      .then(({ data }) => {
        data.account_type === "CuStudent" ? setUser(data as CuStudent) : setUser(data as SatitCuPersonel)
        setIsLoading(false)
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [_id, history])

  // useEffects //
  useEffect(() => {
    getInfo()
  }, [getInfo])

  // Alerts & Modals //
  const renderAlert = () => {
    return (
      <Alert show={showAlert} variant="danger" style={{ fontWeight: "lighter" }}>
        กรุณากรอกรายละเอียดให้ครบ
      </Alert>
    )
  }

  // handles //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "is_penalize") {
      // set is_penalize
      if (e.target.value === "1") setTempUser({ ...tempUser, [e.target.id]: true })
      else setTempUser({ ...tempUser, [e.target.id]: false })
    } else if (e.target.id === "expired_penalize_date") {
      // set date
      const incom: Date = new Date(e.target.value)
      const old: Date = new Date(tempUser.expired_penalize_date)
      let date: Date = new Date(incom.getFullYear(), incom.getMonth(), incom.getDate(), old.getHours(), old.getMinutes())
      if (date < new Date()) date = new Date()
      setTempUser({ ...tempUser, expired_penalize_date: date })
    } else if (e.target.id === "expiredPenalizeTime") {
      // set time
      const date: Date = new Date(tempUser.expired_penalize_date)
      const hour: number = parseInt(e.target.value.slice(0, 2))
      const minute: number = parseInt(e.target.value.slice(3, 5))
      let newDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0)
      if (newDate < new Date()) newDate = new Date()
      setTempUser({ ...tempUser, expired_penalize_date: newDate })
    } else setTempUser({ ...tempUser, [e.target.id]: e.target.value })
  }

  const handleEdit = () => {
    setTempUser(user)
    setEditing(true)
  }

  const handleCancelChange = () => {
    // need to undo changes
    setEditing(false)
    setShowAlert(false)
  }

  const handleConfirmChange = (data: CuSatitComponentInfo) => {
    // if some input is blank -> alert //
    // else -> try change //
    setTempUser({ ...tempUser, ...data })
    const { name_th, surname_th, name_en, surname_en, personal_email, phone } = data
    if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "")
      setShowModals({ ...showModals, showSave: true })
    else setShowAlert(true)
  }

  // requests //
  const requestSave = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    const { name_th, surname_th, name_en, surname_en, personal_email, phone, is_penalize, expired_penalize_date } = tempUser
    setShowModals({ ...showModals, showSave: false })
    setShowAlert(false)
    client({
      method: "PUT",
      url: `/list-all-user/${accType}/${_id}`,
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
      .then(() => {
        setUser(tempUser)
        setShowModals({ ...showModals, showSave: false, showComSave: true })
        setEditing(false)
      })
      .catch(({ response }) => {
        setShowModals({ ...showModals, showSave: false, showErr: true })
      })
  }

  const requestDelete = () => {
    setShowAlert(false)
    client({
      method: "DELETE",
      url: `/list-all-user/${_id}`,
    })
      .then(() => {
        setShowModals({ ...showModals, showDelete: false, showComDelete: true })
      })
      .catch(({ response }) => {
        setShowModals({ ...showModals, showDelete: false, showErr: true })
      })
  }

  const requestChangePassword = () => {
    client({
      method: "PATCH",
      url: `/list-all-user/password/${_id}`,
      data: {
        password: newPassword,
      },
    })
      .then(() => {
        setShowModals({ ...showModals, showConfirmChange: false, showChangePassword: false })
      })
      .catch((err) => {
        setShowModals({ ...showModals, showErr: true })
      })
  }

  // renders //
  const renderModals = () => {
    const { username } = user
    return (
      <div>
        <DeleteModal showModalInfo={showModals} setShowModalInfo={setShowModals} info={{ requestDelete, username }} />
        <CompleteDeleteModal showModalInfo={showModals} setShowModalInfo={setShowModals} info={{ username }} />
        <SaveModal showModalInfo={showModals} setShowModalInfo={setShowModals} info={{ requestSave }} />
        <CompleteSaveModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <ErrModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <PasswordErrModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <ConfirmChangePasswordModal showModalInfo={showModals} setShowModalInfo={setShowModals} info={{ requestChangePassword }} />
        <PasswordChangeModal showModals={showModals} setShowModals={setShowModals} setNewPassword={setNewPassword} />
      </div>
    )
  }

  const renderForm = () => {
    const date: Date = new Date(user.expired_penalize_date)
    return (
      <div className="userInformation">
        <Row className="py-3">
          <Col>
            <p>ประเภท</p>
            <p className="font-weight-bold mb-0">{t(user.account_type.toString())}</p>
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
            <p>สิ้นสุดการแบน</p>
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
                setShowModals({ ...showModals, showDelete: true })
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
    const date: Date = new Date(tempUser.expired_penalize_date)
    return (
      <div className="userInformation">
        <Form onSubmit={handleSubmit(handleConfirmChange)}>
          <Row>
            <Col className="py-3">
              <p>ประเภทบัญชี</p>
              <Form.Label className="font-weight-bold">{t(user.account_type.toString())}</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col className="py-3">
              <p>ชื่อ (อังกฤษ)</p>
              {String(user.account_type) === Account[Account.CuStudent] ? (
                <p className="font-weight-bold mb-0">{user.name_en}</p>
              ) : (
                <Form.Control ref={register} name="name_en" defaultValue={user.name_en} />
              )}
            </Col>
            <Col className="py-3">
              <p>นามสกุล (อังกฤษ)</p>
              {String(user.account_type) === Account[Account.CuStudent] ? (
                <p className="font-weight-bold mb-0">{user.surname_en}</p>
              ) : (
                <Form.Control ref={register} name="surname_en" defaultValue={user.surname_en} />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="py-3">
              <p>ชื่อ (ไทย)</p>
              {String(user.account_type) === Account[Account.CuStudent] ? (
                <p className="font-weight-bold mb-0">{user.name_th}</p>
              ) : (
                <Form.Control ref={register} name="name_th" defaultValue={user.name_th} />
              )}
            </Col>
            <Col className="py-3">
              <p>นามสกุล (ไทย)</p>
              {String(user.account_type) === Account[Account.CuStudent] ? (
                <p className="font-weight-bold mb-0">{user.surname_th}</p>
              ) : (
                <Form.Control ref={register} name="surname_th" defaultValue={user.surname_th} />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="py-3">
              <p>ชื่อผู้ใช้</p>
              <Form.Label className="font-weight-bold">{user.username}</Form.Label>
            </Col>
          </Row>
          <Row className="py-3">
            <Col>
              <p>อีเมลส่วนตัว</p>
              <Form.Control ref={register} name="personal_email" defaultValue={user.personal_email} />
            </Col>
          </Row>
          {errors.personal_email && (
            <span role="alert" style={{ fontWeight: "lighter", color: "red" }}>
              {errors.personal_email.message}
            </span>
          )}
          <Row>
            <Col className="py-3">
              <p>เบอร์โทร</p>
              <Form.Control ref={register} name="phone" defaultValue={user.phone} />
            </Col>
          </Row>
          {errors.phone && (
            <span role="alert" style={{ fontWeight: "lighter", color: "red" }}>
              {errors.phone.message}
            </span>
          )}
          <Row className="py-3">
            <Col>
              <p>สถานะการแบน</p>
              <Form.Control className="m-0" as="select" id="is_penalize" onChange={handleChange} value={tempUser.is_penalize ? 1 : 0}>
                <option value={0}>ปกติ</option>
                <option value={1}>โดนแบน</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="py-3">
            <Col>
              <p>สิ้นสุดการแบน</p>
              <Row>
                <Col sm={4}>
                  <Form.Control
                    id="expired_penalize_date"
                    disabled={tempUser.is_penalize ? false : true}
                    type="date"
                    onChange={handleChange}
                    value={tempUser.is_penalize && isValid(date) ? format(date, "yyyy-MM-dd") : ""}
                  />
                </Col>
                <Col>
                  <Form.Control
                    id="expiredPenalizeTime"
                    style={{ width: "25%" }}
                    disabled={tempUser.is_penalize ? false : true}
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
                    setShowModals({ ...showModals, showChangePassword: true })
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
              <Button variant="pink" className="btn-normal" type="submit">
                บันทึก
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }

  return (
    <>
      <div className="UserInfo" style={{ display: isLoading ? "none" : "block" }}>
        <Card body border="light" className="justify-content-center px-3 ml-1 mr-3 my-4 shadow">
          <Row className="pb-3">
            <Col>{isEditing ? renderEditingForm() : renderForm()}</Col>
          </Row>
          {renderAlert()}
        </Card>
        {renderModals()}
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default UserInfo

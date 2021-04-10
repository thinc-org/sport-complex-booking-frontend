import React, { useState, useEffect, FunctionComponent, useCallback } from "react"
import { Row, Col, Button, Form, Card, Alert } from "react-bootstrap"
import { Link, useHistory, useParams } from "react-router-dom"
import { format, isValid } from "date-fns"
import { useForm } from "react-hook-form"
import { client } from "../../../../../axiosConfig"
import { CuSatitComponentInfo, ModalUserInfo } from "../interfaces/InfoInterface"
import { renderLoading } from "./ListOfAllUsers"
import { handlePDF } from "./OtherViewInfoComponent"
import { CuStudent, SatitCuPersonel } from "../../../../contexts/UsersContext"
import PasswordChangeModal from "./PasswordChangeModal"
import {
  DeleteModal,
  SaveModal,
  CompleteDeleteModal,
  CompleteSaveModal,
  UncomExpireDateModal,
  ErrModal,
  UploadErrModal,
  PasswordErrModal,
  ConfirmChangePasswordModal,
} from "./ListOfAllUserModals"
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
  const [paymentNo, setPaymentNo] = useState<number>(2)

  // Modals & Alert //
  const [showModals, setShowModals] = useState<ModalUserInfo>("none")
  const [showAlert, setShowAlert] = useState<boolean>(false)

  // user states
  const [studentCardPhotoFile, setStudentCardPhotoFile] = useState<File>()
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
    expired_penalize_date: null,
    is_first_login: false,
  })
  const [tempUser, setTempUser] = useState<CuSatitType>(user)

  // react router dom //
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(infoSchema) })
  const history = useHistory()
  const { accType, _id } = useParams<{ accType: "satit" | "other"; _id: string }>()
  const { t } = useTranslation()

  const getInfo = useCallback(() => {
    client
      .get<CuSatitType>(`/list-all-user/id/${_id}`)
      .then(({ data }) => {
        if (data.expired_penalize_date === null) data.account_type === "CuStudent" ? setUser(data as CuStudent) : setUser(data as SatitCuPersonel)
        else
          data.account_type === "CuStudent"
            ? setUser({ ...(data as CuStudent), expired_penalize_date: new Date(data.expired_penalize_date!) })
            : setUser({
                ...(data as SatitCuPersonel),
                expired_penalize_date: new Date(data.expired_penalize_date!),
                account_expiration_date: new Date(data.account_expiration_date!),
              })
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
  const handleUpload = (typename: string, file: File) => {
    const formData = new FormData()
    const selectedFile = file
    // Update the formData object
    if (selectedFile) {
      formData.append(typename, selectedFile, selectedFile.name)
      // Request made to the backend api
      client({
        method: "POST",
        url: `/fs/admin/upload/${_id}`,
        data: formData,
      })
        .then(({ data }) => {
          setTempUser({
            ...(tempUser as SatitCuPersonel),
            student_card_photo: data[Object.keys(data)[0]],
          })
        })
        .catch(({ response }) => {
          setShowModals("showUploadErr")
          console.log(response)
        })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "is_penalize") {
      // set is_penalize
      if (e.target.value === "1") setTempUser({ ...tempUser, [e.target.id]: true })
      else setTempUser({ ...tempUser, [e.target.id]: false })
    }
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
    const newPenExp: Date = new Date(`${data.expired_penalize_date} ${data.expired_penalize_time}`)
    const newAccExp: Date = new Date(`${data.account_expiration_date} ${data.account_expiration_time}`)
    if (tempUser.is_penalize && (!data.expired_penalize_date || !data.expired_penalize_time || !isValid(newPenExp) || newPenExp < new Date()))
      setShowModals("showUncomExpire")
    else if (
      user.account_type === "SatitAndCuPersonel" &&
      (!data.account_expiration_date || !data.account_expiration_time || !isValid(newAccExp) || newAccExp < new Date())
    )
      setShowModals("showUncomExpire")
    else {
      const { expired_penalize_date, expired_penalize_time, account_expiration_date, account_expiration_time, ...rest } = data
      const { name_th, surname_th, name_en, surname_en, personal_email, phone } = rest
      if (user.account_type === "CuStudent") setTempUser({ ...(tempUser as CuStudent), expired_penalize_date: newPenExp, ...rest })
      else setTempUser({ ...(tempUser as SatitCuPersonel), expired_penalize_date: newPenExp, account_expiration_date: newAccExp, ...rest })
      if (name_th !== "" && surname_th !== "" && name_en !== "" && surname_en !== "" && personal_email !== "" && phone !== "")
        setShowModals("showSave")
      else setShowAlert(true)
    }
  }

  // requests //
  const requestSave = () => {
    // if change complete -> pop up "ok" //
    // if change error -> pop up "not complete" -> back to old data //
    if (studentCardPhotoFile) handleUpload("student_card_photo", studentCardPhotoFile)
    setShowAlert(false)
    client({
      method: "PUT",
      url: `/list-all-user/${accType}/${_id}`,
      data: tempUser,
    })
      .then(() => {
        setUser(tempUser)
        setShowModals("showComSave")
        setEditing(false)
      })
      .catch(() => {
        setShowModals("showErr")
      })
  }

  const requestDelete = () => {
    setShowAlert(false)
    client({
      method: "DELETE",
      url: `/list-all-user/${_id}`,
    })
      .then(() => {
        setShowModals("showComDelete")
      })
      .catch(() => {
        setShowModals("showErr")
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
        setShowModals("none")
      })
      .catch(() => {
        setShowModals("showErr")
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
        <UncomExpireDateModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <ErrModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <UploadErrModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <PasswordErrModal showModalInfo={showModals} setShowModalInfo={setShowModals} />
        <ConfirmChangePasswordModal showModalInfo={showModals} setShowModalInfo={setShowModals} info={{ requestChangePassword }} />
        <PasswordChangeModal showModals={showModals} setShowModals={setShowModals} setNewPassword={setNewPassword} />
      </div>
    )
  }

  let prevSlips: string[] = []
  if (accType === "satit") prevSlips = (user as SatitCuPersonel).previous_student_card_photo

  const renderForm = () => {
    return (
      <div className="userInformation">
        <Row className="py-3">
          <Col>
            <p>ประเภทบัญชี</p>
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
          {user.account_type === "SatitAndCuPersonel" ? (
            <Col>
              <p>รูปภาพบัตรนักเรียน</p>
              <div className="form-file">
                {prevSlips && prevSlips.length !== 0 ? (
                  <Form.Control
                    as="select"
                    defaultValue={2}
                    onChange={(e) => setPaymentNo(parseInt(e.target.value))}
                    style={{ width: "min-content" }}
                  >
                    <option disabled value={2}>
                      เลือกดูหลักฐานการชำระเงิน
                    </option>
                    <option value={prevSlips.length - 1}>ครั้งล่าสุด</option>
                    <option disabled={prevSlips.length - 2 < 0} value={prevSlips.length - 2}>
                      ก่อนหน้าครั้งล่าสุด
                    </option>
                  </Form.Control>
                ) : (
                  <Form.Control disabled as="select" defaultValue={0}>
                    <option value={0}>ไม่มีหลักฐานการชำระเงิน</option>
                  </Form.Control>
                )}
                <p
                  className={prevSlips && prevSlips[paymentNo] ? "link" : "text-muted"}
                  id={prevSlips ? prevSlips[paymentNo] : undefined}
                  onClick={handlePDF}
                >
                  ดูเอกสาร
                </p>
              </div>
            </Col>
          ) : null}
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
              <Col style={{ width: "60%" }}>
                <Form.Control
                  disabled
                  type="date"
                  style={{ width: "min-content" }}
                  value={user.is_penalize && isValid(user.expired_penalize_date) ? format(user.expired_penalize_date!, "yyyy-MM-dd") : ""}
                />
              </Col>
              <Col style={{ width: "40%" }}>
                <Form.Control
                  disabled
                  type="time"
                  style={{ width: "min-content" }}
                  value={user.is_penalize && isValid(user.expired_penalize_date) ? format(user.expired_penalize_date!, "HH:mm") : ""}
                />
              </Col>
            </Row>
          </Col>
          {user.account_type === "SatitAndCuPersonel" ? (
            <Col>
              <p>วันหมดอายุสมาชิก</p>
              <Row>
                <Col style={{ width: "60%" }}>
                  <Form.Control
                    disabled
                    type="date"
                    style={{ width: "min-content" }}
                    value={
                      isValid((user as SatitCuPersonel).account_expiration_date)
                        ? format((user as SatitCuPersonel).account_expiration_date!, "yyyy-MM-dd")
                        : ""
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    disabled
                    type="time"
                    style={{ width: "min-content" }}
                    value={
                      isValid((user as SatitCuPersonel).account_expiration_date)
                        ? format((user as SatitCuPersonel).account_expiration_date!, "HH:mm")
                        : ""
                    }
                  />
                </Col>
              </Row>
            </Col>
          ) : null}
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
                setShowModals("showDelete")
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
          <Row className="py-3">
            <Col>
              <p>ชื่อผู้ใช้</p>
              <Form.Label className="font-weight-bold">{user.username}</Form.Label>
            </Col>
            {user.account_type === "SatitAndCuPersonel" ? (
              <Col>
                <p>รูปภาพบัตรนักเรียน</p>
                <Form.File
                  label={studentCardPhotoFile ? (studentCardPhotoFile as File).name : "Choose File"}
                  custom
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]?.size <= 2097152) {
                      setStudentCardPhotoFile(e.target.files[0])
                    } else alert(t("fileTooBig"))
                  }}
                />
              </Col>
            ) : null}
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
              <Form.Control ref={register} name="phone" defaultValue={user.phone} type="tel" />
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
                <Col style={{ width: "60%" }}>
                  <Form.Control
                    ref={register}
                    name="expired_penalize_date"
                    disabled={!tempUser.is_penalize}
                    type="date"
                    max={"9999-12-31"}
                    style={{ width: "min-content" }}
                    defaultValue={
                      tempUser.is_penalize && isValid(tempUser.expired_penalize_date) ? format(tempUser.expired_penalize_date!, "yyyy-MM-dd") : ""
                    }
                  />
                </Col>
                <Col style={{ width: "40%" }}>
                  <Form.Control
                    ref={register}
                    name="expired_penalize_time"
                    disabled={!tempUser.is_penalize}
                    type="time"
                    style={{ width: "min-content" }}
                    defaultValue={
                      tempUser.is_penalize && isValid(tempUser.expired_penalize_date) ? format(tempUser.expired_penalize_date!, "HH:mm") : ""
                    }
                  />
                </Col>
              </Row>
            </Col>
            {user.account_type === "SatitAndCuPersonel" ? (
              <Col>
                <p>วันหมดอายุสมาชิก</p>
                <Row>
                  <Col style={{ width: "60%" }}>
                    <Form.Control
                      ref={register}
                      name="account_expiration_date"
                      type="date"
                      style={{ width: "min-content" }}
                      defaultValue={
                        isValid((user as SatitCuPersonel).account_expiration_date)
                          ? format((user as SatitCuPersonel).account_expiration_date!, "yyyy-MM-dd")
                          : ""
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      ref={register}
                      name="account_expiration_time"
                      type="time"
                      style={{ width: "min-content" }}
                      defaultValue={
                        isValid((user as SatitCuPersonel).account_expiration_date)
                          ? format((user as SatitCuPersonel).account_expiration_date!, "HH:mm")
                          : ""
                      }
                    />
                  </Col>
                </Row>
              </Col>
            ) : null}
          </Row>
          <Row className="mt-5">
            {String(user.account_type) !== Account[Account.CuStudent] ? (
              <Col className="text-left">
                <Button
                  variant="pink"
                  className="btn-normal"
                  onClick={() => {
                    setShowModals("showChangePassword")
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

import React, { useState, useEffect, useCallback } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { Other } from "../../../../contexts/UsersContext"
import OtherViewInfoComponent from "./OtherViewInfoComponent"
import OtherEditInfoComponent from "./OtherEditInfoComponent"
import PasswordChangeModal from "./PasswordChangeModal"
import {
  DeleteModal,
  CompleteDeleteModal,
  SaveModal,
  CompleteSaveModal,
  ErrModal,
  PasswordErrModal,
  ConfirmChangePasswordModal,
} from "./ListOfAllUserModals"
import Info, { ModalUserInfo } from "../interfaces/InfoInterface"
import format from "date-fns/format"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { emailSchema } from "../../../../schemas/editUserInfo"

const UserInfo = () => {
  // page state //
  const [isEdit, setEdit] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")
  const [showModalInfo, setShowModalInfo] = useState<ModalUserInfo>({
    showDelete: false,
    showComDelete: false,
    showSave: false,
    showComSave: false,
    showErr: false,
    showPasswordErr: false,
    showConfirmChange: false,
    showChangePassword: false,
  })

  // Non CU state //
  const [username, setUsername] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")
  const [isPenalize, setPenalize] = useState<boolean>(false)
  const [expiredPenalizeDate, setExpiredPenalizeDate] = useState<Date>(new Date())
  const [accountExpiredDate, setAccountExpiredDate] = useState<Date>(new Date())
  const [info, setInfo] = useState<Info>({
    prefix: "",
    name_th: "",
    surname_th: "",
    name_en: "",
    surname_en: "",
    gender: "",
    birthday: new Date(),
    national_id: "",
    marital_status: "",
    address: "",
    email: "",
    phone: "",
    home_phone: "",
    medical_condition: "",
    contact_person: {
      contact_person_prefix: "",
      contact_person_name: "",
      contact_person_surname: "",
      contact_person_home_phone: "",
      contact_person_phone: "",
    },
    membership_type: membershipType,
    // object id //
    user_photo: "",
    medical_certificate: "",
    national_id_photo: "",
    house_registration_number: "",
    relationship_verification_document: "",
  })
  // temp data
  const [tempUsername, setTempUsername] = useState<string>("")
  const [tempMembershipType, setTempMembershipType] = useState<string>("")
  const [tempIsPenalize, setTempPenalize] = useState<boolean>(false)
  const [tempExpiredPenalizeDate, setTempExpiredPenalizeDate] = useState<Date>(new Date())
  const [tempAccountExpiredDate, setTempAccountExpiredDate] = useState<Date>(new Date())
  const [tempInfo, setTempInfo] = useState<Info>(info)

  // react router dom
  const { _id } = useParams<{ _id: string }>()
  const methods = useForm({ resolver: yupResolver(emailSchema) })
  const { register, errors } = methods
  const history = useHistory()

  // requests //
  const fetchUserData = useCallback(async () => {
    await client
      .get<Other>(`/list-all-user/id/${_id}`)
      .then(({ data }) => {
        setUsername(data.username)
        setMembershipType(data.membership_type)
        setPenalize(data.is_penalize)
        setExpiredPenalizeDate(data.expired_penalize_date)
        setAccountExpiredDate(data.account_expiration_date)
        setInfo({
          prefix: data.prefix,
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
          gender: data.gender,
          birthday: new Date(data.birthday),
          national_id: data.national_id,
          marital_status: data.marital_status,
          address: data.address,
          email: data.personal_email,
          phone: data.phone,
          home_phone: data.home_phone,
          medical_condition: data.medical_condition,
          contact_person: data.contact_person
            ? data.contact_person
            : {
                contact_person_prefix: "",
                contact_person_name: "",
                contact_person_surname: "",
                contact_person_home_phone: "",
                contact_person_phone: "",
              },
          membership_type: data.membership_type,
          // Files(Object id) //
          user_photo: data.user_photo,
          medical_certificate: data.medical_certificate,
          national_id_photo: data.national_id_photo,
          house_registration_number: data.house_registration_number,
          relationship_verification_document: data.relationship_verification_document,
        })
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [_id, history])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  // handles //
  const handleEdit = () => {
    setTempInfo(info)
    setTempUsername(username)
    setTempMembershipType(membershipType)
    setTempPenalize(isPenalize)
    setTempExpiredPenalizeDate(expiredPenalizeDate)
    setTempAccountExpiredDate(accountExpiredDate)
    setEdit(true)
  }

  const handleSave = () => {
    setShowModalInfo({ ...showModalInfo, showSave: true })
  }

  const handleChangeDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
    const oldPenExp: Date = tempExpiredPenalizeDate ? new Date(tempExpiredPenalizeDate) : new Date()
    const oldAcExp: Date = tempAccountExpiredDate ? new Date(tempAccountExpiredDate) : new Date()
    const incom: Date = new Date(e.target.value)
    if (id === "expiredPenalizeDate") {
      let date: Date = new Date(incom.getFullYear(), incom.getMonth(), incom.getDate(), oldPenExp.getHours(), oldPenExp.getMinutes())
      if (date < new Date()) date = new Date()
      setTempExpiredPenalizeDate(date)
    } else if (id === "expiredPenalizeTime") {
      const hour: number = parseInt(e.target.value.slice(0, 2))
      const minute: number = parseInt(e.target.value.slice(3, 5))
      let date: Date = new Date(oldPenExp.getFullYear(), oldPenExp.getMonth(), oldPenExp.getDate(), hour, minute, 0)
      if (date < new Date()) date = new Date()
      setTempExpiredPenalizeDate(date)
    } else if (id === "accountExpiredDate") {
      let date: Date = new Date(incom.getFullYear(), incom.getMonth(), incom.getDate(), oldAcExp.getHours(), oldAcExp.getMinutes())
      if (date < new Date()) date = new Date()
      setTempAccountExpiredDate(date)
    } else if (id === "accountExpiredTime") {
      const hour: number = parseInt(e.target.value.slice(0, 2))
      const minute: number = parseInt(e.target.value.slice(3, 5))
      let date: Date = new Date(oldAcExp.getFullYear(), oldAcExp.getMonth(), oldAcExp.getDate(), hour, minute, 0)
      if (date < new Date()) date = new Date()
      setTempAccountExpiredDate(date)
    }
  }

  const requestSave = () => {
    const {
      email,
      phone,
      prefix,
      name_th,
      surname_th,
      name_en,
      surname_en,
      birthday,
      national_id,
      gender,
      marital_status,
      address,
      home_phone,
      contact_person,
      medical_condition,
      user_photo,
      medical_certificate,
      national_id_photo,
      house_registration_number,
      relationship_verification_document,
    } = tempInfo
    client({
      method: "PUT",
      url: `/list-all-user/other/${_id}`,
      data: {
        personal_email: email,
        phone,
        is_thai_language: true,
        prefix,
        name_th,
        surname_th,
        name_en,
        surname_en,
        birthday,
        national_id,
        gender,
        marital_status,
        address,
        home_phone,
        contact_person,
        medical_condition,
        // top section //
        username: tempUsername,
        membership_type: tempMembershipType,
        account_expiration_date: tempAccountExpiredDate,
        is_penalize: tempIsPenalize,
        expired_penalize_date: tempExpiredPenalizeDate,
        // files //
        user_photo,
        medical_certificate,
        national_id_photo,
        house_registration_number,
        relationship_verification_document,
      },
    })
      .then(() => {
        // set temp to data
        setUsername(tempUsername)
        setMembershipType(tempMembershipType)
        setPenalize(tempIsPenalize)
        setExpiredPenalizeDate(tempExpiredPenalizeDate)
        setAccountExpiredDate(tempAccountExpiredDate)
        setInfo(tempInfo)
        // show save complete modal
        setShowModalInfo({ ...showModalInfo, showSave: false, showComSave: true })
        // back to view form
        setEdit(false)
      })
      .catch(({ response }) => {
        setShowModalInfo({ ...showModalInfo, showSave: false, showErr: true })
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
        setShowModalInfo({ ...showModalInfo, showChangePassword: false, showConfirmChange: false })
      })
      .catch((err) => {
        console.log(err)
        setShowModalInfo({ ...showModalInfo, showErr: true })
      })
  }

  const requestDelete = () => {
    client({
      method: "DELETE",
      url: `/list-all-user/${_id}`,
    })
      .then(() => {
        setShowModalInfo({ ...showModalInfo, showDelete: false, showComDelete: true })
      })
      .catch((err) => {
        console.log(err)
        setShowModalInfo({ ...showModalInfo, showDelete: false, showErr: true })
      })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection px-4 pt-2">
        <Form>
          <div className="row">
            <div className="col">
              <label className="mt-2">ประเภท</label>
              <p className="font-weight-bold">อื่นๆ</p>
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">ชื่อผู้ใช้</label>
              {isEdit ? (
                <Form.Control
                  ref={register}
                  name="username"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={username}
                />
              ) : (
                <p className="font-weight-bold">{username}</p>
              )}
              {errors.username && (
                <span role="alert" style={{ fontWeight: "lighter", color: "red" }}>
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">ประเภทบัญชี</label>
              {isEdit ? (
                <div>
                  <Form.Control
                    as="select"
                    className="m-0"
                    defaultValue={tempMembershipType !== "" ? tempMembershipType : "ไม่มี"}
                    onChange={(e) => {
                      setTempMembershipType(e.target.value)
                    }}
                  >
                    <option disabled value="ไม่มี">
                      เลือกประเภทบัญชี
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
                  </Form.Control>
                </div>
              ) : (
                <div>
                  <p className="font-weight-bold">{membershipType}</p>
                </div>
              )}
            </div>
          </div>
          <div className="row pb-2">
            <div className="col">
              <label className="mt-2">สถานะการแบน</label>
              {isEdit ? (
                <Form.Control
                  className="border m-0"
                  style={{ backgroundColor: "white" }}
                  as="select"
                  defaultValue={isPenalize ? 1 : 0}
                  onChange={(e) => {
                    setTempPenalize(e.target.value !== "0" ? true : false)
                  }}
                >
                  <option value={0}>ปกติ</option>
                  <option value={1}>โดนแบน</option>
                </Form.Control>
              ) : (
                <p className="font-weight-bold">{isPenalize ? "โดนแบน" : "ปกติ"}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="mt-2">สิ้นสุดการแบน</label>
              <div className="row">
                <div className="col pr-0" style={{ width: "60%" }}>
                  <Form.Control
                    type="date"
                    id="expiredPenalizeDate"
                    disabled={!isEdit || !tempIsPenalize}
                    value={
                      isEdit
                        ? tempExpiredPenalizeDate && tempIsPenalize
                          ? format(new Date(tempExpiredPenalizeDate), "yyyy-MM-dd")
                          : ""
                        : isPenalize
                        ? format(new Date(expiredPenalizeDate), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={handleChangeDateTime}
                  />
                </div>
                <div className="col" style={{ width: "40%" }}>
                  <Form.Control
                    type="time"
                    id="expiredPenalizeTime"
                    disabled={!isEdit || !tempIsPenalize}
                    value={
                      isEdit
                        ? tempExpiredPenalizeDate && tempIsPenalize
                          ? format(new Date(tempExpiredPenalizeDate), "HH:mm")
                          : ""
                        : isPenalize
                        ? format(new Date(expiredPenalizeDate), "HH:mm")
                        : ""
                    }
                    onChange={handleChangeDateTime}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <label className="mt-2">วันหมดอายุสมาชิก</label>
              <div className="row">
                <div className="col pr-0" style={{ width: "60%" }}>
                  <Form.Control
                    type="date"
                    id="accountExpiredDate"
                    disabled={!isEdit}
                    value={
                      isEdit
                        ? tempAccountExpiredDate
                          ? format(new Date(tempAccountExpiredDate), "yyyy-MM-dd")
                          : ""
                        : accountExpiredDate
                        ? format(new Date(accountExpiredDate), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={handleChangeDateTime}
                  />
                </div>
                <div className="col" style={{ width: "40%" }}>
                  <Form.Control
                    type="time"
                    id="accountExpiredTime"
                    disabled={!isEdit}
                    value={
                      isEdit
                        ? tempAccountExpiredDate
                          ? format(new Date(tempAccountExpiredDate), "HH:mm")
                          : ""
                        : accountExpiredDate
                        ? format(new Date(accountExpiredDate), "HH:mm")
                        : ""
                    }
                    onChange={handleChangeDateTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }

  const renderViewForm = () => {
    return (
      <div>
        <OtherViewInfoComponent info={info} />
        <div className="mt-5">
          <Link to="/staff/listOfAllUsers">
            <Button variant="outline-secondary" className="btn-normal btn-outline-pink">
              กลับ
            </Button>
          </Link>

          <Button variant="pink" className="float-right btn-normal" onClick={handleEdit}>
            แก้ไข
          </Button>
          <Button
            variant="outline-danger"
            className="float-right btn-normal btn-outline-red mr-3"
            onClick={() => {
              setShowModalInfo({ ...showModalInfo, showDelete: true })
            }}
          >
            ลบผู้ใช้
          </Button>
        </div>
      </div>
    )
  }

  const renderEditForm = () => {
    return (
      <div>
        <OtherEditInfoComponent tempInfo={tempInfo} setTempInfo={setTempInfo} setTempUsername={setTempUsername} handleSave={handleSave} />
        <div className="mt-5">
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowModalInfo({ ...showModalInfo, showChangePassword: true })
            }}
          >
            เปลี่ยนรหัสผ่าน
          </Button>
          <Button
            variant="outline-danger"
            className="float-right btn-normal btn-outline-pink mr-3"
            onClick={() => {
              setEdit(false)
            }}
          >
            ยกเลิก
          </Button>
        </div>
      </div>
    )
  }

  const renderModals = () => {
    return (
      <div>
        <DeleteModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestDelete, username }} />
        <CompleteDeleteModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ username }} />
        <SaveModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestSave }} />
        <CompleteSaveModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ErrModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <PasswordErrModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ConfirmChangePasswordModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ requestChangePassword }} />
        <PasswordChangeModal showModals={showModalInfo} setShowModals={setShowModalInfo} setNewPassword={setNewPassword} />
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <div className="UserInfo mt-4">
        {renderModals()}
        {/* Info start here */}
        <Card body className="mb-5 mr-4">
          {renderTopSection()}
          {isEdit ? renderEditForm() : renderViewForm()}
        </Card>
      </div>
    </FormProvider>
  )
}

export default UserInfo

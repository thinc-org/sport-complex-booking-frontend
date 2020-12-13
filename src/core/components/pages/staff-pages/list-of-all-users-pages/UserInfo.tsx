import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import OtherViewInfoComponent from "./OtherViewInfoComponent"
import OtherEditInfoComponent from "./OtherEditInfoComponent"
import ModalsComponent from "./OtherModalsComponent"
import Info, { ContactPerson } from "../interfaces/InfoInterface"
import { ModalUserInfo } from "../interfaces/InfoInterface"

export const convertDate = (date: Date) => {
  if (date < new Date()) {
    date = new Date()
  }
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  let year = date.getFullYear()
  let format_date = year + "-" + month + "-" + day
  return format_date
}

const UserInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // console.log(props)
  // page state //
  const [isEdit, setEdit] = useState<boolean>(false)
  const [jwt, setJwt] = useState<string>("")
  const [show_modal_info, set_show_modal_info] = useState<ModalUserInfo>({
    show_delete: false,
    show_com_delete: false,
    show_save: false,
    show_com_save: false,
    show_err: false,
  })

  // Non CU state //
  const [_id] = useState<string>(props.match.params._id)
  const [username, set_username] = useState<string>("")
  const [account_type, set_account_type] = useState<string>("")
  const [membership_type, set_membership_type] = useState<string>("")
  const [is_penalize, set_penalize] = useState<boolean>(false)
  const [expired_penalize_date, set_expired_penalize_date] = useState<Date>(new Date())
  const [account_expired_date, set_account_expired_date] = useState<Date>(new Date())
  const [contact, setContact] = useState<ContactPerson>({
    contact_person_prefix: "",
    contact_person_name: "",
    contact_person_surname: "",
    contact_person_home_phone: "",
    contact_person_phone: "",
  })
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
    contact_person: contact,
    membership_type: membership_type,
    // object id //
    user_photo: "",
    medical_certifiate: "",
    national_id_photo: "",
    house_registration_number: "",
    relationship_verification_document: "",
  })
  // temp data
  const [temp_username, set_temp_username] = useState<string>("")
  const [temp_membership_type, set_temp_membership_type] = useState<string>("")
  const [temp_is_penalize, set_temp_penalize] = useState<boolean>(false)
  const [temp_expired_penalize_date, set_temp_expired_penalize_date] = useState<Date>(new Date())
  const [temp_account_expired_date, set_temp_account_expired_date] = useState<Date>(new Date())
  const [temp_info, set_temp_info] = useState<Info>(info)

  useEffect(() => {
    // console.log("re-rendered")
    fetch({
      method: "GET",
      url: "/account_info/testing/adminToken",
    }).then(({ data }) => {
      setJwt(data.token.token)
    })
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [jwt])

  // useEffect(() => {
  //   console.log(membership_type)
  // }, [membership_type])

  const fetchUserData = async () => {
    await fetch({
      method: "GET",
      url: "/list-all-user/findById/" + _id,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(({ data }) => {
        console.log(data)
        if (data.contact_person) {
          setContact({
            contact_person_prefix: data.contact_person.contact_person_prefix,
            contact_person_name: data.contact_person.contact_person_name,
            contact_person_surname: data.contact_person.contact_person_surname,
            contact_person_home_phone: data.contact_person.contact_person_home_phone,
            contact_person_phone: data.contact_person.contact_person_phone,
          })
        }
        set_username(data.username)
        set_account_type(data.account_type)
        set_membership_type(data.membership_type)
        set_penalize(data.is_penalize)
        set_expired_penalize_date(data.expired_penalize_date)
        set_account_expired_date(data.account_expiration_date)
        setInfo({
          prefix: data.prefix,
          name_th: data.name_th,
          surname_th: data.surname_th,
          name_en: data.name_en,
          surname_en: data.surname_en,
          gender: data.gender,
          birthday: data.birthday,
          national_id: data.national_id,
          marital_status: data.marital_status,
          address: data.address,
          email: data.personal_email,
          phone: data.phone,
          home_phone: data.home_phone,
          medical_condition: data.medical_condition,
          contact_person: contact,
          membership_type: data.membership_type,
          // Files(Object id) //
          user_photo: data.user_photo,
          medical_certifiate: data.medical_certifiate,
          national_id_photo: data.national_id_photo,
          house_registration_number: data.house_registration_number,
          relationship_verification_document: data.relationship_verification_document,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // handles //
  const handleEdit = () => {
    set_temp_info(info)
    set_temp_username(username)
    set_temp_membership_type(membership_type)
    set_temp_penalize(is_penalize)
    set_temp_expired_penalize_date(expired_penalize_date)
    set_temp_account_expired_date(account_expired_date)
    setEdit(true)
  }

  const handleSave = () => {
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
      medical_certifiate,
      national_id_photo,
      house_registration_number,
      relationship_verification_document,
    } = temp_info
    // console.log("saving...")
    fetch({
      method: "PATCH",
      url: "/list-all-user/" + _id,
      headers: {
        Authorization: "bearer " + jwt,
      },
      data: {
        // info //
        personal_email: email,
        phone: phone,
        is_thai_language: true,
        prefix: prefix,
        name_th: name_th,
        surname_th: surname_th,
        name_en: name_en,
        surname_en: surname_en,
        birthday: birthday,
        national_id: national_id,
        gender: gender,
        marital_status: marital_status,
        address: address,
        home_phone: home_phone,
        contact_person: contact_person,
        medical_condition: medical_condition,
        // top section //
        username: temp_username,
        membership_type: temp_membership_type,
        account_expiration_date: temp_account_expired_date,
        is_penalize: temp_is_penalize,
        expired_penalize_date: temp_expired_penalize_date,
        // files //
        user_photo: user_photo,
        medical_certifiate: medical_certifiate,
        national_id_photo: national_id_photo,
        house_registration_number: house_registration_number,
        relationship_verification_document: relationship_verification_document,
      },
    })
      .then(({ data }) => {
        // console.log("Update completed")
        console.log(data)
        // set temp to data
        set_membership_type(temp_membership_type)
        set_penalize(temp_is_penalize)
        set_expired_penalize_date(temp_expired_penalize_date)
        set_account_expired_date(temp_account_expired_date)
        setInfo(temp_info)
        // show save complete modal
        set_show_modal_info({ ...show_modal_info, show_save: false, show_com_save: true })
        // back to view form
        setEdit(false)
      })
      .catch((err) => {
        console.log(err)
        set_show_modal_info({ ...show_modal_info, show_save: false, show_err: true })
      })
  }

  const handleDeleteUser = () => {
    // console.log("YEET!!")
    fetch({
      method: "DELETE",
      url: "/list-all-user/User/" + _id,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(({ data }) => {
        console.log(data)
        set_show_modal_info({ ...show_modal_info, show_delete: false, show_com_delete: true })
      })
      .catch((err) => {
        console.log(err)
        set_show_modal_info({ ...show_modal_info, show_delete: false, show_err: true })
      })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection px-4 pt-2">
        <div className="row">
          <div className="col">
            <label className="mt-2">ประเภท</label>

            <p className="font-weight-bold">{account_type}</p>
          </div>
        </div>
        <div className="row pb-2">
          <div className="col">
            <label className="mt-2">ชื่อผู้ใช้</label>
            {isEdit ? (
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={username}
                onChange={(e) => {
                  set_temp_username(e.target.value)
                }}
              />
            ) : (
              <p className="font-weight-bold">{username}</p>
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
                  onChange={(e) => {
                    set_temp_membership_type(e.target.value)
                  }}
                  defaultValue={temp_membership_type !== "" ? temp_membership_type : "ไม่มี"}
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
                  <option>นักเรียนสาธิตจุฬา / บุคลากรจุฬา</option>
                </Form.Control>
              </div>
            ) : (
              <div>
                <p className="font-weight-bold">{membership_type}</p>
              </div>
            )}
          </div>
        </div>
        <div className="row pb-2">
          <div className="col">
            <label className="mt-2">สถานะการแบน</label>
            {isEdit ? (
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={is_penalize ? 1 : 0}
                onChange={(e) => {
                  set_temp_penalize(e.target.value ? true : false)
                }}
              >
                <option value={0}>ปกติ</option>
                <option value={1}>โดนแบน</option>
              </Form.Control>
            ) : (
              <p className="font-weight-bold">{is_penalize ? "โดนแบน" : "ปกติ"}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="mt-2">สิ้นสุดการแบน</label>
            <Form.Control
              type="date"
              disabled={!isEdit}
              value={
                isEdit
                  ? temp_expired_penalize_date
                    ? convertDate(new Date(temp_expired_penalize_date))
                    : ""
                  : temp_expired_penalize_date
                  ? convertDate(new Date(expired_penalize_date))
                  : ""
              }
              onChange={(e) => {
                set_temp_expired_penalize_date(new Date(e.target.value))
              }}
            />
          </div>
          <div className="col">
            <label className="mt-2">วันหมดอายุสมาชิก</label>
            <Form.Control
              type="date"
              disabled={!isEdit}
              value={
                isEdit
                  ? temp_account_expired_date
                    ? convertDate(new Date(temp_account_expired_date))
                    : ""
                  : temp_account_expired_date
                  ? convertDate(new Date(account_expired_date))
                  : ""
              }
              onChange={(e) => {
                set_temp_account_expired_date(new Date(e.target.value))
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderViewForm = () => {
    return (
      <div>
        <OtherViewInfoComponent jwt={jwt} info={info} />
        <div className="mt-5">
          <Link to="/listOfAllUsers">
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
              set_show_modal_info({ ...show_modal_info, show_delete: true })
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
        <OtherEditInfoComponent jwt={jwt} temp_info={temp_info} set_temp_info={set_temp_info} _id={_id} />
        <div className="mt-5">
          <Button
            variant="pink"
            className="float-right btn-normal"
            onClick={() => {
              set_show_modal_info({ ...show_modal_info, show_save: true })
            }}
          >
            บันทึก
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

  const renderModal = () => {
    if (show_modal_info.show_delete)
      return (
        <ModalsComponent
          show_modal_info={show_modal_info}
          set_show_modal_info={set_show_modal_info}
          info={{ username, handleDeleteUser }}
          props={props}
        />
      )
    else if (show_modal_info.show_com_delete)
      return <ModalsComponent show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{ username }} props={props} />
    else if (show_modal_info.show_save)
      return <ModalsComponent show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{ handleSave }} props={props} />
    else if (show_modal_info.show_err || show_modal_info.show_com_save) {
      return <ModalsComponent show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{}} props={props} />
    }
  }

  return (
    <div className="UserInfo mt-4">
      {renderModal()}
      {/* Info start here */}
      <Card body className="mb-5 mr-4">
        {renderTopSection()}
        {isEdit ? renderEditForm() : renderViewForm()}
      </Card>
    </div>
  )
}

export default UserInfo

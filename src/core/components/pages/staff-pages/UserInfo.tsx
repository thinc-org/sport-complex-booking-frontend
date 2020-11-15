import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import axios from "axios"
import OtherViewInfoComponent from "./OtherViewInfoComponent"
import OtherEditInfoComponent from "./OtherEditInfoComponent"
import ModalsComponent from "./OtherModalsComponent"

export interface Info {
  prefix: string
  name: string
  surname: string
  gender: string
  birthday: Date
  national_id: string
  marital_status: string
  address: string
  email: string
  phone: string
  home_phone: string
  medical_condition: string
  contact_person: ContactPerson
  membership_type: string
  // object id //
  user_photo: string
  medical_certifiate: string
  national_id_photo: string
  house_registration_number: string
  relationship_verification_document: string
}

interface ContactPerson {
  contact_person_prefix: string
  contact_person_name: string
  contact_person_surname: string
  contact_person_home_phone: string
  contact_person_phone: string
}

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

const UserInfo: FunctionComponent<RouteComponentProps<{ username: string }>> = (props) => {
  // console.log(props)
  // page state //
  const [isEdit, setEdit] = useState<boolean>(false)
  const [jwt, setJwt] = useState<string>("this_is_jwt")
  const [show_del_modal, set_show_del_modal] = useState<boolean>(false)
  const [show_save_modal, set_show_save_modal] = useState<boolean>(false)
  const [show_err_modal, set_show_err_modal] = useState<boolean>(false)

  // Non CU state //
  const [username, setUsername] = useState<string>(props.match.params.username)
  const [account_type, set_account_type] = useState<string>("asdada")
  const [membership_type, set_membership_type] = useState<string>("dasdada")
  const [is_penalize, set_penalize] = useState<boolean>(false)
  const [expired_penalize_date, set_expired_penalize_date] = useState<Date>(new Date())
  const [account_expired_date, set_account_expired_date] = useState<Date>(new Date())
  const [contact, setContact] = useState<ContactPerson>({
    contact_person_prefix: "asd",
    contact_person_name: "g",
    contact_person_surname: "dfh",
    contact_person_home_phone: "dfh",
    contact_person_phone: "hdf",
  })
  const [info, setInfo] = useState<Info>({
    prefix: "นาย",
    name: "naem",
    surname: "vbvb",
    gender: "string",
    birthday: new Date(),
    national_id: "string",
    marital_status: "string",
    address: "string",
    email: "string",
    phone: "081",
    home_phone: "02",
    medical_condition: "string",
    contact_person: contact,
    membership_type: membership_type,
    // object id //
    user_photo: "",
    medical_certifiate: " { Object }",
    national_id_photo: "{ Object }",
    house_registration_number: "{ Object }",
    relationship_verification_document: "{ Object }",
  })
  // temp data
  const [temp_username, set_temp_username] = useState<string>(props.match.params.username)
  const [temp_membership_type, set_temp_membership_type] = useState<string>("dasdada")
  const [temp_is_penalize, set_temp_penalize] = useState<boolean>(false)
  const [temp_expired_penalize_date, set_temp_expired_penalize_date] = useState<Date>(new Date())
  const [temp_account_expired_date, set_temp_account_expired_date] = useState<Date>(new Date())
  const [temp_info, set_temp_info] = useState<Info>(info)

  useEffect(() => {
    console.log("re-rendered")
    // fetchUserData()
  })

  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/testing/addTestCuUser", {
        headers: {
          Authorization: "bearer " + jwt,
        },
        // params: {
        //   username: username,
        // },
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
        set_account_type(data.account_type)
        set_membership_type(data.membership_type)
        set_penalize(data.is_penalize)
        set_expired_penalize_date(data.expired_penalize_date)
        set_account_expired_date(data.account_expiration_date)
        setInfo({
          prefix: data.prefix,
          name: data.name,
          surname: data.surname,
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
          ///////// FIX //////////
          membership_type: "string",
          user_photo: "",
          medical_certifiate: "",
          national_id_photo: "{ Object }",
          house_registration_number: "{ Object }",
          relationship_verification_document: " { Object }",
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // handles //
  const handleShowDeleteModal = () => {
    set_show_del_modal(true)
  }

  const handleShowSaveModal = () => {
    set_show_save_modal(true)
  }

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
      name,
      surname,
      birthday,
      national_id,
      gender,
      marital_status,
      address,
      home_phone,
      contact_person,
      medical_condition,
    } = temp_info
    console.log("saving...")
    set_show_save_modal(false)
    axios
      .put("http://localhost:3000/account_info/", {
        header: {
          Authorization: "bearer " + jwt,
        },
        data: {
          personal_email: email,
          phone: phone,
          is_thai_language: true,
          prefix: prefix,
          name: name,
          surname: surname,
          birthday: birthday,
          national_id: national_id,
          gender: gender,
          marital_status: marital_status,
          address: address,
          home_phone: home_phone,
          contact_person: contact_person,
          medical_condition: medical_condition,
        },
      })
      .then(({ data }) => {
        console.log("Update completed")
        console.log(data)
        // set temp to data
        set_membership_type(temp_membership_type)
        set_penalize(temp_is_penalize)
        set_expired_penalize_date(temp_expired_penalize_date)
        set_account_expired_date(temp_account_expired_date)
        setInfo(temp_info)
        // back to view form
        setEdit(false)
      })
      .catch((err) => {
        console.log(err)
        set_show_err_modal(true)
      })
  }

  const handleDeleteUser = () => {
    console.log("YEET!!")
    set_show_del_modal(false)
    axios
      .delete("http://localhost:3000/admin/delete/:fileId", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        // .....
      })
      .catch((err) => {
        console.log(err)
        set_show_err_modal(true)
      })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection">
        <div className="row">
          <div className="col">
            <label className="form-label mt-2">ประเภท</label>

            <p className="font-weight-bold">{account_type}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label mt-2">ชื่อผู้ใช้</label>
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
        <div className="row">
          <div className="col">
            {isEdit ? (
              <div />
            ) : (
              <div>
                <label className="form-label mt-2">ประเภทบัญชี</label>
                <p className="font-weight-bold">{membership_type}</p>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label mt-2">สถานะการแบน</label>
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
            <label className="form-label mt-2">สิ้นสุดการแบน</label>
            <Form.Control
              type="date"
              disabled={!isEdit}
              value={convertDate(temp_expired_penalize_date)}
              onChange={(e) => {
                set_temp_expired_penalize_date(new Date(e.target.value))
              }}
            />
          </div>
          <div className="col">
            <label className="form-label mt-2">วันหมดอายุสมาชิก</label>
            <Form.Control
              type="date"
              disabled={!isEdit}
              value={convertDate(temp_account_expired_date)}
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
          <Button variant="outline-danger" className="float-right btn-normal btn-outline-red mr-3" onClick={handleShowDeleteModal}>
            ลบผู้ใช้
          </Button>
        </div>
      </div>
    )
  }

  const renderEditForm = () => {
    return (
      <div>
        <OtherEditInfoComponent jwt={jwt} temp_info={temp_info} set_temp_info={set_temp_info} />
        {/* <OtherEditInfoComponent jwt={jwt} /> */}
        <div className="mt-5">
          <Button variant="pink" className="float-right btn-normal" onClick={handleSave}>
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
    if (show_del_modal)
      return (
        <ModalsComponent
          showDel={show_del_modal}
          setShowDel={set_show_del_modal}
          setShowSave={set_show_save_modal}
          setShowErr={set_show_err_modal}
          info={{ username, handleDeleteUser }}
        />
      )
    else if (show_save_modal)
      return (
        <ModalsComponent
          setShowDel={set_show_del_modal}
          showSave={show_save_modal}
          setShowSave={set_show_save_modal}
          setShowErr={set_show_err_modal}
          info={{ handleSave }}
        />
      )
    else {
      return (
        <ModalsComponent
          setShowDel={set_show_del_modal}
          setShowSave={set_show_save_modal}
          showErr={show_err_modal}
          setShowErr={set_show_err_modal}
          info={{}}
        />
      )
    }
    return
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

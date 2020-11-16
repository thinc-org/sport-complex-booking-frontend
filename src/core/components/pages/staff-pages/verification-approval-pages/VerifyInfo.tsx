import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Button, Card, Form, Collapse } from "react-bootstrap"
import axios from "axios"
import OtherViewInfoComponent from "../list-of-all-users-pages/OtherViewInfoComponent"
import Info, { ContactPerson } from "../interfaces/InfoInterface"

export const convertDate = (date: Date) => {
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  let year = date.getFullYear()
  let format_date = year + "-" + month + "-" + day
  return format_date
}

const allRejectionInfo = [
  "Information",
  "Emergency contact",
  "Photo",
  "National ID/Passport",
  "Medical certificate",
  "House registeration",
  "Relation verification",
  "Check me out",
]

const VerifyInfo: FunctionComponent<RouteComponentProps<{ username: string }>> = (props) => {
  // page state //
  const [jwt, setJwt] = useState<string>("this_is_jwt")
  const [show_reject, set_show_reject] = useState<boolean>(false)
  // const [show_del_modal, set_show_del_modal] = useState<boolean>(false)
  // const [show_save_modal, set_show_save_modal] = useState<boolean>(false)
  // const [show_err_modal, set_show_err_modal] = useState<boolean>(false)
  const [account_expired_date, set_account_expired_date] = useState<Date>()
  // reject info //
  const [reject_info, set_reject_info] = useState<string>("")

  // Non CU state //
  const [username, setUsername] = useState<string>(props.match.params.username)
  const [account_type, set_account_type] = useState<string>("asdada")
  const [membership_type, set_membership_type] = useState<string>("dasdada")
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

  useEffect(() => {
    console.log(account_expired_date)
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/approval", {
        headers: {
          Authorization: "bearer " + jwt,
        },
        params: {
          username: username,
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
        set_account_type(data.account_type)
        set_membership_type(data.membership_type)
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

  const confirmReject = () => {
    // check if at least one condition is checked
  }

  // handles //
  const handleChangeExpire = (e) => {
    let date = e.target.value
    if (new Date(date) < new Date()) set_account_expired_date(new Date())
    else set_account_expired_date(new Date(date))
  }

  const handleAccept = () => {}

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
        <div className="row">
          <div className="col">
            <label className="mt-2">ชื่อ</label>
            <p className="font-weight-bold">{info.name}</p>
          </div>
          <div className="col">
            <label className="mt-2">นามสกุล</label>
            <p className="font-weight-bold">{info.surname}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="mt-2">ชื่อผู้ใช้</label>
            {<p className="font-weight-bold">{username}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="mt-2">วันหมดอายุสมาชิก</label>
            <Form.Control
              type="date"
              style={{ width: "40%" }}
              value={account_expired_date ? convertDate(account_expired_date) : ""}
              onChange={handleChangeExpire}
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
        <div className="mt-5 text-center">
          <Button
            variant="danger"
            className="btn-normal btn-outline-red px-5 mr-5"
            onClick={() => {
              set_show_reject(!show_reject)
            }}
          >
            ปฏิเสธ
          </Button>
          <Button variant="success" className="btn-normal btn-outline-green px-5 ml-5" onClick={handleAccept}>
            ยอมรับ
          </Button>
        </div>
      </div>
    )
  }

  const renderRejectionInfo = () => {
    let infoList = allRejectionInfo.map((info) => {
      return (
        <Form.Check
          label={info}
          type="checkbox"
          // onChange={(e) => {
          //   set_temp_info({ ...temp_info, marital_status: e.target.value })
          // }}
        />
      )
    })
    return (
      <Collapse in={show_reject} className="mt-3 mx-5">
        <div className="rejection-info">
          <Card body className="p-2">
            <h5 className="form-label pb-2">เลือกข้อมูลที่ถูกปฏิเสธ</h5>
            <Form.Group>{infoList}</Form.Group>
            <Button variant="pink" className="btn-normal float-right" onClick={confirmReject}>
              ยืนยันการปฏิเสธ
            </Button>
          </Card>
        </div>
      </Collapse>
    )
  }

  // const renderModal = () => {
  // }

  return (
    <div className="VerifyInfo mt-4">
      {/* {renderModal()} */}
      {/* Info start here */}
      <Link to="/verifyApprove">
        <Button variant="pink" className="btn-normal mb-3 px-5">
          กลับ
        </Button>
      </Link>
      <Card body className="mb-5 mr-4">
        {renderTopSection()}
        {renderViewForm()}
        {renderRejectionInfo()}
      </Card>
    </div>
  )
}

export default VerifyInfo

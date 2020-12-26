import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Button, Card, Form, Collapse } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import OtherViewInfoComponent from "../list-of-all-users-pages/OtherViewInfoComponent"
import VerifyModals from "./VerifyModalsComopnent"
import { convertDate } from "../list-of-all-users-pages/UserInfo"
import Info from "../interfaces/InfoInterface"
import { RejectInfo, ModalVerify, RejectInfoLabel } from "../interfaces/InfoInterface"

/// start of main function ///
const VerifyInfo: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // page state //
  const [show_reject, set_show_reject] = useState<boolean>(false)
  const [account_expired_date, set_account_expired_date] = useState<Date>()
  const [show_modal_info, set_show_modal_info] = useState<ModalVerify>({
    show_confirm_accept: false,
    show_uncom_accept: false,
    show_complete_accept: false,
    show_confirm_reject: false,
    show_uncom_reject: false,
    show_complete_reject: false,
    show_err: false,
  })
  const [reject_info, set_reject_info] = useState<RejectInfo>({
    prefix: false,
    name_th: false,
    surname_th: false,
    name_en: false,
    surname_en: false,
    birthday: false,
    national_id: false,
    gender: false,
    marital_status: false,
    address: false,
    phone: false,
    home_phone: false,
    personal_email: false,
    contact_person_prefix: false,
    contact_person_name: false,
    contact_person_surname: false,
    contact_person_home_phone: false,
    contact_person_phone: false,
    medical_condition: false,
    membership_type: false,
    username: false,
    password: false,
    user_photo: false,
    medical_certificate: false,
    national_id_photo: false,
    house_registration_number: false,
    relationship_verification_document: false,
  })

  // Non CU state //
  const [_id] = useState<string>(props.match.params._id)
  const [username, set_username] = useState<string>("")
  // const [account_type, set_account_type] = useState<string>("")
  const [membership_type, set_membership_type] = useState<string>("")
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
    password: "",
    membership_type: membership_type,
    // object id //
    user_photo: "",
    medical_certificate: "",
    national_id_photo: "",
    house_registration_number: "",
    relationship_verification_document: "",
  })

  // useEffects //
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    client({
      method: "GET",
      url: "/approval/" + _id,
    })
      .then(({ data }) => {
        set_username(data.username)
        // set_account_type(data.account_type)
        set_membership_type(data.membership_type)
        set_account_expired_date(new Date(data.account_expiration_date))
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
          password: "",
          contact_person: data.contact_person
            ? data.contact_person
            : {
                contact_person_prefix: "",
                contact_person_name: "",
                contact_person_surname: "",
                contact_person_home_phone: "",
                contact_person_phone: "",
              },
          // Files //
          membership_type: data.membership_type,
          user_photo: data.user_photo,
          medical_certificate: data.medical_certificate,
          national_id_photo: data.national_id_photo,
          house_registration_number: data.house_registration_number,
          relationship_verification_document: data.relationship_verification_document,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const confirmReject = () => {
    // check if at least one condition is checked
    let checked: boolean = false
    for (const key in reject_info) {
      if (reject_info[key] === true) {
        checked = true
        break
      }
    }
    if (!checked) set_show_modal_info({ ...show_modal_info, show_uncom_reject: true })
    else set_show_modal_info({ ...show_modal_info, show_confirm_reject: true })
  }

  const requestReject = () => {
    // console.log("request rejected!!!")
    let rejectList: string[] = []
    for (const name in reject_info) {
      if (reject_info[name]) rejectList.push(name)
    }
    // send request //
    client({
      method: "PATCH",
      url: "/approval/reject",
      data: {
        id: _id,
        reject_info: rejectList,
      },
    })
      .then((res) => {
        set_show_modal_info({ ...show_modal_info, show_confirm_reject: false, show_complete_reject: true })
      })
      .catch((err) => {
        console.log(err)
        set_show_modal_info({ ...show_modal_info, show_confirm_reject: false, show_err: true })
      })
  }

  const requestAccept = () => {
    // console.log("request accepted!!!")
    // send request //
    client({
      method: "PATCH",
      url: "/approval/approve",
      data: {
        id: _id,
        newExpiredDate: account_expired_date,
      },
    })
      .then(({ data }) => {
        set_show_modal_info({ ...show_modal_info, show_confirm_accept: false, show_complete_accept: true })
      })
      .catch((err) => {
        console.log(err)
        set_show_modal_info({ ...show_modal_info, show_confirm_accept: false, show_err: true })
      })
  }

  // handles //
  const handleChangeExpire = (e) => {
    let date = e.target.value
    if (new Date(date) < new Date()) set_account_expired_date(new Date())
    else set_account_expired_date(new Date(date))
  }

  const handleAccept = () => {
    if (account_expired_date && !isNaN(account_expired_date.getDate())) {
      set_show_modal_info({ ...show_modal_info, show_confirm_accept: true })
    } else set_show_modal_info({ ...show_modal_info, show_uncom_accept: true })
  }

  // renders //
  const renderTopSection = () => {
    return (
      <div className="topSection px-4 pt-2">
        <div className="row">
          <div className="col">
            <label className="mt-2">ประเภท</label>
            <p className="font-weight-bold">{membership_type}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="mt-2">ชื่อ</label>
            <p className="font-weight-bold">{info.name_th}</p>
          </div>
          <div className="col">
            <label className="mt-2">นามสกุล</label>
            <p className="font-weight-bold">{info.surname_th}</p>
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
        <OtherViewInfoComponent info={info} />
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
    let infoList = Object.keys(reject_info).map((name, index) => {
      return (
        <Form.Check
          key={index}
          label={RejectInfoLabel[name]}
          id={name}
          type="checkbox"
          defaultChecked={reject_info[name]}
          onChange={(e) => {
            set_reject_info({
              ...reject_info,
              [e.target.id]: e.target.checked,
            })
          }}
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

  const renderModal = () => {
    if (show_modal_info["show_confirm_reject"])
      return <VerifyModals show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{ requestReject }} props={props} />
    else if (show_modal_info["show_confirm_accept"])
      return <VerifyModals show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{ requestAccept }} props={props} />
    else if (show_modal_info["show_uncom_accept"] || show_modal_info["show_uncom_reject"] || show_modal_info["show_err"])
      return <VerifyModals show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{}} props={props} />
    else if (show_modal_info["show_complete_accept"] || show_modal_info["show_complete_reject"])
      return <VerifyModals show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={{ username }} props={props} />
  }

  return (
    <div className="VerifyInfo mt-4">
      {renderModal()}
      {/* Info start here */}
      <Link to="/staff/verifyApprove">
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

import React, { Component } from "react"
import { useState, useEffect, useContext } from "react"
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from "react-bootstrap"
import "bootstrap"
import axios from "axios"

export default function OtherAaccountDisplay({ jwt, toggle_edit_button }) {
  /// Page states
  let [is_editting, set_is_editting] = useState(false)
  let [showEditButton, setShowEditButton] = useState(true)
  enum Account {
    CuStudent,
    SatitAndCuPersonel,
    Other,
  }

  /// Non-cu student states
  let [prefix, setPrefix] = useState("")
  let [gender, setGender] = useState("")
  let [is_thai_language, set_is_thai_language] = useState(false)
  let [name_th, set_name_th] = useState("")
  let [surname_th, set_surname_th] = useState("")
  let [name_en, set_name_en] = useState("")
  let [surname_en, set_surname_en] = useState("")
  let [birthday, set_birthday] = useState<Date>()
  let [birthday_day, set_birthday_day] = useState("")
  let [birthday_month, set_birthday_month] = useState("")
  let [birthday_year, set_birthday_year] = useState("")

  let [national_id, set_national_id] = useState("")
  let [marital_status, set_marital_status] = useState("")
  let [address, set_address] = useState("")
  let [phone, set_phone] = useState("")
  let [home_phone, set_home_phone] = useState("")
  let [personal_email, set_personal_email] = useState("")
  let [medical_condition, set_medical_condition] = useState("")
  let [membership_type, set_membership_type] = useState("")
  let [is_penalize, set_is_penalize] = useState(false)
  let [expired_penalize_date, set_expired_penalize_date] = useState(Date)
  let [verification_status, set_verification_status] = useState("")
  let [rejected_info, set_rejected_info] = useState<String[]>([])
  let [account_expiration_date, set_account_expiration_date] = useState<Date>()
  let [user_photo, set_user_photo] = useState()
  let [national_id_scan, set_national_id_scan] = useState()
  let [medical_certificate, set_medical_certificate] = useState()
  let [house_registration_number, set_house_registration_number] = useState()
  let [relationship_verification_document, set_relationship_verification_document] = useState()

  /// Contact Person States
  let [contact_person_prefix, set_contact_person_prefix] = useState("")
  let [contact_person_name, set_contact_person_name] = useState("")
  let [contact_person_surname, set_contact_person_surname] = useState("")
  let [contact_person_home_phone, set_contact_person_home_phone] = useState("")
  let [contact_person_phone, set_contact_person_phone] = useState("")

  /// functions

  useEffect(() => {
    console.log("Function triggered by useEffect")
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        console.log(data.verification_status)
        set_verification_status(data.verification_status)
        set_name_en(data.name_en)
        set_surname_en(data.surname_en)
        set_name_th(data.name_th)
        set_surname_th(data.surname_th)
        set_phone(data.phone)
        set_personal_email(data.personal_email)
        set_phone(data.phone)
        set_is_thai_language(data.is_thai_language)
        setPrefix(data.prefix)
        set_birthday(data.birthday)
        set_national_id(data.national_id)
        setGender(data.gender)
        set_marital_status(data.marital_status)
        set_address(data.address)
        set_home_phone(data.home_phone)
        if (data.contact_person) {
          set_contact_person_home_phone(data.contact_person.contact_person_home_phone)
          set_contact_person_name(data.contact_person.contact_person_name)
          set_contact_person_phone(data.contact_person.contact_person_phone)
          set_contact_person_prefix(data.contact_person.contact_person_prefix)
          set_contact_person_surname(data.contact_person.contact_person_surname)
        }
        set_medical_condition(data.medical_condition)
        formatDisplayDate()
        if (data.verification_status === "NotSubmitted") {
          console.log("editting view")
          set_is_editting(true)
          setShowEditButton(true)
        } else if (data.verification_status === "Submitted") {
          console.log("successfully submitted")
          set_is_editting(false)
          setShowEditButton(false)
        }
      })
  }

  const toggleEditButton = () => {
    if (is_editting) {
      set_is_editting(false)
      fetchUserData()
    } else {
      set_is_editting(true)
    }
  }

  // Formatters
  const formatDisplayDate = () => {
    const day = birthday?.getDay
    const month = birthday?.getMonth
    const year = birthday?.getFullYear
    if (day && month && year) {
      set_birthday_day(day + "")
      set_birthday_month(month + "")
      set_birthday_year(year + "")
    } else {
      set_birthday_day("")
      set_birthday_month("")
      set_birthday_year("")
    }
  }

  const showWarningMessage = (verification_status) => {
    switch (verification_status) {
      case "NotSubmitted": {
        return (
          <div className="alert alert-danger mt-3" role="alert">
            <h3>{is_thai_language ? "คำเตือน" : "Warning"}</h3>
            <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
          </div>
        )
      }
      case "Rejected": {
        return (
          <div className="alert alert-danger mt-3" role="alert">
            <h3>{is_thai_language ? "ข้อมูลการสมัครไม่ถูกต้อง" : "Incorrect Information"}</h3>
            <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัครอีกครั้ง" : "Please resubmit the form."}</h6>
          </div>
        )
      }
      case "Submitted": {
        return (
          <div className="alert alert-info  mt-3" role="alert">
            <h3>{is_thai_language ? "ข้อมูลการสมัครถูกส่งแล้ว" : "Registration form submitted."}</h3>
            <h6>{is_thai_language ? "โปรดรอการยืนยัน" : "Please wait for approval."}</h6>
          </div>
        )
      }
      case "Approved": {
        return (
          <div className="alert alert-info mt-3" role="alert">
            <h3>{is_thai_language ? "ข้อมูลการสมัครถูกส่งแล้ว" : "Registration form approved."}</h3>
            <h6>
              {is_thai_language
                ? "หากต้องการแก้ไขข้อทูลกรณาติดต่อเจ้าหน้าทีสปอรต์เซ็นเตอร์โดยตรงที่สนาม"
                : "To edit your personal information, please contact CU Sports Complex."}
            </h6>
          </div>
        )
      }
      default: {
        return <div></div>
      }
    }
  }

  /// JSX Begins here
  return (
    <div className="mx-auto col-md-6">
      {showWarningMessage(verification_status)}
      <div className="default-mobile-wrapper my-3">
        <h4 className="align-right mb-2">Account Information</h4>
        <div className="row mt-2 mx-1">
          {showEditButton ? (
            <Button className="btn-secondary" onClick={toggleEditButton}>
              Edit
            </Button>
          ) : (
            <h6>To edit your personal information, please contact CU Sports Center directly.</h6>
          )}
        </div>
      </div>
      <div className="default-mobile-wrapper">
        <div className="">
          {/* START OF THE FORM */}
          <h4>Member Information</h4>
          <div className="row">
            <div className="col-md-4">
              <label className="form-label mt-2">Prefix</label>
              <p>{prefix}</p>
            </div>
            <div className="col-md-4">
              <label className="form-label mt-2">Gender</label>
              <p>{gender}</p>
            </div>
          </div>
          <hr />
          <label className="form-label mt-2">ชื่อจริง</label>
          <p>{name_th}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">นามสกุล</label>
          <p>{surname_th}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">First Name</label>
          <p>{name_en}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Last Name</label>
          <p>{surname_en}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Birthdate</label>
          <div className="row">
            <div className="col-sm-4">
              <p>{birthday_day}</p>
              <div className="valid-feedback"></div>
            </div>
            <div className="col-sm-4">
              <p>{birthday_month}</p>
              <div className="valid-feedback"></div>
            </div>
            <div className="col-sm-4">
              <p>{birthday_year}</p>
              <div className="valid-feedback"></div>
            </div>
          </div>

          <label className="form-label mt-2">National ID / Passport</label>
          <p>{national_id}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Marital Status</label>
          <p>{marital_status}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Address</label>
          <p>{address}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Email</label>
          <p>{personal_email}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Home Phone Number</label>
          <p>{home_phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Mobile Phone Number</label>
          <p>{phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Do you have any medical conditions? (If there are none, please leave this blank)</label>
          <p>{medical_condition}</p>
          <div className="valid-feedback"></div>
        </div>
      </div>
      <br />
      <div className="default-mobile-wrapper">
        <h4>Contact Person in Case of Emergency</h4>

        <label className="form-label mt-2">Prefix</label>
        <p>{contact_person_prefix}</p>
        <hr />

        <label className="form-label mt-2">First Name</label>
        <p>{contact_person_name}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">Last Name</label>
        <p>{contact_person_surname}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">Home Phone Number</label>
        <p>{contact_person_home_phone}</p>
        <div className="valid-feedback"></div>
        <hr />
        <label className="form-label mt-2">Mobile Phone Number</label>
        <p>{contact_person_phone}</p>
        <div className="valid-feedback"></div>
      </div>
      <br />
      <div className="default-mobile-wrapper">
        <h4>Membership</h4>
        <label className="form-label my-2">Your Photo (Image File)</label>
        <div className="form-file">
          <p>{verification_status == "Submitted" || verification_status == "Approved" ? "File Submitted." : ""}</p>
        </div>
        <hr />
        <label className="form-label my-2">National ID / Passpord (.pdf only)</label>
        <div className="form-file">
          <p>{verification_status == "Submitted" || verification_status == "Approved" ? "File Submitted." : ""}</p>
        </div>
        <hr />
        <label className="form-label my-2">Medical Certificate (.pdf only)</label>
        <div className="form-file">
          <p>{verification_status == "Submitted" || verification_status == "Approved" ? "File Submitted." : ""}</p>
        </div>
        <hr />
        <label className="form-label my-2">Optional: House Registration Document with reference person (.pdf only)</label>
        <div className="form-file">
          <p>{verification_status == "Submitted" || verification_status == "Approved" ? "File Submitted." : ""}</p>
        </div>
        <hr />
        <label className="form-label my-2">Optional: Relationship Verification document (.pdf only)</label>
        <div className="form-file">
          <p>{verification_status == "Submitted" || verification_status == "Approved" ? "File Submitted." : ""}</p>
        </div>
      </div>
      {/* END OF FORM */}
      <br />
      <br />
    </div>
  )
}

import React, { Component } from "react"
import { useState, useEffect, useContext } from "react"
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from "react-bootstrap"

import axios from "axios"


export default function OtherAccountEdit({ jwt,toggle_edit_button }) {
  /// Page states
  let [is_editting, set_is_editting] = useState(false)
  enum Account {
    CuStudent,
    SatitAndCuPersonel,
    Other,
  }
  let Contact_person = {
    contact_person_prefix: "",
    contact_person_name: "",
    contact_person_surname: "",
    contact_person_home_phone: "",
    contact_person_phone: "",
  }

  /// Non-cu student states
  let [account_type, setAccountType] = useState(Account.CuStudent)
  let [prefix, setPrefix] = useState("Mr.")
  let [gender, setGender] = useState("Male")
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
  let [contact_person_prefix, set_contact_person_prefix] = useState("Mr.")
  let [contact_person_name, set_contact_person_name] = useState("")
  let [contact_person_surname, set_contact_person_surname] = useState("")
  let [contact_person_home_phone, set_contact_person_home_phone] = useState("")
  let [contact_person_phone, set_contact_person_phone] = useState("")

  /// functions

  useEffect(() => {
    fetchUserData()
  }, [])

  const postDataToBackend = async () => {
    console.log("send data to backend")

    const data = {
      personal_email: personal_email,
      phone: phone,
      is_thai_language: is_thai_language,
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
      contact_person: Contact_person,
      medical_condition: medical_condition,
    }

    console.log(data)
    await axios
      .put("http://localhost:3000/account_info/", data, {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)

        if (data.verification_status === "Submitted") {
          handleAllFilesUpload(user_photo, national_id_scan, medical_certificate, house_registration_number, relationship_verification_document)
          window.location.reload(false)
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

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
        //setPrefix(data.prefix)
        set_birthday(data.birthday)
        set_national_id(data.national_id)
        //setGender(data.gender)
        set_marital_status(data.marital_status)
        set_address(data.address)
        set_home_phone(data.home_phone)
        if (data.contact_person) {
          set_contact_person_home_phone(data.contact_person.contact_person_home_phone)
          set_contact_person_name(data.contact_person.contact_person_name)
          set_contact_person_phone(data.contact_person.contact_person_phone)
          //set_contact_person_prefix(data.contact_person.contact_person_prefix)
          set_contact_person_surname(data.contact_person.contact_person_surname)
        }
        set_medical_condition(data.medical_condition)
        formatDisplayDate()
        if (data.verification_status === "NotSubmitted") {
          console.log("editting view")
          set_is_editting(true)
        } else if (data.verification_status === "Submitted") {
          console.log("successfully submitted")
          set_is_editting(false)
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    formatDate()
    console.log(birthday)
    formatContactPerson()
    postDataToBackend()
  }

  const handleCancel = (e) => {
    e.preventDefault()
    fetchUserData()
    toggleEditButton()
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

  const formatDate = () => {
    let date: Date = new Date(`${birthday_year}-${birthday_month}-${birthday_day}`)
    set_birthday(date)
    console.log("birthday is " + birthday)
  }

  const formatContactPerson = () => {
    let contactPerson = {
      contact_person_prefix: contact_person_prefix,
      contact_person_name: contact_person_name,
      contact_person_surname: contact_person_surname,
      contact_person_home_phone: contact_person_home_phone,
      contact_person_phone: contact_person_phone,
    }
    Contact_person = contactPerson
  }
  // Handlers
  const handleFileUpload = async (formData) => {
    await axios
      .post("http://localhost:3000/fs/upload", formData, {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  const handleAllFilesUpload = async (
    user_photo_input,
    national_id_input,
    medical_certificate_input,
    house_registration_number_input,
    relationship_verification_document_input
  ) => {
    upload_user_photo(user_photo_input)
    upload_national_id(national_id_input)
    upload_medical_certificate(medical_certificate_input)
    upload_house_registration_number(house_registration_number_input)
    upload_relationship_verification_document(relationship_verification_document_input)
  }
  const upload_user_photo = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append("user_photo", file, file.name)
    handleFileUpload(formData)
  }
  const upload_national_id = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append("national_id_photo", file, file.name)
    handleFileUpload(formData)
  }
  const upload_medical_certificate = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append("medical_cerficicate", file, file.name)
    handleFileUpload(formData)
  }
  const upload_house_registration_number = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append("house_registration_number", file, file.name)
    handleFileUpload(formData)
  }
  const upload_relationship_verification_document = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append("relationship_verification_document", file, file.name)
    handleFileUpload(formData)
  }

  // These functions save the input file to the states
  const assign_user_photo = (file) => {
    console.log(file)
    set_user_photo(file[0])
  }
  const assign_national_id = (file) => {
    console.log(file)
    set_national_id_scan(file[0])
  }
  const assign_medical_certificate = (file) => {
    console.log(file)
    set_medical_certificate(file[0])
  }
  const assign_house_registration_number = (file) => {
    console.log(file)
    set_house_registration_number(file[0])
  }
  const assign_relationship_verification_document = (file) => {
    console.log(file)
    set_relationship_verification_document(file[0])
  }

  const showWarningMessage = (verification_status) => {
    switch (verification_status) {
      case "NotSubmitted": {
        return (
          <div className="alert alert-danger" role="alert">
            <h3>{is_thai_language ? "คำเตือน" : "Warning"}</h3>
            <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
          </div>
        )
      }
      case "Rejected": {
        return (
          <div className="alert alert-danger" role="alert">
            <h3>{is_thai_language ? "ข้อมูลการสมัครไม่ถูกต้อง" : "Incorrect Information"}</h3>
            <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัครอีกครั้ง" : "Please resubmit the form."}</h6>
          </div>
        )
      }
      case "Submitted": {
        return (
          <div className="alert alert-info" role="alert">
            <h3>{is_thai_language ? "ข้อมูลการสมัครถูกส่งแล้ว" : "Registration form submitted."}</h3>
            <h6>{is_thai_language ? "โปรดรอการยืนยัน" : "Please wait for approval."}</h6>
          </div>
        )
      }
      case "Approved": {
        return (
          <div className="alert alert-info" role="alert">
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
      /// THIS IS THE START OF THE EDITING VIEW
      <div className="mx-auto col-md-6">
        {showWarningMessage(verification_status)}
        <Form onSubmit={handleSubmit}>
          <div className="default-mobile-wrapper my-3">
            <h4 className="align-right mb-2">{is_thai_language ? "ถาษา" : "Language"}</h4>
            <div className="row mt-2 mx-1">
              {!is_thai_language ? (
                <div>
                  <Button variant="pink" className="mr-2" onClick={() => set_is_thai_language(false)}>EN</Button>
                  <Button variant="gray" className="btn-outline-dark" onClick={() => set_is_thai_language(true)}>TH</Button>
                </div>
              ) : (
                <div>
                  <Button variant="gray" className="btn-outline-dark mr-2" onClick={() => set_is_thai_language(false)}>EN</Button>
                  <Button variant="pink" className="" onClick={() => set_is_thai_language(true)}>TH</Button>
                </div>
              )}
            </div>
          </div>

          <div className="default-mobile-wrapper">
            <div className="">
              {/* START OF THE FORM */}
              <h4>{is_thai_language ? "คำนำหน้าขื่อ" : "Member Information"}</h4>
              <div className="row">

                <div className="col-md-4">
                  <label className="form-label mt-2">{is_thai_language ? "คำนำหน้าขื่อ * " : "Prefix *"}</label>
                  <div className="dropdown mr-1">
                    <button type="button" value={prefix} className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {prefix}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                      <a className="dropdown-item" onClick={() => setPrefix("Mr.")}>
                        {is_thai_language ? "นาย" : "Mr."}
                      </a>
                      <a className="dropdown-item" onClick={() => setPrefix("Ms.")}>
                        {is_thai_language ? "นางสาว" : "Ms."}
                      </a>
                      <a className="dropdown-item" onClick={() => setPrefix("Mrs.")}>
                        {is_thai_language ? "นาง" : "Mrs."}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label mt-2">{is_thai_language ? "เพศ *" : "Gender *"}</label>
                  <div className="dropdown mr-1 ">
                    <button type="button" value={gender} className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {gender}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                      <a className="dropdown-item" onClick={() => setGender("Male")}>
                        {is_thai_language ? "ชาย" : "Male"}
                      </a>
                      <a className="dropdown-item" onClick={() => setGender("Female")}>
                        {is_thai_language ? "หญิง" : "Female"}
                      </a>
                      <a className="dropdown-item" onClick={() => setGender("Other")}>
                        {is_thai_language ? "อื่นๆ" : "Other"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "ชื่อจริง *" : "ชื่อจริง *"}</label>
              <input type="text" value={name_th} className="form-control" id="name" placeholder="Firstname" required onChange={(e) => set_name_th(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "นามสกุล *" : "นามสกุล *"}</label>
              <input type="text" value={surname_th} className="form-control" id="surname" placeholder="Lastname" required onChange={(e) => set_surname_th(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "ชื่อจริง (ถาษาอังกฤษ) *" : "First Name *"}</label>
              <input type="text" value={name_en} className="form-control" id="name" placeholder="Firstname" required onChange={(e) => set_name_en(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "นามสกุล (ถาษาอังกฤษ) *" : "Last Name *"}</label>
              <input type="text" value={surname_en} className="form-control" id="surname" placeholder="Lastname" required onChange={(e) => set_surname_en(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "วัน/เด์อน/ปี เกิด *" : "Birthdate *"}</label>
              <div className="row">
                <div className="col-sm-4">
                  <input type="number" value={birthday_day} className="mt-2 form-control" id="dd" placeholder="dd" required onChange={(e) => set_birthday_day(e.target.value)}
                  ></input>
                  <div className="valid-feedback"></div>
                </div>
                <div className="col-sm-4">
                  <input type="text" value={birthday_month} className="mt-2 form-control" id="mm" placeholder="mm" required onChange={(e) => set_birthday_month(e.target.value)}
                  ></input>
                  <div className="valid-feedback"></div>
                </div>
                <div className="col-sm-4">
                  <input type="text" value={birthday_year} className="mt-2 form-control" id="yyyy" placeholder="yyyy" required onChange={(e) => set_birthday_year(e.target.value)}
                  ></input>
                  <div className="valid-feedback"></div>
                </div>
              </div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "หมายเลขบัตรประชน/พาสปอร์ต *" : "National ID / Passport *"}</label>
              <input type="number" value={national_id} className="form-control" id="surname" placeholder="xxxxxxxxxxxxx" required onChange={(e) => set_national_id(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "สถานะการสมรส *" : "Marital Status *"}</label>
              <input type="text" value={marital_status} className="form-control" id="surname" placeholder="xxxxxxxxxxxxx" required onChange={(e) => set_marital_status(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "ที่อยู่ *" : "Address *"}</label>
              <input type="text" value={address} className="form-control" id="surname" placeholder="xxx/xxx address ..." required onChange={(e) => set_address(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "อีเมล *" : "Email *"}</label>
              <input type="text" value={personal_email} className="form-control" id="surname" placeholder="example@email.com" required onChange={(e) => set_personal_email(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
              <input type="number" value={home_phone} className="form-control" id="surname" placeholder="02xxxxxxx" required onChange={(e) => set_home_phone(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
              <input type="number" value={phone} className="form-control" id="surname" placeholder="0xxxxxxxx" required onChange={(e) => set_phone(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">
                {is_thai_language
                  ? "คุณมีโรคประจำตัวหรือไม่(ถ้าไม่มีโปรดเว้นว่าง)"
                  : "Do you have any medical conditions? (If there are none, please leave this blank"}
                )
              </label>
              <input type="text" value={medical_condition} className="form-control" id="surname" placeholder="Ex: Asthma" onChange={(e) => set_medical_condition(e.target.value)}
              ></input>
              <div className="valid-feedback"></div>
            </div>
          </div>
          <br />
          <div className="default-mobile-wrapper">
            <h4>{is_thai_language ? "ผู้ติดต่อยามฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>
            <div className="col-md-4">
              <label className="form-label mt-2">{is_thai_language ? "คำนำหน้าขื่อ *" : "Prefix *"}</label>
              <div className="dropdown mr-1">
                <button type="button" value={contact_person_prefix} className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {contact_person_prefix}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                  <a className="dropdown-item" onClick={() => set_contact_person_prefix("Mr.")}>
                    {is_thai_language ? "นาย" : "Mr."}
                  </a>
                  <a className="dropdown-item" onClick={() => set_contact_person_prefix("Ms.")}>
                    {is_thai_language ? "นางสาว" : "Ms."}
                  </a>
                  <a className="dropdown-item" onClick={() => set_contact_person_prefix("Mrs.")}>
                    {is_thai_language ? "นาง" : "Mrs."}
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">{is_thai_language ? "ชื่อ *" : "First Name *"}</label>
            <input type="text" value={contact_person_name} className="form-control" id="contact_person_name" placeholder="Firstname" required onChange={(e) => set_contact_person_name(e.target.value)}
            ></input>
            <div className="valid-feedback"></div>
            <hr />
            <label className="form-label mt-2">{is_thai_language ? "นามสกุล *" : "Last Name *"}</label>
            <input type="text" value={contact_person_surname} className="form-control" id="contact_person_surname" placeholder="Lastname" required onChange={(e) => set_contact_person_surname(e.target.value)}
            ></input>
            <div className="valid-feedback"></div>
            <hr />
            <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
            <input type="number" value={contact_person_home_phone} className="form-control" id="contact_person_home_phone" placeholder="0xxxxxxxxx" required onChange={(e) => set_contact_person_home_phone(e.target.value)}
            ></input>
            <div className="valid-feedback"></div>
            <hr />
            <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
            <input
              type="number" value={contact_person_phone} className="form-control" id="contact_person_mobile_phone" placeholder="Lastname" required onChange={(e) => set_contact_person_phone(e.target.value)}
            ></input>
            <div className="valid-feedback"></div>
          </div>
          <br />
          <div className="default-mobile-wrapper">
            <h4>{is_thai_language ? "สมาชิก" : "Membership"}</h4>
            
            <hr />
            <label className="form-label my-2">{is_thai_language ? "รูปภาพของคุณ" : "Your Photo (Image File)"}</label>
            <div className="form-file">
              <p>{user_photo ? "File Uploaded. Choose a new file?" : ""}</p>
              <input type="file" className="form-file-input" id="user_photo" onChange={(e) => assign_user_photo(e.target.files)} />
            </div>
            <hr />
            <label className="form-label my-2">
              {is_thai_language ? "หมายเลขบัตรประชาชน / พาสปอร์ต (.pdf เท่านั้น)" : "National ID / Passpord (.pdf only)"}
            </label>
            <div className="form-file">
              <p>{national_id_scan ? "File Uploaded. Choose a new file?" : ""}</p>
              <input type="file" className="form-file-input" id="nationID/passport" onChange={(e) => assign_national_id(e.target.files)} />
            </div>
            <hr />
            <label className="form-label my-2">{is_thai_language ? "ใบรับรองแพทย์ (.pdf เท่านั้น)" : "Medical Certificate (.pdf only)"}</label>
            <div className="form-file">
              <p>{medical_certificate ? "File Uploaded. Choose a new file?" : ""}</p>
              <input type="file" className="form-file-input" id="medical_certificate" onChange={(e) => assign_medical_certificate(e.target.files)} />
            </div>
            <hr />
            <label className="form-label my-2">
              {is_thai_language
                ? "ไม่บังคับ: สำเนาทะเบียนบ้านที่มีหน้านิสิต (.pdf only)"
                : "Optional: House Registration Document with reference person (.pdf only)"}
            </label>
            <div className="form-file">
              <p>{house_registration_number ? "File Uploaded. Choose a new file?" : ""}</p>
              <input
                type="file"
                className="form-file-input"
                id="house_registration_number"
                onChange={(e) => assign_house_registration_number(e.target.files)}
              />
            </div>
            <hr />
            <label className="form-label my-2">
              {is_thai_language ? "ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf only)" : "Optional: Relationship Verification document (.pdf only)"}
            </label>
            <div className="form-file">
              <p>{relationship_verification_document ? "File Uploaded. Choose a new file?" : ""}</p>
              <input
                type="file"
                className="form-file-input"
                id="relationship_verification_document"
                onChange={(e) => assign_relationship_verification_document(e.target.files)}
              />
            </div>
          </div>
          <br />
          <div className="button-group col-md-12">
            {verification_status === "NotSubmitted" ? (
              null
            ) : (
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </Button>
            )}

            <Button variant="pink" className="btn-secondary" data-toggle="modal" data-target="#exampleModal">
              {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
            </Button>

          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {is_thai_language ? "คุณต้องการส่งใบสมัครหรือไม่" : "Do you want to submit the registration form?"}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {is_thai_language
                    ? "หากต้องการแก้ไขข้อมูลคุณต้องติดต่อ Sports Center โดยตรง"
                    : "Once submitted, if you want to edit, you need to contact the Sports Center directly"}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    {is_thai_language ? "ยกเลิก" : "Cancel"}
                  </button>
                  <Button type="submit" className="btn btn-primary">
                    {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* END OF FORM */}
        </Form>
      </div>
    )
  
}

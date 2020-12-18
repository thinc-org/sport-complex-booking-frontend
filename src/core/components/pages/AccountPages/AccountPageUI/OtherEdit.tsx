import React from "react"
import { useState } from "react"
import {  Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form";

import axios from "axios"
import { UserContext } from "../../../../contexts/UsersContext"

export default function OtherAccountEdit({ jwt, toggle_edit_button }) {

  // React Hook Forms
  const { register, handleSubmit, errors  } = useForm();

  let [is_thai_language, set_is_thai_language] = useState(false)
  let [verification_status] = useState("")
  let [user_photo, set_user_photo] = useState()
  let [national_id_scan, set_national_id_scan] = useState()
  let [medical_certificate, set_medical_certificate] = useState()
  let [house_registration_number, set_house_registration_number] = useState()
  let [relationship_verification_document, set_relationship_verification_document] = useState()

  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);

  /// JSX Begins here
  return (
    <UserContext.Consumer>
      {(context) => {
        const { Other } = context
        const user = Other

        const postDataToBackend = async (data: Object) => {
          console.log("send data to backend")

          console.log(data)
          await axios
            .put("http://localhost:3000/account_info/", data, {
              headers: {
                Authorization: "bearer " + jwt,
                headers: { 'Content-Type': 'multipart/form-data' },
              },
            })
            .then(({ data }) => {
              console.log(data)

              if (data.verification_status === "Submitted") {
                handleAllFilesUpload(user_photo, national_id_scan, medical_certificate, house_registration_number, relationship_verification_document)
              }
            })
            .catch(function (error) {
              if (error.response) {
                console.log("POST Error")
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
                setShowErr(true);
              }
            })
        }

        const onSubmit = (data: Object) => {
          console.log(JSON.parse(JSON.stringify(data)))
          let newData = formatDate(data)
          postDataToBackend(newData)
          //window.location.reload()
        }

        const formatDate = (data: any) => {
          console.log("type of data is " + typeof(data))
          let date: Date = new Date(`${data.birthday_year}-${data.birthday_month}-${data.birthday_day}`)
          data = {
            ...data,
            birthday: date
          }
          
          delete data.birthday_day;
          delete data.birthday_month;
          delete data.birthday_year;
          return data
        }

        // Handlers

        const handleCancel = (e: any) => {
          e.preventDefault()
          //window.location.reload()
        }

        const handleFileUpload = async (formData: any) => {
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
          user_photo_input: any,
          national_id_input: any,
          medical_certificate_input: any,
          house_registration_number_input: any,
          relationship_verification_document_input: any
        ) => {
          user_photo_input ? upload_user_photo(user_photo_input): console.log("no file selected")
          national_id_input ? upload_national_id(national_id_input): console.log("no file selected")
          medical_certificate_input ? upload_medical_certificate(medical_certificate_input): console.log("no file selected")
          house_registration_number_input ? upload_house_registration_number(house_registration_number_input): console.log("no file selected")
          relationship_verification_document_input ? upload_relationship_verification_document(relationship_verification_document_input): console.log("no file selected")
        }
        const upload_user_photo = (file: any) => {
          console.log(file)
          let formData = new FormData()
          formData.append("user_photo", file? file: file, file?.name)
          handleFileUpload(formData)
        }
        const upload_national_id = (file: any) => {
          console.log(file)
          let formData = new FormData()
          formData.append("national_id_photo",  file? file: file, file?.name)
          handleFileUpload(formData)
        }
        const upload_medical_certificate = (file: any) => {
          console.log(file)
          let formData = new FormData()
          formData.append("medical_cerficicate",  file? file: file, file?.name)
          handleFileUpload(formData)
        }
        const upload_house_registration_number = (file: any) => {
          console.log(file)
          let formData = new FormData()
          formData.append("house_registration_number",  file? file: file, file?.name)
          handleFileUpload(formData)
        }
        const upload_relationship_verification_document = (file: any) => {
          console.log(file)
          let formData = new FormData()
          formData.append("relationship_verification_document", file, file.name)
          handleFileUpload(formData)
        }

        // These functions save the input file to the states
        const assign_user_photo = (file: any) => {
          console.log(file)
          set_user_photo(file[0])
        }
        const assign_national_id = (file: any) => {
          console.log(file)
          set_national_id_scan(file[0])
        }
        const assign_medical_certificate = (file: any) => {
          console.log(file)
          set_medical_certificate(file[0])
        }
        const assign_house_registration_number = (file: any) => {
          console.log(file)
          set_house_registration_number(file[0])
        }
        const assign_relationship_verification_document = (file: any) => {
          console.log(file)
          set_relationship_verification_document(file[0])
        }

        const showWarningMessage = (verification_status: String) => {
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

        return (
          /// THIS IS THE START OF THE EDITING VIEW
          <div className="mx-auto col-md-6">
            {showWarningMessage(user.verification_status)}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="default-mobile-wrapper my-3">
                <h4 className="align-right mb-2">{is_thai_language ? "ถาษา" : "Language"}</h4>
                <div className="row mt-2 mx-1">
                  {!is_thai_language ? (
                    <div>
                      <Button variant="pink" className="mr-2" onClick={() => set_is_thai_language(false)}>
                        EN
                      </Button>
                      <Button variant="gray" className="btn-outline-dark" onClick={() => set_is_thai_language(true)}>
                        TH
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button variant="gray" className="btn-outline-dark mr-2" onClick={() => set_is_thai_language(false)}>
                        EN
                      </Button>
                      <Button variant="pink" className="" onClick={() => set_is_thai_language(true)}>
                        TH
                      </Button>
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

                      <select name="prefix" ref={register}>
                        <option value={is_thai_language ? "นาย" : "Mr."}>{is_thai_language ? "นาย" : "Mr."}</option>
                        <option value={is_thai_language ? "นางสาว" : "Ms."}>{is_thai_language ? "นางสาว" : "Ms."}</option>
                        <option value={is_thai_language ? "นาง" : "Mrs."}>{is_thai_language ? "นาง" : "Mrs."}</option>
                      </select>

                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-2">{is_thai_language ? "เพศ *" : "Gender *"}</label>

                      <select name="gender" ref={register}>
                        <option value={is_thai_language ? "ชาย" : "Male"}>{is_thai_language ? "ชาย" : "Male"}</option>
                        <option value={is_thai_language ? "หญิง" : "Female"}>{is_thai_language ? "หญิง" : "Female"}</option>
                        <option value={is_thai_language ? "อื่นๆ" : "Other"}>{is_thai_language ? "อื่นๆ" : "Other"}</option>
                      </select>

                    </div>
                  </div>
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "ชื่อจริง *" : "ชื่อจริง *"}</label>
                  <h6 className="font-weight-light">{is_thai_language? "" : "If you do not have a Thai name, please type '-'."}</h6>
                  <input name="name_th" type="text" ref={register({
                      required: "Enter your Thai name",
                      pattern: {
                        value: /^[A-Z0-9ก-ฮ._%+-]/i,
                        message: "Enter a valid Thai name",
                      },
                    })} placeholder="ชื่อจริง" defaultValue={user.name_th} className="form-control"/>
                  {errors.name_th && <p id="input-error">{errors.name_th.message}</p>}

                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "นามสกุล *" : "นามสกุล *"}</label>
                  <h6 className="font-weight-light">{is_thai_language? "" : "If you do not have a Thai surname, please type '-'."}</h6>
                  <input name="surname_th" type="text" ref={register({
                      required: "Enter your Thai surname",
                      pattern: {
                        value: /^[A-Z0-9ก-ฮ._%+-]/i,
                        message: "Enter a valid Thai surname ",
                      },
                    })} placeholder="นามสกุล" defaultValue={user.surname_th} className="form-control"/>
                  {errors.surname_th && <p id="input-error">{errors.surname_th.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "ชื่อจริง (ถาษาอังกฤษ) *" : "First Name *"}</label>
                  <input name="name_en" type="text" ref={register({
                      required: "Enter your English name",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid English name",
                      },
                    })} placeholder="Firstname" defaultValue={user.name_en} className="form-control"/>
                  {errors.name_en && <p id="input-error">{errors.name_en.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "นามสกุล (ถาษาอังกฤษ) *" : "Last Name *"}</label>
                  <input name="surname_en" type="text" ref={register({
                      required: "Enter your English Surname",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid English Surname",
                      },
                    })} placeholder="Surname" defaultValue={user.surname_en} className="form-control"/>
                  {errors.surname_en && <p id="input-error">{errors.surname_en.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "วัน/เด์อน/ปี เกิด *" : "Birthdate *"}</label>
                  <div className="row">
                    <div className="col-sm-4">
                      <input name="birthday_day" type="number" ref={register({
                      required: "Enter your birth day",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid birth day",
                      },
                    })} placeholder="dd" defaultValue={user.birthday?.day} className="form-control"/>
                  {errors.birthday_day && <p id="input-error">{errors.birthday_day.message}</p>}
                  <br/>
                      
                    </div>
                    <div className="col-sm-4">
                      <input name="birthday_month" type="number" ref={register({
                      required: "Enter your birth month",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid birth month",
                      },
                    })} placeholder="mm" defaultValue={user.birthday?.month} className="form-control"/>
                  {errors.birthday_month && <p id="input-error">{errors.birthday_month.message}</p>}
                  <br/>
                      
                    </div>
                    <div className="col-sm-4">
                      <input name="birthday_year" type="number" ref={register({
                      required: "Enter your birth year",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid birth year",
                      },
                    })} placeholder="yy" defaultValue={user.birthday?.year} className="form-control"/>
                  {errors.birthday_year && <p id="input-error">{errors.birthday_year.message}</p>}
                      
                    </div>
                  </div>
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "หมายเลขบัตรประชน/พาสปอร์ต *" : "National ID / Passport *"}</label>
                  <input name="national_id" type="text" ref={register({
                      required: "Enter your national ID / passport number",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid national ID / passport number",
                      },
                    })} placeholder="xxxxxxxxxxxxx" defaultValue={user.national_id} className="form-control"/>
                  {errors.national_id && <p id="input-error">{errors.national_id.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "สถานะการสมรส *" : "Marital Status *"}</label>
                  <input name="marital_status" type="text" ref={register({
                      required: "Enter your marital status",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid marital status",
                      },
                    })} placeholder="Ex: married" defaultValue={user.marital_status} className="form-control"/>
                  {errors.marital_status && <p id="input-error">{errors.marital_status.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "ที่อยู่ *" : "Address *"}</label>
                  <input name="address" type="text" ref={register({
                      required: "Enter your address",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid address",
                      },
                    })} placeholder="Address" defaultValue={user.address} className="form-control"/>
                  {errors.address && <p id="input-error">{errors.address.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "อีเมล *" : "Email *"}</label>
                  <input name="personal_email" type="text" ref={register({
                      required: "Enter your personal e-mail",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid personal e-mail",
                      },
                    })} placeholder="example@email.com" defaultValue={user.personal_email} className="form-control"/>
                  {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
                  <input name="home_phone" type="number" ref={register({
                      required: "Enter your home_phone",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid home_phone",
                      },
                    })} placeholder="02xxxxxxx" defaultValue={user.home_phone} className="form-control"/>
                  {errors.home_phone && <p id="input-error">{errors.home_phone.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
                  <input name="phone" type="number" ref={register({
                      required: "Enter your phone number",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid phone number",
                      },
                    })} placeholder="0xxxxxxxxx" defaultValue={user.phone} className="form-control"/>
                  {errors.phone && <p id="input-error">{errors.phone.message}</p>}
                  
                  <hr />
                  <label className="form-label mt-2">
                    {is_thai_language
                      ? "คุณมีโรคประจำตัวหรือไม่(ถ้าไม่มีโปรดเว้นว่าง)"
                      : "Do you have any medical conditions? (If there are none, please leave this blank"}
                    )
                  </label>
                  <input name="medical_condition" type="text" ref={register({})} placeholder="Ex: Asthma" defaultValue={user.medical_condition} className="form-control"/>

                </div>
              </div>
              <br />
              <div className="default-mobile-wrapper">
                <h4>{is_thai_language ? "ผู้ติดต่อยามฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>
                <div className="col-md-4">
                  <label className="form-label mt-2">{is_thai_language ? "คำนำหน้าขื่อ *" : "Prefix *"}</label>
                  <select name="contact_person.contact_person_prefix" ref={register}>
                    <option value={is_thai_language ? "นาย" : "Mr."}>{is_thai_language ? "นาย" : "Mr."}</option>
                    <option value={is_thai_language ? "นางสาว" : "Ms."}>{is_thai_language ? "นางสาว" : "Ms."}</option>
                    <option value={is_thai_language ? "นาง" : "Mrs."}>{is_thai_language ? "นาง" : "Mrs."}</option>
                  </select>

                </div>
                <hr />
                <label className="form-label mt-2">{is_thai_language ? "ชื่อ *" : "First Name *"}</label>
                <input name="contact_person.contact_person_name" type="text" ref={register({
                      required: "Enter your contact person name",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid contact person name",
                      },
                    })} placeholder="Name" defaultValue={user.contact_person?.contact_person_name} className="form-control"/>
                  {errors.contact_person_name && <p id="input-error">{errors.contact_person_name.message}</p>}
                
                <hr />
                <label className="form-label mt-2">{is_thai_language ? "นามสกุล *" : "Last Name *"}</label>
                <input name="contact_person.contact_person_surname" type="text" ref={register({
                      required: "Enter your contact person surname",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid contact person surname",
                      },
                    })} placeholder="Surname" defaultValue={user.contact_person?.contact_person_surname} className="form-control"/>
                  {errors.contact_person_surname && <p id="input-error">{errors.contact_person_surname.message}</p>}
                
                <hr />
                <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
                <input name="contact_person.contact_person_home_phone" type="number" ref={register({
                      required: "Enter your contact person home phone number",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid e-mail contact person home phone number",
                      },
                    })} placeholder="xxxxxxxxx" defaultValue={user.contact_person?.contact_person_home_phone} className="form-control"/>
                  {errors.contact_person_home_phone && <p id="input-error">{errors.contact_person_home_phone.message}</p>}
                <hr />
                <label className="form-label mt-2">{is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
                <input name="contact_person.contact_person_phone" type="number" ref={register({
                      required: "Enter your contact person phone number",
                      pattern: {
                        value: /^[A-Z0-9._%+-]/i,
                        message: "Enter a valid contact person phone number",
                      },
                    })} placeholder="xxxxxxxxxx" defaultValue={user.contact_person?.contact_person_phone} className="form-control"/>
                  {errors.contact_person_phone && <p id="input-error">{errors.contact_person_phone.message}</p>}
                
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
                  <input
                    type="file"
                    className="form-file-input"
                    id="medical_certificate"
                    onChange={(e) => assign_medical_certificate(e.target.files)}
                  />
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
                {verification_status === "NotSubmitted" ? null : (
                  <Button variant="gray" className="btn-secondary" onClick={()=>  handleCancel}>
                    Cancel
                  </Button>
                )}
                <Button variant="pink" className="btn-secondary" onClick={()=> setShow(true)}>
                  {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                </Button>
              </div>

              {/* MODAL CONFIRM DIALOGUE */}
              <Modal show={show} onHide={()=> setShow(false)}>
                  <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="confirmModalLabel">
                          {is_thai_language ? "ยืนยันการส่งใบสมัคร" : "Confirm submit"}
                        </h5>
                        <Button type="button"  onClick={() => setShow(false)} className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </Button>
                      </div>
                      <div className="modal-body">
                        {is_thai_language ? "คุณต้องการส่งใบสมัครหรือไม่" : "Do you want to submit the registration form?"}
                      </div>
                      <div className="modal-footer">
                        <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal" data-dismiss="modal">
                          {is_thai_language ? "ยกเลิก" : "Cancel"}
                        </Button>
                        <Button onClick={handleSubmit(onSubmit)} variant="pink" className="btn-normal">
                          {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                        </Button>
                      </div>
                    </div>
                </Modal>
                {/* MODAL ERROR */}
                <Modal
                  show={showErr}
                  onHide={() => {
                    setShowErr(false)
                  }}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{is_thai_language ? "เกิดข้อผิดพลาด" : "An error has occured"}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ fontWeight: "lighter" }}> {is_thai_language ? "ไม่แก้ไขข้อมูลผู้ใช้ได้ในขณะนี้" : "Cannot edit account information at the moment"} </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="pink"
                      className="btn-normal"
                      onClick={() => {
                        setShowErr(false)
                      }}
                    >ตกลง
                    </Button>
                  </Modal.Footer>
                </Modal>
              {/* END OF FORM */}
            </form>
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}

import React from "react"
import { UserContext } from "../../../../contexts/UsersContext"
import axios from "axios"
import {  Button } from "react-bootstrap"
import {Link } from "react-router-dom"
import { useAuthContext } from "../../../../controllers/authContext"

export default function OtherAaccountDisplay() {

  const {token} = useAuthContext()

  return (
    <UserContext.Consumer>
      {(context) => {
        const { Other } = context
        const user = Other

        const viewFile = async (fileID: String)=> {
          await axios
          .get("http://localhost:3000/fs/viewFileToken/" + fileID, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then(({ data }) => {
            console.log(data)   
            let url = "http://localhost:3000/fs/view?token=" + data.token
            let win = window.open(url, '_blank');
            win? win.focus(): console.log("Wrong token");        
          })
          .catch (({err})=> {console.log(err)})
        }

        const showWarningMessage = (verification_status: String) => {
        switch (verification_status) {
          case "NotSubmitted": {
            return (
              <div className="alert alert-danger mt-3" role="alert">
                <h3>{context.is_thai_language ? "คำเตือน" : "Warning"}</h3>
                <h6>{context.is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
              </div>
            )
          }
          case "Rejected": {
            return (
              <div className="alert alert-danger mt-3" role="alert">
                <h3>{context.is_thai_language ? "ข้อมูลการสมัครไม่ถูกต้อง" : "Incorrect Information"}</h3>
                <h6>{context.is_thai_language ? "กรุณาส่งข้อมูลการสมัครอีกครั้ง" : "Please resubmit the form."}</h6>
              </div>
            )
          }
          case "Submitted": {
            return (
              <div className="alert alert-info  mt-3" role="alert">
                <h3>{context.is_thai_language ? "ข้อมูลการสมัครถูกส่งแล้ว" : "Registration form submitted."}</h3>
                <h6>{context.is_thai_language ? "โปรดรอการยืนยัน" : "Please wait for approval."}</h6>
              </div>
            )
          }
          case "Approved": {
            return (
              <div className="alert alert-info mt-3" role="alert">
                <h3>{context.is_thai_language ? "ข้อมูลการสมัครถูกส่งแล้ว" : "Registration form approved."}</h3>
                <h6>
                  {context.is_thai_language
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
          <div className="mx-auto col-md-6">
            {showWarningMessage(user.verification_status)}
            
            <div className="default-mobile-wrapper">
              <div className="">
                {/* START OF THE FORM */}
                <h4>Member Information</h4>
                <div className="row">
                  <div className="col-md-4">
                    <label className="form-label mt-2">{context.is_thai_language ? "คำนำหน้าขื่อ * " : "Prefix *"}</label>
                    <p>{user.prefix}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label mt-2">{context.is_thai_language ? "เพศ *" : "Gender *"}</label>
                    <p>{user.gender}</p>
                  </div>
                </div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "ชื่อจริง *" : "ชื่อจริง *"}</label>
                <p>{user.name_th}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "นามสกุล *" : "นามสกุล *"}</label>
                <p>{user.surname_th}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "ชื่อจริง (ถาษาอังกฤษ) *" : "First Name *"}</label>
                <p>{user.name_en}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "นามสกุล (ถาษาอังกฤษ) *" : "Last Name *"}</label>
                <p>{user.surname_en}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "วัน/เด์อน/ปี เกิด *" : "Birthdate *"}</label>
                <div className="row">
                  <div className="col-sm-4">
                    <p>{user?.birthday.substring(0,10)}</p>
                    <div className="valid-feedback"></div>
                  </div>
                </div>

                <label className="form-label mt-2">{context.is_thai_language ? "หมายเลขบัตรประชน/พาสปอร์ต *" : "National ID / Passport *"}</label>
                <p>{user.national_id}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "สถานะการสมรส *" : "Marital Status *"}</label>
                <p>{user.marital_status}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "ที่อยู่ *" : "Address *"}</label>
                <p>{user.address}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "อีเมล *" : "Email *"}</label>
                <p>{user.personal_email}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
                <p>{user.home_phone}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">{context.is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
                <p>{user.phone}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">
                  {context.is_thai_language
                      ? "คุณมีโรคประจำตัวหรือไม่(ถ้าไม่มีโปรดเว้นว่าง)"
                      : "Do you have any medical conditions? (If there are none, please leave this blank"}
                </label>
                <p>{user.medical_condition}</p>
                <div className="valid-feedback"></div>
              </div>
            </div>
            <br />
            <div className="default-mobile-wrapper">
              <h4>{context.is_thai_language ? "ผู้ติดต่อยามฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>

              <label className="form-label mt-2">{context.is_thai_language ? "คำนำหน้าขื่อ *" : "Prefix *"}</label>
              <p>{user.contact_person.contact_person_prefix}</p>
              <hr />

              <label className="form-label mt-2">{context.is_thai_language ? "ชื่อ *" : "First Name *"}</label>
              <p>{user.contact_person.contact_person_name}</p>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{context.is_thai_language ? "นามสกุล *" : "Last Name *"}</label>
              <p>{user.contact_person.contact_person_surname}</p>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{context.is_thai_language ? "หมายเลขโทรศัพท์บ้าน *" : "Home Phone Number *"}</label>
              <p>{user.contact_person.contact_person_home_phone}</p>
              <div className="valid-feedback"></div>
              <hr />
              <label className="form-label mt-2">{context.is_thai_language ? "หมายเลขโทรศัพท์มือถือ *" : "Mobile Phone Number *"}</label>
              <p>{user.contact_person.contact_person_phone}</p>
              <div className="valid-feedback"></div>
            </div>
            <br />
            <div className="default-mobile-wrapper">
              <h4>Membership</h4>
              <label className="form-label my-2">{context.is_thai_language ? "รูปภาพของคุณ" : "Your Photo (Image File)"}</label>
              <div className="form-file">
                {user.user_photo ? (
                  <Button className="btn-normal btn-secondary" onClick={()=> viewFile(user.user_photo)}>View File</Button>
                ) : (
                  <p>No File</p>
                )} 
              </div>
              <hr />
              <label className="form-label my-2">{context.is_thai_language ? "หมายเลขบัตรประชาชน / พาสปอร์ต (.pdf เท่านั้น)" : "National ID / Passpord (.pdf only)"}</label>
              <div className="form-file">
                {user.national_id_photo ? (
                  <Button className="btn-normal btn-secondary" onClick={()=> viewFile(user.national_id_photo)}>View File</Button>
                ) : (
                  <p>No File</p>
                )} 
              </div>
              <hr />
              <label className="form-label my-2">{context.is_thai_language ? "ใบรับรองแพทย์ (.pdf เท่านั้น)" : "Medical Certificate (.pdf only)"}</label>
              <div className="form-file">
                {user.medical_certificate ? (
                  <Button className="btn-normal btn-secondary" onClick={()=> viewFile(user.medical_certificate)}>View File</Button>
                ) : (
                  <p>No File</p>
                )} 
              </div>
              <hr />
              <label className="form-label my-2">
                {context.is_thai_language
                    ? "ไม่บังคับ: สำเนาทะเบียนบ้านที่มีหน้านิสิต (.pdf only)"
                    : "Optional: House Registration Document with reference person (.pdf only)"}
              </label>
              <div className="form-file">
                {user.house_registration_number ? (
                  <Button className="btn-normal btn-secondary" onClick={()=> viewFile(user.house_registration_number)}>View File</Button>
                ) : (
                  <p>No File</p>
                )} 
              </div>
              <hr />
              <label className="form-label my-2">{context.is_thai_language ? "ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf only)" : "Optional: Relationship Verification document (.pdf only)"}</label>
              <div className="form-file">
                {user.relationship_verification_document ? (
                  <Button className="btn-normal btn-secondary" onClick={()=> viewFile(user.relationship_verification_document)}>View File</Button>
                ) : (
                  <p>No File</p>
                )} 
              </div>
            </div>
            {/* END OF FORM */}
            <div className="button-group col-md-12 mt-4">
              <Link to={"/changePassword"}>
              <button className="btn-normal btn-outline-black">
                {context.is_thai_language ? "เปลี่ยนรหัสผ่าน" : "Change Password"}
              </button>
            </Link>
            </div>
            <br />
            <br />
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}

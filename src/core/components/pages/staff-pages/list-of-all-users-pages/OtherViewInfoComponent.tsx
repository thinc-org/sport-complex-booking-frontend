import React, { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import { convertDate } from "./UserInfo"
import Info from "../interfaces/InfoInterface"

export default function OtherViewInfoComponent({ jwt, info }: { jwt: string; info: Info }) {
  /// Page states
  const [is_thai, set_thai] = useState<boolean>(true)

  // functions //
  useEffect(() => {
    console.log("Function triggered by useEffect")
  }, [])

  // handles //
  const handlePDF = (e) => {
    let fileId = e.target.id
    console.log("trying to open pdf: " + fileId)
    fetch({
      method: "GET",
      url: "/fs/viewFileToken/" + fileId,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(({ data }) => {
        // data is token //
        console.log(data)
        window.open(fetch.defaults.baseURL + "/fs/view?token=" + data, "_blank")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /// JSX Begins here
  let { prefix, gender, name, surname, national_id, marital_status, birthday, address, email, home_phone, phone, medical_condition } = info
  let { contact_person_prefix, contact_person_name, contact_person_surname, contact_person_home_phone, contact_person_phone } = info.contact_person
  return (
    <div className="row mr-4 mt-5">
      <div className="col">
        <Card body className="shadow mx-4 dim-white">
          {/* START OF THE FORM */}
          <h4>{is_thai ? "ข้อมูลสมาชิก" : "Member Information"}</h4>
          <div className="row">
            <div className="col py-2">
              <Button variant="outline-secondary" active={is_thai} className="btn-normal btn-outline-black mr-2" onClick={() => set_thai(true)}>
                ไทย
              </Button>
              <Button variant="outline-secondary" active={!is_thai} className="btn-normal btn-outline-black" onClick={() => set_thai(false)}>
                English
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "คำนำหน้าชื่อ *" : "Prefix *"}</label>
              <p>{prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "ชื่อ *" : "First Name *"}</label>
              <p>{name}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "นามสกุล *" : "Last Name *"}</label>
              <p>{surname}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "เพศ *" : "Gender *"}</label>
              <p>{gender}</p>
            </div>
          </div>
          <label className="form-label mt-2">{is_thai ? "วันเกิด *" : "Birthdate *"}</label>
          <div className="row">
            <div className="col">
              <p>{convertDate(birthday)}</p>
            </div>
          </div>
          <label className="form-label mt-2">{is_thai ? "เลขประจำตัวประชาชน / หนังสือเดินทาง *" : "National ID / Passport *"}</label>
          <p>{national_id}</p>
          <label className="form-label mt-2">{is_thai ? "สถานะสมรส" : "Marital Status"}</label>
          <p>{marital_status}</p>
          <hr />
          <label className="form-label mt-2">{is_thai ? "ที่อยู่" : "Address"}</label>
          <p>{address}</p>
          <label className="form-label mt-2">{is_thai ? "อีเมล" : "Email"}</label>
          <p>{email}</p>
          <label className="form-label mt-2">{is_thai ? "เบอร์โทรศัพท์ที่บ้าน" : "Home Phone Number"}</label>
          <p>{home_phone}</p>
          <label className="form-label mt-2">{is_thai ? "เบอร์โทรศัพท์มือถือ" : "Mobile Phone Number"}</label>
          <p>{phone}</p>
          <label className="form-label mt-2">
            {is_thai
              ? "คุณมีโรคประจำตัวหรือไม่ (ถ้าไม่มี โปรดเว้นว่างเอาไว้)"
              : "Do you have any medical conditions? (If there are none, please leave this blank)"}
          </label>
          <p>{medical_condition}</p>
        </Card>
      </div>
      <br />
      <div className="col">
        <Card body className="row shadow dim-white">
          <h4>{is_thai ? "การติดต่อในกรณีฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "คำนำหน้า *" : "Prefix *"}</label>
              <p>{contact_person_prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{is_thai ? "ชื่อ *" : "First Name *"}</label>
              <p>{contact_person_name}</p>
            </div>
          </div>
          <label className="form-label mt-2">{is_thai ? "นามสกุล *" : "Last Name *"}</label>
          <p>{contact_person_surname}</p>
          <label className="form-label mt-2">{is_thai ? "เบอร์โทรศัพท์ที่บ้าน" : "Home Phone Number"}</label>
          <p>{contact_person_home_phone}</p>
          <label className="form-label mt-2">{is_thai ? "เบอร์โทรศัพท์มือถือ" : "Mobile Phone Number"}</label>
          <p>{contact_person_phone}</p>
        </Card>
        <br />
        <Card body className="row shadow dim-white">
          <h4>{is_thai ? "เกี่ยวกับสมาชิก" : "Membership"}</h4>
          <h6 className="form-label my-2">{info.membership_type}</h6>
          <label className="form-label my-2">{is_thai ? "รูปภาพของคุณ (ไฟล์ภาพ)" : "Your Photo (image)"}</label>
          <div className="form-file">
            <p className="link" id={info.user_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {is_thai ? "เลขประจำตัวประชาชน / หนังสือเดินทาง (.pdf เท่านั้น)" : "National ID / Passport (.pdf only)"}
          </label>
          <div className="form-file">
            <p className="link" id={info.national_id_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{is_thai ? "ใบรับรองแพทย์ (.pdf เท่านั้น)" : "Medical Certificate (.pdf only)"}</label>
          <div className="form-file">
            <p className="link" id={info.medical_certifiate} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {is_thai
              ? "ไม่บังคับ: ทะเบียนบ้านที่มีหน้าของคุณ (.pdf เท่านั้น)"
              : "Optional: House Registration Document with reference person (.pdf only)"}
          </label>
          <div className="form-file">
            <p className="link" id={info.house_registration_number} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {is_thai ? "ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf เท่านั้น)" : "Optional: Relationship Verification document (.pdf only)"}
          </label>
          <div className="form-file">
            <p className="link" id={info.relationship_verification_document} onClick={handlePDF}>
              View PDF
            </p>
          </div>
        </Card>
      </div>

      {/* END OF FORM */}
      <br />
      <br />
    </div>
  )
}

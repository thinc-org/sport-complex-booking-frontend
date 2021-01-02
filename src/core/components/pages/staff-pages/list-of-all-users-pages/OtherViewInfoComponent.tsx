import React, { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import Info from "../interfaces/InfoInterface"
import format from "date-fns/format"

export default function OtherViewInfoComponent({ info }: { info: Info }) {
  /// Page states
  const [isThai, setThai] = useState<boolean>(true)

  // handles //
  const handlePDF = (e) => {
    let fileId = e.target.id
    window.open(`/staff/openFile/${fileId}`, "_blank")
    // client({
    //   method: "GET",
    //   url: "/fs/viewFileToken/" + fileId,
    // })
    //   .then(({ data }) => {
    //     // data is token //
    //     window.open(client.defaults.baseURL + "/fs/view?token=" + data.token, "_blank")
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  /// JSX Begins here
  let {
    prefix,
    gender,
    name_th,
    surname_th,
    name_en,
    surname_en,
    national_id,
    marital_status,
    birthday,
    address,
    email,
    home_phone,
    phone,
    medical_condition,
    contact_person,
  } = info
  let { contact_person_prefix, contact_person_name, contact_person_surname, contact_person_home_phone, contact_person_phone } = contact_person

  return (
    <div className="row mr-4 mt-5">
      <div className="col">
        <Card body className="shadow mx-4 dim-white">
          {/* START OF THE FORM */}
          <h4>{isThai ? "ข้อมูลสมาชิก" : "Member Information"}</h4>
          <div className="row">
            <div className="col py-2">
              <Button variant="outline-secondary" active={isThai} className="btn-normal btn-outline-black mr-2" onClick={() => setThai(true)}>
                ไทย
              </Button>
              <Button variant="outline-secondary" active={!isThai} className="btn-normal btn-outline-black" onClick={() => setThai(false)}>
                English
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{t("prefix")}</label>
              <p>{prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{isThai ? "เพศ *" : "Gender *"}</label>
              <p>{gender}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{isThai ? "ชื่อ(ภาษาไทย) *" : "Name(Thai) *"}</label>
              <p>{name_th}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{isThai ? "นามสกุล(ภาษาไทย) *" : "Surname(Thai) *"}</label>
              <p>{surname_th}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{isThai ? "ชื่อ(ภาษาอังกฤษ) *" : "Name(English) *"}</label>
              <p>{name_en}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{isThai ? "นามสกุล(ภาษาอังกฤษ) *" : "Surname(English) *"}</label>
              <p>{surname_en}</p>
            </div>
          </div>
          <label className="form-label mt-2">{isThai ? "วันเกิด *" : "Birthdate *"}</label>
          <div className="row">
            <div className="col">
              <p>{birthday ? format(new Date(birthday), "yyyy-MM-dd") : ""}</p>
            </div>
          </div>
          <label className="form-label mt-2">{isThai ? "เลขประจำตัวประชาชน / หนังสือเดินทาง *" : "National ID / Passport *"}</label>
          <p>{national_id}</p>
          <label className="form-label mt-2">{isThai ? "สถานะสมรส" : "Marital Status"}</label>
          <p>{marital_status}</p>
          <hr />
          <label className="form-label mt-2">{isThai ? "ที่อยู่" : "Address"}</label>
          <p>{address}</p>
          <label className="form-label mt-2">{isThai ? "อีเมล" : "Email"}</label>
          <p>{email}</p>
          <label className="form-label mt-2">{isThai ? "เบอร์โทรศัพท์ที่บ้าน" : "Home Phone Number"}</label>
          <p>{home_phone}</p>
          <label className="form-label mt-2">{isThai ? "เบอร์โทรศัพท์มือถือ" : "Mobile Phone Number"}</label>
          <p>{phone}</p>
          <label className="form-label mt-2">{t("medical_condition")}</label>
          <p>{medical_condition}</p>
        </Card>
      </div>
      <br />
      <div className="col" style={{ maxWidth: "40%" }}>
        <Card body className="row shadow dim-white">
          <h4>{isThai ? "การติดต่อในกรณีฉุกเฉิน" : "Contact Person in Case of Emergency"}</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">{isThai ? "คำนำหน้า *" : "Prefix *"}</label>
              <p>{contact_person_prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">{isThai ? "ชื่อ *" : "First Name *"}</label>
              <p>{contact_person_name}</p>
            </div>
          </div>
          <label className="form-label mt-2">{isThai ? "นามสกุล *" : "Last Name *"}</label>
          <p>{contact_person_surname}</p>
          <label className="form-label mt-2">{isThai ? "เบอร์โทรศัพท์ที่บ้าน" : "Home Phone Number"}</label>
          <p>{contact_person_home_phone}</p>
          <label className="form-label mt-2">{isThai ? "เบอร์โทรศัพท์มือถือ" : "Mobile Phone Number"}</label>
          <p>{contact_person_phone}</p>
        </Card>
        <br />
        <Card body className="row shadow dim-white">
          <h4>{isThai ? "เกี่ยวกับสมาชิก" : "Membership"}</h4>
          <h6 className="form-label my-2">{info.membership_type}</h6>
          <label className="form-label my-2">{isThai ? "รูปภาพของคุณ (ไฟล์ภาพ)" : "Your Photo (image)"}</label>
          <div className="form-file">
            <p className="link" id={info.user_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {isThai ? "เลขประจำตัวประชาชน / หนังสือเดินทาง (.pdf เท่านั้น)" : "National ID / Passport (.pdf only)"}
          </label>
          <div className="form-file">
            <p className="link" id={info.national_id_photo} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">{isThai ? "ใบรับรองแพทย์ (.pdf เท่านั้น)" : "Medical Certificate (.pdf only)"}</label>
          <div className="form-file">
            <p className="link" id={info.medical_certificate} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {isThai
              ? "ไม่บังคับ: ทะเบียนบ้านที่มีหน้าของคุณ (.pdf เท่านั้น)"
              : "Optional: House Registration Document with reference person (.pdf only)"}
          </label>
          <div className="form-file">
            <p className="link" id={info.house_registration_number} onClick={handlePDF}>
              View PDF
            </p>
          </div>
          <label className="form-label my-2">
            {isThai ? "ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf เท่านั้น)" : "Optional: Relationship Verification document (.pdf only)"}
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

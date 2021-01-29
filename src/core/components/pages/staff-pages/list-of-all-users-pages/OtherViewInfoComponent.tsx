import React from "react"
import { Card } from "react-bootstrap"
import Info from "../interfaces/InfoInterface"
import format from "date-fns/format"
import isValid from "date-fns/isValid"

export const handlePDF = (e: React.MouseEvent<HTMLElement>) => {
  const fileId = (e.target as HTMLElement).id
  if (fileId) window.open(`/staff/openFile/${fileId}`, "_blank")
}

export default function OtherViewInfoComponent({ info }: { info: Info }) {
  /// JSX Begins here
  const {
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
  const { contact_person_prefix, contact_person_name, contact_person_surname, contact_person_home_phone, contact_person_phone } = contact_person

  return (
    <div className="row mr-4 mt-5">
      <div className="col">
        <Card body className="shadow mx-4 dim-white">
          {/* START OF THE FORM */}
          <h4>ข้อมูลสมาชิก</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">คำนำหน้าชื่อ</label>
              <p>{prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">เพศ</label>
              <p>{gender}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">ชื่อจริง</label>
              <p>{name_th}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">นามสกุล</label>
              <p>{surname_th}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">ชื่อจริง (ภาษาอังกฤษ)</label>
              <p>{name_en}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">นามสกุล (ภาษาอังกฤษ)</label>
              <p>{surname_en}</p>
            </div>
          </div>
          <label className="form-label mt-2">วัน/เดือน/ปี เกิด</label>
          <div className="row">
            <div className="col">
              <p>{isValid(new Date(birthday)) ? format(new Date(birthday), "yyyy-MM-dd") : ""}</p>
            </div>
          </div>
          <label className="form-label mt-2">หมายเลขบัตรประชาชน/พาสปอร์ต</label>
          <p>{national_id}</p>
          <label className="form-label mt-2">สถานะการสมรส</label>
          <p>{marital_status}</p>
          <hr />
          <label className="form-label mt-2">ที่อยู่</label>
          <p>{address}</p>
          <label className="form-label mt-2">อีเมล</label>
          <p>{email}</p>
          <label className="form-label mt-2">หมายเลขโทรศัพท์บ้าน</label>
          <p>{home_phone}</p>
          <label className="form-label mt-2">หมายเลขโทรศัพท์มือถือ</label>
          <p>{phone}</p>
          <label className="form-label mt-2">โรคประจำตัว</label>
          <p>{medical_condition}</p>
        </Card>
      </div>
      <br />
      <div className="col" style={{ maxWidth: "40%" }}>
        <Card body className="row shadow dim-white">
          <h4>ข้อมูลผู้ติดต่อในกรณีฉุกเฉิน</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">คำนำหน้าขื่อ</label>
              <p>{contact_person_prefix}</p>
            </div>
            <div className="col">
              <label className="form-label mt-2">ชื่อ</label>
              <p>{contact_person_name}</p>
            </div>
          </div>
          <label className="form-label mt-2">นามสกุล</label>
          <p>{contact_person_surname}</p>
          <label className="form-label mt-2">หมายเลขโทรศัพท์บ้าน</label>
          <p>{contact_person_home_phone}</p>
          <label className="form-label mt-2">หมายเลขโทรศัพท์มือถือ</label>
          <p>{contact_person_phone}</p>
        </Card>
        <br />
        <Card body className="row shadow dim-white">
          <h4>เกี่ยวกับสมาชิก</h4>
          <h6 className="form-label my-2">{info.membership_type}</h6>
          <label className="form-label my-2">รูปภาพ</label>
          <div className="form-file">
            <p className={info.user_photo ? "link" : "text-muted"} id={info.user_photo} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
          <label className="form-label my-2">หมายเลขบัตรประชาชน / พาสปอร์ต</label>
          <div className="form-file">
            <p className={info.national_id_photo ? "link" : "text-muted"} id={info.national_id_photo} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
          <label className="form-label my-2">เอกสารใบรับรองแพทย์</label>
          <div className="form-file">
            <p className={info.medical_certificate ? "link" : "text-muted"} id={info.medical_certificate} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
          <label className="form-label my-2">สำเนาทะเบียนบ้านที่มีหน้านิสิต</label>
          <div className="form-file">
            <p className={info.house_registration_number ? "link" : "text-muted"} id={info.house_registration_number} onClick={handlePDF}>
              ดูเอกสาร
            </p>
          </div>
          <label className="form-label my-2">เอกสารยืนยันตัวตน</label>
          <div className="form-file">
            <p
              className={info.relationship_verification_document ? "link" : "text-muted"}
              id={info.relationship_verification_document}
              onClick={handlePDF}
            >
              ดูเอกสาร
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

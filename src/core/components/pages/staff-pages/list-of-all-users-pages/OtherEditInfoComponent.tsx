import React from "react"
import { useState, useEffect } from "react"
import { Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { convertDate } from "./UserInfo"
import Info from "../interfaces/InfoInterface"

export default function OtherEditInfoComponent({
  temp_info,
  set_temp_info,
  _id,
}: {
  temp_info: Info
  set_temp_info: React.Dispatch<React.SetStateAction<Info>>
  _id: string
}) {
  // Page state //
  const [user_photo_file, set_user_photo_file] = useState<File>()
  const [medical_certificate_file, set_medical_certificate_file] = useState<File>()
  const [national_id_photo_file, set_national_id_photo_file] = useState<File>()
  const [house_registration_number_file, set_house_registration_number_file] = useState<File>()
  const [relationship_verification_document_file, set_relationship_verification_document_file] = useState<File>()

  // functions //

  // handles //
  const handleUpload = (typename, file) => {
    const formData = new FormData()
    let selectedFile = file
    // Update the formData object
    if (selectedFile) {
      formData.append(typename, selectedFile, selectedFile.name)
      // Request made to the backend api
      client({
        method: "POST",
        url: "/fs/admin/upload/" + _id,
        data: formData,
      })
        .then(({ data }) => {
          set_temp_info({
            ...temp_info,
            [Object.keys(data)[0]]: data[Object.keys(data)[0]],
          })
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
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
    contact_person,
    medical_condition,
    membership_type,
  } = temp_info
  let {
    contact_person_prefix,
    contact_person_name,
    contact_person_surname,
    contact_person_home_phone,
    contact_person_phone,
  } = temp_info.contact_person

  return (
    <div className="row mr-4 mt-5">
      <div className="col px-0">
        <Card body className="shadow mx-4 dim-white">
          {/* START OF THE FORM */}
          <h4>ข้อมูลสมาชิก</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">คำนำหน้า *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={prefix ? prefix : "ไม่มี"}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, prefix: e.target.value })
                }}
              >
                <option disabled value="ไม่มี">
                  เลือกคำนำหน้า
                </option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </Form.Control>
            </div>
            <div className="col">
              <label className="form-label mt-2">เพศ *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={gender === "ชาย" || gender === "หญิง" ? gender : "ไม่มี"}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, gender: e.target.value })
                }}
              >
                <option value="ไม่มี" disabled>
                  เลือกเพศ
                </option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </Form.Control>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">ชื่อ (ภาษาไทย) *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={name_th}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, name_th: e.target.value })
                }}
              />
            </div>
            <div className="col">
              <label className="form-label mt-2">นามสกุล (ภาษาไทย) *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={surname_th}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, surname_th: e.target.value })
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">Name (English) *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={name_en}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, name_en: e.target.value })
                }}
              />
            </div>
            <div className="col">
              <label className="form-label mt-2">Surname (English) *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={surname_en}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, surname_en: e.target.value })
                }}
              />
            </div>
          </div>
          <hr />
          <label className="form-label mt-2">วันเกิด *</label>
          <div className="row">
            <div className="col">
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="date"
                defaultValue={birthday ? convertDate(new Date(birthday)) : ""}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, birthday: new Date(e.target.value) })
                }}
              />
            </div>
          </div>
          <hr />
          <label className="form-label mt-2">เลขประจำตัวประชาชน / หนังสือเดินทาง *</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={national_id}
            onChange={(e) => {
              set_temp_info({ ...temp_info, national_id: e.target.value })
            }}
          />
          <hr />
          <label className="form-label mt-2">สถานะสมรส</label>
          <Form.Group>
            <Form.Check
              inline
              label="โสด"
              type="radio"
              value="Single"
              onChange={(e) => {
                set_temp_info({ ...temp_info, marital_status: e.target.value })
              }}
              checked={marital_status === "Single" ? true : false}
            />
            <Form.Check
              inline
              label="สมรส"
              type="radio"
              value="Married"
              onChange={(e) => {
                set_temp_info({ ...temp_info, marital_status: e.target.value })
              }}
              checked={marital_status === "Married" ? true : false}
            />
            <Form.Check
              inline
              label="อื่นๆ : "
              type="radio"
              value=""
              onChange={(e) => {
                set_temp_info({ ...temp_info, marital_status: e.target.value })
              }}
              checked={marital_status !== "Single" && marital_status !== "Married" ? true : false}
            />
            <Form.Control
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              value={marital_status !== "Single" && marital_status !== "Married" ? marital_status : ""}
              onChange={(e) => {
                set_temp_info({ ...temp_info, marital_status: e.target.value })
              }}
            />
          </Form.Group>

          <hr />
          <label className="form-label mt-2">ที่อยู่</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={address}
            onChange={(e) => {
              set_temp_info({ ...temp_info, address: e.target.value })
            }}
          />
          <hr />
          <label className="form-label mt-2">อีเมล</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={email}
            onChange={(e) => {
              set_temp_info({ ...temp_info, email: e.target.value })
            }}
          />
          <hr />
          <label className="form-label mt-2">เบอร์โทรศัพท์ที่บ้าน</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={home_phone}
            onChange={(e) => {
              set_temp_info({ ...temp_info, home_phone: e.target.value })
            }}
          />
          <hr />
          <label className="form-label mt-2">เบอร์โทรศัพท์มือถือ</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={phone}
            onChange={(e) => {
              set_temp_info({ ...temp_info, phone: e.target.value })
            }}
          />
          <hr />
          <label className="form-label mt-2">คุณมีโรคประจำตัวหรือไม่ (ถ้าไม่มี โปรดเว้นว่างเอาไว้)</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={medical_condition}
            onChange={(e) => {
              set_temp_info({ ...temp_info, medical_condition: e.target.value })
            }}
          />
        </Card>
      </div>
      <br />
      <div className="col" style={{ maxWidth: "40%" }}>
        <Card body className="row shadow dim-white">
          <h4>การติดต่อในกรณีฉุกเฉิน</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">คำนำหน้า *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={contact_person_prefix ? contact_person_prefix : "ไม่มี"}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_prefix: e.target.value } })
                }}
              >
                <option disabled value="ไม่มี">
                  เลือกคำนำหน้า
                </option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
              </Form.Control>
            </div>
            <div className="col">
              <label className="form-label mt-2">ชื่อ *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={contact_person_name}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_name: e.target.value } })
                }}
              />
            </div>
          </div>
          <hr />
          <label className="form-label mt-2">นามสกุล *</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={contact_person_surname}
            onChange={(e) => {
              set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_surname: e.target.value } })
            }}
          />
          <hr />
          <label className="form-label mt-2">เบอร์โทรศัพท์ที่บ้าน</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={contact_person_home_phone}
            onChange={(e) => {
              set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_home_phone: e.target.value } })
            }}
          />
          <hr />
          <label className="form-label mt-2">เบอร์โทรศัพท์มือถือ</label>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            defaultValue={contact_person_phone}
            onChange={(e) => {
              set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_phone: e.target.value } })
            }}
          />
        </Card>
        <br />
        <Card body className="row shadow dim-white">
          <h4>เกี่ยวกับสมาชิก</h4>
          <h6 className="form-label my-2">{membership_type}</h6>
          <label className="form-label my-2">รูปภาพของคุณ (ไฟล์ภาพ)</label>
          <div className="form-file">
            <Form.File
              label={user_photo_file ? (user_photo_file! as File).name : "Choose File"}
              id="user_photo"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_user_photo_file(e.target.files[0])
                  handleUpload(e.target.id, e.target.files[0])
                }
              }}
            />
          </div>
          <hr />
          <label className="form-label my-2">เลขประจำตัวประชาชน / หนังสือเดินทาง (.pdf เท่านั้น)</label>
          <div className="form-file">
            <Form.File
              label={national_id_photo_file ? (national_id_photo_file! as File).name : "Choose File"}
              id="national_id_photo"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_national_id_photo_file(e.target.files[0])
                  handleUpload(e.target.id, e.target.files[0])
                }
              }}
            />
          </div>
          <hr />
          <label className="form-label my-2">ใบรับรองแพทย์ (.pdf เท่านั้น)</label>
          <div className="form-file">
            <Form.File
              label={medical_certificate_file ? (medical_certificate_file! as File).name : "Choose File"}
              id="medical_certificate"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_medical_certificate_file(e.target.files[0])
                  handleUpload(e.target.id, e.target.files[0])
                }
              }}
            />
          </div>
          <hr />
          <label className="form-label my-2">ไม่บังคับ: ทะเบียนบ้านที่มีหน้าของคุณ (.pdf เท่านั้น)</label>
          <div className="form-file">
            <Form.File
              label={house_registration_number_file ? (house_registration_number_file! as File).name : "Choose File"}
              id="house_registration_number"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_house_registration_number_file(e.target.files[0])
                  handleUpload(e.target.id, e.target.files[0])
                }
              }}
            />
          </div>
          <hr />
          <label className="form-label my-2">ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf เท่านั้น)</label>
          <div className="form-file">
            <Form.File
              label={relationship_verification_document_file ? (relationship_verification_document_file! as File).name : "Choose File"}
              id="relationship_verification_document"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_relationship_verification_document_file(e.target.files[0])
                  console.log(e.target.files[0])
                  handleUpload(e.target.id, e.target.files[0])
                }
              }}
            />
          </div>
        </Card>
      </div>

      {/* END OF FORM */}
      <br />
      <br />
    </div>
  )
}

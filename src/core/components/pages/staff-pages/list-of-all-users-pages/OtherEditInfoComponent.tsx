import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import Info, { EditComponentInfo } from "../interfaces/InfoInterface"
import format from "date-fns/format"
import { useForm } from "react-hook-form"

export default function OtherEditInfoComponent({
  tempInfo,
  setTempInfo,
  handleSave,
}: {
  tempInfo: Info
  setTempInfo: React.Dispatch<React.SetStateAction<Info>>
  handleSave: () => void
}) {
  // Page state //
  const { _id } = useParams<{ _id: string }>()

  const [userPhotoFile, setUserPhotoFile] = useState<File>()
  const [medicalCertificateFile, setMedicalCertificateFile] = useState<File>()
  const [nationalIdPhotoFile, setNationalIdPhotoFile] = useState<File>()
  const [houseRegistrationNumberFile, setHouseRegistrationNumberFile] = useState<File>()
  const [relationshipVerificationDocumentFile, setRelationshipVerificationDocumentFile] = useState<File>()

  const { register, handleSubmit } = useForm()
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
        url: `/fs/admin/upload/${_id}`,
        data: formData,
      })
        .then(({ data }) => {
          setTempInfo({
            ...tempInfo,
            [Object.keys(data)[0]]: data[Object.keys(data)[0]],
          })
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }

  const onSubmit = (data: EditComponentInfo) => {
    // console.log(data)
    setTempInfo({
      ...tempInfo,
      prefix: data.prefix,
      name_th: data.name_th,
      surname_th: data.surname_th,
      name_en: data.name_en,
      surname_en: data.surname_en,
      gender: data.gender,
      birthday: new Date(data.birthday),
      national_id: data.national_id,
      marital_status: marital_status !== "Single" && marital_status !== "Married" ? data.marital_status_text : marital_status,
      address: data.address,
      email: data.email,
      phone: data.phone,
      home_phone: data.home_phone,
      medical_condition: data.medical_condition,
      contact_person: {
        contact_person_prefix: data.contact_person_prefix,
        contact_person_name: data.contact_person_name,
        contact_person_surname: data.contact_person_surname,
        contact_person_home_phone: data.contact_person_home_phone,
        contact_person_phone: data.contact_person_phone,
      },
    })
    handleSave()
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
  } = tempInfo
  let {
    contact_person_prefix,
    contact_person_name,
    contact_person_surname,
    contact_person_home_phone,
    contact_person_phone,
  } = tempInfo.contact_person

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mr-4 mt-5">
        <div className="col px-0">
          <Card body className="shadow mx-4 dim-white">
            {/* START OF THE FORM */}
            <h4>ข้อมูลสมาชิก</h4>
            <div className="row">
              <div className="col">
                <label className="form-label mt-2">คำนำหน้า *</label>
                <Form.Control
                  ref={register}
                  name="prefix"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  as="select"
                  defaultValue={prefix ? prefix : "ไม่มี"}
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
                  ref={register}
                  name="gender"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  as="select"
                  defaultValue={gender === "ชาย" || gender === "หญิง" ? gender : "ไม่มี"}
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
                  ref={register}
                  name="name_th"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={name_th}
                />
              </div>
              <div className="col">
                <label className="form-label mt-2">นามสกุล (ภาษาไทย) *</label>
                <Form.Control
                  ref={register}
                  name="surname_th"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={surname_th}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label mt-2">Name (English) *</label>
                <Form.Control
                  ref={register}
                  name="name_en"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={name_en}
                />
              </div>
              <div className="col">
                <label className="form-label mt-2">Surname (English) *</label>
                <Form.Control
                  ref={register}
                  name="surname_en"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={surname_en}
                />
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">วันเกิด *</label>
            <div className="row">
              <div className="col">
                <Form.Control
                  ref={register}
                  name="birthday"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="date"
                  defaultValue={birthday ? format(new Date(birthday), "yyyy-MM-dd") : ""}
                />
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">เลขประจำตัวประชาชน / หนังสือเดินทาง *</label>
            <Form.Control
              ref={register}
              name="national_id"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={national_id}
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
                  setTempInfo({ ...tempInfo, marital_status: e.target.value })
                }}
                checked={marital_status === "Single" ? true : false}
              />
              <Form.Check
                inline
                label="สมรส"
                type="radio"
                value="Married"
                onChange={(e) => {
                  setTempInfo({ ...tempInfo, marital_status: e.target.value })
                }}
                checked={marital_status === "Married" ? true : false}
              />
              <Form.Check
                inline
                label="อื่นๆ : "
                type="radio"
                value=""
                onChange={(e) => {
                  setTempInfo({ ...tempInfo, marital_status: e.target.value })
                }}
                checked={marital_status !== "Single" && marital_status !== "Married" ? true : false}
              />
              <Form.Control
                ref={register}
                name="marital_status_text"
                disabled={marital_status === "Single" || marital_status === "Married"}
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={marital_status !== "Single" && marital_status !== "Married" ? marital_status : ""}
              />
            </Form.Group>
            <hr />
            <label className="form-label mt-2">ที่อยู่</label>
            <Form.Control ref={register} name="address" className="border" style={{ backgroundColor: "white" }} type="text" defaultValue={address} />
            <hr />
            <label className="form-label mt-2">อีเมล</label>
            <Form.Control ref={register} name="email" className="border" style={{ backgroundColor: "white" }} type="text" defaultValue={email} />
            <hr />
            <label className="form-label mt-2">เบอร์โทรศัพท์ที่บ้าน</label>
            <Form.Control
              ref={register}
              name="home_phone"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={home_phone}
            />
            <hr />
            <label className="form-label mt-2">เบอร์โทรศัพท์มือถือ</label>
            <Form.Control ref={register} name="phone" className="border" style={{ backgroundColor: "white" }} type="text" defaultValue={phone} />
            <hr />
            <label className="form-label mt-2">คุณมีโรคประจำตัวหรือไม่ (ถ้าไม่มี โปรดเว้นว่างเอาไว้)</label>
            <Form.Control
              ref={register}
              name="medical_condition"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={medical_condition}
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
                  ref={register}
                  name="contact_person_prefix"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  as="select"
                  defaultValue={contact_person_prefix ? contact_person_prefix : "ไม่มี"}
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
                  ref={register}
                  name="contact_person_name"
                  className="border"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  defaultValue={contact_person_name}
                />
              </div>
            </div>
            <hr />
            <label className="form-label mt-2">นามสกุล *</label>
            <Form.Control
              ref={register}
              name="contact_person_surname"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={contact_person_surname}
            />
            <hr />
            <label className="form-label mt-2">เบอร์โทรศัพท์ที่บ้าน</label>
            <Form.Control
              ref={register}
              name="contact_person_home_phone"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={contact_person_home_phone}
            />
            <hr />
            <label className="form-label mt-2">เบอร์โทรศัพท์มือถือ</label>
            <Form.Control
              ref={register}
              name="contact_person_phone"
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              defaultValue={contact_person_phone}
            />
          </Card>
          <br />
          {/* Upload Section */}
          <Card body className="row shadow dim-white">
            <h4>เกี่ยวกับสมาชิก</h4>
            <h6 className="form-label my-2">{membership_type}</h6>
            <label className="form-label my-2">รูปภาพของคุณ (ไฟล์ภาพ)</label>
            <div className="form-file">
              <Form.File
                label={userPhotoFile ? (userPhotoFile! as File).name : "Choose File"}
                id="user_photo"
                custom
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setUserPhotoFile(e.target.files[0])
                    handleUpload(e.target.id, e.target.files[0])
                  }
                }}
              />
            </div>
            <hr />
            <label className="form-label my-2">เลขประจำตัวประชาชน / หนังสือเดินทาง (.pdf เท่านั้น)</label>
            <div className="form-file">
              <Form.File
                label={nationalIdPhotoFile ? (nationalIdPhotoFile! as File).name : "Choose File"}
                id="national_id_photo"
                custom
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setNationalIdPhotoFile(e.target.files[0])
                    handleUpload(e.target.id, e.target.files[0])
                  }
                }}
              />
            </div>
            <hr />
            <label className="form-label my-2">ใบรับรองแพทย์ (.pdf เท่านั้น)</label>
            <div className="form-file">
              <Form.File
                label={medicalCertificateFile ? (medicalCertificateFile! as File).name : "Choose File"}
                id="medical_certificate"
                custom
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setMedicalCertificateFile(e.target.files[0])
                    handleUpload(e.target.id, e.target.files[0])
                  }
                }}
              />
            </div>
            <hr />
            <label className="form-label my-2">ไม่บังคับ: ทะเบียนบ้านที่มีหน้าของคุณ (.pdf เท่านั้น)</label>
            <div className="form-file">
              <Form.File
                label={houseRegistrationNumberFile ? (houseRegistrationNumberFile! as File).name : "Choose File"}
                id="house_registration_number"
                custom
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setHouseRegistrationNumberFile(e.target.files[0])
                    handleUpload(e.target.id, e.target.files[0])
                  }
                }}
              />
            </div>
            <hr />
            <label className="form-label my-2">ไม่บังคับ: เอกสารยืนยันตัวตน (.pdf เท่านั้น)</label>
            <div className="form-file">
              <Form.File
                label={relationshipVerificationDocumentFile ? (relationshipVerificationDocumentFile! as File).name : "Choose File"}
                id="relationship_verification_document"
                custom
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setRelationshipVerificationDocumentFile(e.target.files[0])
                    console.log(e.target.files[0])
                    handleUpload(e.target.id, e.target.files[0])
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </Form>
  )
}

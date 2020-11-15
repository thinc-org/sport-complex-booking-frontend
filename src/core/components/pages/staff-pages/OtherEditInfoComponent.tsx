import React from "react"
import { useState, useEffect } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import axios from "axios"
import { Info, convertDate } from "./UserInfo"

export default function OtherEditInfoComponent({
  jwt,
  temp_info,
  set_temp_info,
}: {
  jwt: string
  temp_info: Info
  set_temp_info: React.Dispatch<React.SetStateAction<Info>>
}) {
  // Page state //
  const [user_photo_file, set_user_photo_file] = useState()
  const [medical_certifiate_file, set_medical_certifiate_file] = useState()
  const [national_id_photo_file, set_national_id_photo_file] = useState()
  const [house_registration_number_file, set_house_registration_number_file] = useState()
  const [relationship_verification_document_file, set_relationship_verification_document_file] = useState()

  // const [pdf_token, set_pdf_token] = useState<string>("")

  // functions //
  useEffect(() => {
    console.log("changing state")
    // console.log(temp_info)
    console.log("useseffect " + user_photo_file)
    // fetchUserData()
  }, [user_photo_file])

  // handles //
  const handleUpload = (id, file) => {
    const formData = new FormData()
    // let selectedFile
    let selectedFile = file
    let userId = 1234 ///////// FIX ////////////
    // Update the formData object
    if (selectedFile) {
      formData.append(id, selectedFile, selectedFile.name)
      // Request made to the backend api
      axios
        .post("http://localhost:3000/fs/upload" + userId, {
          header: { Authorization: "bearer " + jwt },
          formData,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  /// JSX Begins here
  let {
    prefix,
    gender,
    name,
    surname,
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
    // user_photo,
    // medical_certifiate,
    // national_id_photo,
    // house_registration_number,
    // relationship_verification_document,
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
      <div className="col">
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
                defaultValue={prefix}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, prefix: e.target.value })
                }}
              >
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
                defaultValue={name}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, name: e.target.value })
                }}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">นามสกุล *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                type="text"
                defaultValue={surname}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, surname: e.target.value })
                }}
              />
            </div>
            <div className="col">
              <label className="form-label mt-2">เพศ *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={gender}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, gender: e.target.value })
                }}
              >
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
              </Form.Control>
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
                defaultValue={convertDate(birthday)}
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
      <div className="col">
        <Card body className="row shadow dim-white">
          <h4>การติดต่อในกรณีฉุกเฉิน</h4>
          <div className="row">
            <div className="col">
              <label className="form-label mt-2">คำนำหน้า *</label>
              <Form.Control
                className="border"
                style={{ backgroundColor: "white" }}
                as="select"
                defaultValue={contact_person_prefix}
                onChange={(e) => {
                  set_temp_info({ ...temp_info, contact_person: { ...contact_person, contact_person_prefix: e.target.value } })
                }}
              >
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
                // console.log(e.target.files[0])
                if (e.target.files[0]) {
                  // console.log(e.target.files[0])
                  set_user_photo_file(e.target.files[0])
                  // console.log("nice " + user_photo_file)
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
              label={medical_certifiate_file ? (medical_certifiate_file! as File).name : "Choose File"}
              id="medical_certifiate"
              custom
              onChange={(e) => {
                if (e.target.files[0]) {
                  set_medical_certifiate_file(e.target.files[0])
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

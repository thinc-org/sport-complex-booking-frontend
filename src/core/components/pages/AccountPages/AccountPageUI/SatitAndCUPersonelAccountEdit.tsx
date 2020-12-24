import React from "react"
import { useState, useContext } from "react"
import {  Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form";
import axios from "axios"
import { UserContext } from "../../../../contexts/UsersContext"
import { useAuthContext } from "../../../../controllers/authContext";

interface EdittedData {
  personal_email: String,
  phone: String,
  is_thai_language: Boolean
}

export default function SatitAndCUPersonelAccountEdit({  toggle_edit_button}) {
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const {token} = useAuthContext()
  const { is_thai_language } = useContext(UserContext)
  const { SatitCuPersonel } = useContext(UserContext)
  const user = SatitCuPersonel
  
  // React Hook Forms
  const { register, handleSubmit, errors  } = useForm();

  const onSubmit = (data: EdittedData) => {
    postDataToBackend(data)
  };

  const handleCancel = (e) => {
    e.preventDefault()
    window.location.reload()
  }

  const showWarningMessage = (firstLogin: Boolean) => {
    if (firstLogin) {
      return (
        <div className="alert alert-danger mt-3" role="alert">
          <h3>{is_thai_language ? "คำเตือน" : "Warning"}</h3>
          <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  const postDataToBackend = async (data: EdittedData) => {
    console.log("send data to backend")
    data = {
      ...data,
      is_thai_language: is_thai_language,
    }
    await axios
      .put("http://localhost:3000/account_info/", data, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then(({ data }) => {
        console.log("SENT", data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        setShowErr(true);
      })
  }

  return (
    <div className="mx-auto col-md-6">
      {showWarningMessage(user.is_first_login)}
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {user.name_en} {user.surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">{is_thai_language? "นักเรียนโรงเรียนสาธิตจุฬา และ บุคลากรจุฬา" : "Satit Chula and CU Personel"}</h6>
        </div>
        <hr className="mx-1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label className="form-label mt-2">{is_thai_language ? "เบอร์โทรศัพท์" : "Mobile"}</label>
            <input name="phone" type="number" ref={register({
                required: "Enter your phone number",
                pattern: {
                  value: /^[A-Z0-9._%+-]/i,
                  message: "Enter a valid phone number",
                },
              })} placeholder="0xxxxxxxxx" defaultValue={user.phone} className="form-control"/>
            {errors.mobile && <p id="input-error">{errors.mobile.message}</p>}

            <label className="form-label mt-2">{is_thai_language ? "อีเมลส่วนตัว" : "Personal Email"}</label>
            <input
              name="personal_email"
              ref={register({
                required: "Enter your e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid e-mail address",
                },
              })}
              placeholder="example@email.com"
              defaultValue={user.personal_email}
              className="form-control"
            />
            {errors.personal_email && <p id="input-error">{errors.personal_email.message}</p>}
          </div>
          <br />
          <br />
          <div className="row">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                {is_thai_language ? "ยกเลิก" : "Cancel"}
              </Button>
              <Button variant="pink" className="btn-secondary" onClick={()=> setShow(true)}>
                {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <Modal  classname="modal"  show={show} onHide={()=>setShow(false)}>
            <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="confirmModalLabel">
                    {is_thai_language ? "ยืนยันการส่งใบสมัคร" : "Confirm submit"}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
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
            classname="modal" 
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
              >
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
      <br />
    </div>
  )
}
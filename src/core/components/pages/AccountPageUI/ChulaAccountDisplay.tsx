import React from "react"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"

export default function ChulaAccountDisplay({ jwt, toggle_edit_button }) {
  let [is_editting, set_is_editting] = useState(false)
  let [name_th, set_name_th] = useState("")
  let [surname_th, set_surname_th] = useState("")
  let [name_en, set_name_en] = useState("")
  let [surname_en, set_surname_en] = useState("")
  let [phone, set_phone] = useState("")
  let [personal_email, set_personal_email] = useState("")
  let [is_thai_language, set_is_thai_language] = useState(false)
  let [is_first_login, set_is_first_login] = useState()

  const fetchUserData = async () => {
    await axios
      .get("http://localhost:3000/account_info/", {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        set_name_en(data.name_en)
        set_surname_en(data.surname_en)
        set_name_th(data.name_th)
        set_surname_th(data.surname_th)
        set_phone(data.phone)
        set_personal_email(data.personal_email)
        showWarningMessage(data.is_first_login)
        set_is_first_login(data.is_first_login)
      })
  }

  const showWarningMessage = (firstLogin) => {
    if (firstLogin) {
      return (
        <div className="alert alert-danger  mt-3" role="alert">
          <h3>{is_thai_language ? "คำเตือน" : "Warning"}</h3>
          <h6>{is_thai_language ? "กรุณาส่งข้อมูลการสมัคร" : "Please submit the registration form."}</h6>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  useEffect(() => {
    console.log("Function triggered by useEffect")
    fetchUserData()
  }, [])

  return (
    <div className="mx-auto col-md-6">
      {showWarningMessage(is_first_login)}
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {name_en} {surname_en}
            </h4>
          </div>
          <div className="col-4">
            <Button className="btn-secondary float-right" onClick={toggle_edit_button}>
              Edit
            </Button>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3 mt-3">Chulalongkorn University Student</h6>
        </div>
        <hr className="mx-1" />
        <div className="">
          <label className="form-label mt-2">Mobile Phone Number</label>
          <p>{phone}</p>
          <div className="valid-feedback"></div>
          <hr />
          <label className="form-label mt-2">Email</label>
          <p>{personal_email}</p>
          <div className="valid-feedback"></div>
        </div>
      </div>
      <br />
    </div>
  )
}

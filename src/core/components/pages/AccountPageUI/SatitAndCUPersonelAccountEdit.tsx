import React, { Component } from "react"
import { useState, useEffect, useContext } from "react"
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from "react-bootstrap"
import axios from "axios"

export default function SatitAndCUPersonelAccountEdit({ jwt, toggle_edit_button }) {
  let [is_editting, set_is_editting] = useState(false)

  let [name_th, set_name_th] = useState("")
  let [surname_th, set_surname_th] = useState("")
  let [name_en, set_name_en] = useState("")
  let [surname_en, set_surname_en] = useState("")
  let [phone, set_phone] = useState("")
  let [personal_email, set_personal_email] = useState("")
  let [is_thai_language, set_is_thai_language] = useState(false)
  let [is_first_login, set_is_first_login] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    postDataToBackend()
  }

  const handleCancel = (e) => {
    e.preventDefault()
    fetchUserData()
    toggle_edit_button()
  }

  const postDataToBackend = async () => {
    console.log("send data to backend")
    const data = {
      personal_email: personal_email,
      phone: phone,
      is_thai_language: is_thai_language,
    }
    await axios
      .put("http://localhost:3000/account_info/", data, {
        headers: {
          Authorization: "bearer " + jwt,
        },
      })
      .then(({ data }) => {
        console.log(data)
        window.location.reload(false)
      })
  }

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
        <div className="alert alert-danger mt-3" role="alert">
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
      <div className="alert alert-danger" role="alert">
        <h3>Warning</h3>
        <h6>Warning Message</h6>
      </div>
      <div className="default-mobile-wrapper">
        <div className="row mt-2">
          <div className="col-8">
            <h4 className="align-right">
              {name_en} {surname_en}
            </h4>
          </div>
        </div>
        <div className="row">
          <h6 className="mx-3">Satit Chula and CU Personel</h6>
        </div>
        <hr className="mx-1" />
        <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <label className="form-label mt-2">Mobile</label>
            <input
              type="number"
              value={phone}
              className="form-control"
              id="validationCustom01"
              onChange={(e) => set_phone(e.target.value)}
              required
            ></input>
            <div className=""></div>
            <div className="valid-feedback">
              <h6>{personal_email.length === 0 ? "Email is required" : ""}</h6>
            </div>
            <hr />
            <label className="form-label mt-2">Email</label>
            <input
              type="text"
              value={personal_email}
              className="form-control"
              id="validationCustom01"
              required
              onChange={(e) => set_personal_email(e.target.value)}
            ></input>
            <div className="valid-feedback">
              <h6>{personal_email.length === 0 ? "Email is required" : ""}</h6>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="button-group col-md-12">
              <Button variant="gray" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
            <div className="button-group col-md-12">
              <Button variant="pink" className="btn-secondary" data-toggle="modal" data-target="#exampleModal">
                {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
              </Button>
            </div>
          </div>

          {/* MODAL CONFIRM DIALOGUE */}
          <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {is_thai_language ? "ยืนยันการส่งใบสมัคร" : "Confirm submit"}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">{is_thai_language ? "คุณต้องการส่งใบสมัครหรือไม่" : "Do you want to submit the registration form?"}</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    {is_thai_language ? "ยกเลิก" : "Cancel"}
                  </button>
                  <Button type="submit" className="btn btn-primary">
                    {is_thai_language ? "บันทึกและส่ง" : "Save and Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
    </div>
  )
}

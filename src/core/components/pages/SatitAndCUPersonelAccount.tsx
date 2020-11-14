import React, { Component } from "react"
import { useState, useEffect } from "react"

import axios from "axios"
import SatitAndCUPersonelAccountDisplay from "./AccountPageUI/SatitAndCUPersonelAccountDisplay"
import SatitAndCUPersonelAccountEdit from "./AccountPageUI/SatitAndCUPersonelAccountEdit"

export default function SatitAndCuPersonel({ jwt }) {
  let [is_editting, set_is_editting] = useState(false)

  let [name_th, set_name_th] = useState("")
  let [surname_th, set_surname_th] = useState("")
  let [name_en, set_name_en] = useState("")
  let [surname_en, set_surname_en] = useState("")
  let [phone, set_phone] = useState("")
  let [personal_email, set_personal_email] = useState("")
  let [is_thai_language, set_is_thai_language] = useState(false)
  let [is_first_login, set_is_first_login] = useState()



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

  const toggleEditButton = () => {
    if (is_editting) {
      set_is_editting(false)
      fetchUserData()
    } else {
      set_is_editting(true)
    }
  }

  const showWarningMessage = (firstLogin) => {
    if (firstLogin) {
      return (
        <div className="alert alert-danger" role="alert">
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

  return !is_editting && personal_email !== "" && phone !== "" ? (
      <SatitAndCUPersonelAccountDisplay jwt={jwt} toggle_edit_button={toggleEditButton}/>
    
  ) : (
      <SatitAndCUPersonelAccountEdit jwt={jwt} toggle_edit_button={toggleEditButton}/>
    
  )
}

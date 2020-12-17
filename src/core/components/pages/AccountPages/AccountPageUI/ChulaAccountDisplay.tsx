import React from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { UserContext } from "../../../../contexts/UsersContext"

export default function ChulaAccountDisplay({ toggle_edit_button }) {
  let [is_thai_language] = useState(false)

  const showWarningMessage = (firstLogin: boolean) => {
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

  return (
    <UserContext.Consumer>
      {(context) => {
        const { CuStudent } = context
        const user = CuStudent

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
                <p>{user.phone}</p>
                <div className="valid-feedback"></div>
                <hr />
                <label className="form-label mt-2">Email</label>
                <p>{user.personal_email}</p>
                <div className="valid-feedback"></div>
              </div>
            </div>
            <br />
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
